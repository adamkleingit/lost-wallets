export type Option = {
  word: string,
  color: string
};

export type Guess = {
  id: number,
  user: string,
  gameId: number,
  answer: Array<string>,
  matches: number,
  exact: number,
  createdAt: string,
  updatedAt: string,
  blockNumber: number,
  transactionHash: string
};

export type Options = Array<Option>;
export type Guesses = Array<Guess>;
