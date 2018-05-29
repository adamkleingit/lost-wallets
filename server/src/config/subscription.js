import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { LostWallets, contractAddress } from 'lost-wallets-contract';
import { CronJob } from 'cron';

import parameters from 'config/parameters';
import { addGuess, getLastBlockNumber } from 'config/db/utils';

const provider = new HDWalletProvider(
  parameters.MNEMONIC,
  parameters.INFURA_URL
);
const web3 = new Web3(provider);

const getContractEvents = async () => {
  const lostWallets = await new web3.eth.Contract(
    LostWallets.abi,
    contractAddress
  );

  const lastBlock = await getLastBlockNumber();

  lostWallets.getPastEvents(
    'Guess',
    {
      fromBlock: lastBlock
    },
    (error, events) => {
      if (!error) {
        events.map(event => addGuess(event));
      } else {
        /* eslint-disable no-console */
        console.log(
          'An error occurred during getting solidity events: ',
          error
        );
        /* eslint-enable no-console */
      }
    }
  );
};

export const getContractEventsJob = async () => {
  await parameters.SEQUELIZE_INSTANCE.authenticate();
  return new CronJob({
    cronTime: '*/5 * * * * *',
    onTick: () => getContractEvents(),
    runOnInit: true
  });
};
