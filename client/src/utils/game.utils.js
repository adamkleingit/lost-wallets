import { COLORS } from 'constants/game.constants';

export const getColorsDictionary = options => {
  const result = {};

  options.forEach((word, index) => {
    result[word] = COLORS[index];
  });

  return result;
};
