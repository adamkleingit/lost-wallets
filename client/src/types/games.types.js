// @flow
export type Game = {|
  id: number,
  name: string,
  guesses: Array<Object>,
  description: string,
  imgUrl: string,
  options: Array<string>,
  winner: string,
  balance: number,
  answerLength: number,
  privateKey: string,
  createdAt: string,
  updatedAt: string,
  potentialAwards: { [key: string]: number }
|};

export type Games = Array<Game>;
export type GamesMap = {
  [key: number]: Game
};
