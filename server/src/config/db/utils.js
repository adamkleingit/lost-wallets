import parameters from 'config/parameters';
import { AWARDS_PERCENTAGE } from 'constants/guesses';
import { sendEmail } from 'config/utils/smtp-client.utls';

const { models } = parameters.SEQUELIZE_INSTANCE;

const transactionHashExists = async transactionHash =>
  models.Guess.find({ where: { transactionHash } });

const getGuessAward = async (gameId, exact, balance, answerLength) => {
  const currentMaxExact =
    (await models.Guess.max('exact', { where: { gameId } })) || 0;

  if (answerLength !== exact) {
    return exact > currentMaxExact
      ? AWARDS_PERCENTAGE[answerLength][exact] / 100 * balance
      : 0;
  }

  return balance;
};

export const addGuess = async ({
  blockNumber,
  transactionHash,
  returnValues
}) => {
  const { _gameId, _answer, _user } = returnValues;

  try {
    const game = await models.Game.findById(_gameId);
    const jsonUserAnswer = JSON.parse(_answer);
    const { matches, exact } = game.getResult(jsonUserAnswer);

    if (await transactionHashExists(transactionHash)) {
      return;
    }

    if (exact === game.answerLength) {
      await game.update({
        hacked: true
      });

      await sendEmail({
        to: parameters.RECEPIENT_EMAILS,
        subject: `Game ID:${game.id} was hacked!`,
        text: `Hello Admin! Lost Wallets game id: ${
          game.id
        } was hacked! Please make a transaction for the winners!`
      });
    }

    const award = await getGuessAward(
      _gameId,
      exact,
      game.balance,
      game.answerLength
    );

    await models.Guess.create({
      user: _user,
      gameId: _gameId,
      answer: jsonUserAnswer,
      matches,
      exact,
      blockNumber,
      transactionHash,
      award
    });
  } catch (error) {
    /* eslint-disable no-console */
    console.log('Error occurred while inserting new guess: ', error);
    /* eslint-enable no-console */
  }
};

export const getLastBlockNumber = async () => {
  let blockNumber;

  try {
    blockNumber = await models.Guess.max('blockNumber');
  } catch (error) {
    /* eslint-disable no-console */
    console.log('Error occurred while getting last block number: ', error);
    /* eslint-enable no-console */
  }

  return blockNumber || 0;
};
