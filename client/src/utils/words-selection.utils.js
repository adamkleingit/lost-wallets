import { includes } from 'lodash/fp';

export const isArrayFull = (array, expectedLength) =>
  array.length === expectedLength && !includes(undefined, array);
