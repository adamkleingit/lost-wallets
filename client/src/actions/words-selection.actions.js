// @flow
import { WEB3_SEND, MAIN_CONTRACT_NAME } from 'constants/web3.constants';

export const guess = (gameId: number, answer: string, price: number) => ({
  type: WEB3_SEND,
  payload: {
    contractName: MAIN_CONTRACT_NAME,
    method: 'guess',
    params: [gameId, answer],
    value: price
  }
});
