// @flow
import Web3 from 'web3';
import { LostWallets, contractAddress } from 'lost-wallets-contract';

import type { Middleware } from 'types/redux.types';
import * as networkActions from 'actions/network.actions';
import * as userActions from 'actions/user.actions';
import * as errorModalActions from 'actions/error-modal.actions';

import {
  ERROR_TYPES,
  WEB3_CALL,
  WEB3_SEND,
  APP_NETWORK,
  MAIN_CONTRACT_NAME
} from 'constants/web3.constants';
import { HACK_PROCESSING } from 'constants/game.constants';

const contracts = {};

function initializeContract(web3, abi, address) {
  return new web3.eth.Contract(abi, address);
}

async function checkCurrentNetwork(web3, dispatch) {
  const userNetwork = await web3.eth.net.getNetworkType();

  if (userNetwork !== APP_NETWORK) {
    dispatch(
      errorModalActions.showErrorModal(
        true,
        'metamask',
        'Ethereum network',
        'Please, select Rinkeby Ethereum network in your metamask extension'
      )
    );
  }
}

function parseErrorMessage(error) {
  if (error.message.includes('User denied transaction signature')) {
    return ERROR_TYPES.USER_REJECT_TRANSACTION;
  }

  if (error.message.includes('intrinsic gas too low')) {
    return ERROR_TYPES.LOW_GAS_LIMIT;
  }

  return ERROR_TYPES.GENERAL_ERROR;
}

function handleError(error, actionType, dispatch) {
  const parsedError = parseErrorMessage(error);
  dispatch(networkActions.endNetwork(actionType));
  console.log('Web3 error: ', parsedError);
}

const web3Middleware: Middleware = ({ dispatch, getState }) => next => {
  let web3;

  if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
    contracts[MAIN_CONTRACT_NAME] = initializeContract(
      web3,
      LostWallets.abi,
      contractAddress
    );
    checkCurrentNetwork(web3, dispatch);
  } else {
    dispatch(
      errorModalActions.showErrorModal(
        true,
        'metamask',
        'Metamask not installed',
        `We didn't detect metamask extension installed in your browser. Please visit https://metamask.io/ for installation information`
      )
    );
    // pass action to next middleware in case web3 is not present
    return action => next(action);
  }

  return async (action: Object) => {
    next(action);

    if (action.type === WEB3_CALL) {
      const { contractName, method, onSuccess, params = [] } =
        action.payload || {};

      if (!contracts[contractName]) {
        console.info('Tried to reach a non existent contract');
        return;
      }

      try {
        dispatch(networkActions.startNetwork(WEB3_CALL));
        const result = await contracts[contractName].methods[method](
          ...params
        ).call();
        dispatch(networkActions.endNetwork(WEB3_CALL));
        if (onSuccess) {
          dispatch(onSuccess(result));
        }
      } catch (err) {
        handleError(err, WEB3_CALL, dispatch);
      }
    }

    if (action.type === WEB3_SEND) {
      const { contractName, method, params = [], value } = action.payload || {};

      if (!contracts[contractName]) {
        return;
      }

      dispatch(networkActions.startNetwork(WEB3_SEND));

      const accounts = await web3.eth.getAccounts();
      const valueObj = value
        ? { value: Web3.utils.toWei(value.toString(), 'ether') }
        : {};

      try {
        await contracts[contractName].methods[method](...params).send({
          from: accounts[0],
          ...valueObj
        });
        dispatch(networkActions.startNetwork(HACK_PROCESSING));
        dispatch(networkActions.endNetwork(WEB3_SEND));
      } catch (err) {
        handleError(err, WEB3_SEND, dispatch);
      }
    }

    if (action.type === userActions.FETCH_USER_ACCOUNT) {
      const accounts = await web3.eth.getAccounts();

      if (!accounts.length) {
        dispatch(
          errorModalActions.showErrorModal(
            true,
            'metamask',
            'Metamask account not configured',
            'Metamask account is locked or not configured, please activate account and reload the page'
          )
        );
        return;
      }

      dispatch(userActions.setUserAccount(accounts[0]));
      return accounts[0];
    }
  };
};

export default web3Middleware;
