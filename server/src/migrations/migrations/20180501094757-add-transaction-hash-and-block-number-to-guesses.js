module.exports = {
  up: (queryInterface, Sequelize) => {
    const addTransactionHash = queryInterface.addColumn(
      'Guesses',
      'transactionHash',
      {
        type: Sequelize.STRING
      }
    );
    const addBlockNumber = queryInterface.addColumn('Guesses', 'blockNumber', {
      type: Sequelize.INTEGER
    });
    const renameGuess = queryInterface.renameColumn(
      'Guesses',
      'guess',
      'answer'
    );

    return Promise.all([addTransactionHash, addBlockNumber, renameGuess]);
  },

  down: queryInterface => {
    const removeTransactionHash = queryInterface.removeColumn(
      'Guesses',
      'transactionHash'
    );
    const removeBlockNumber = queryInterface.removeColumn(
      'Guesses',
      'blockNumber'
    );
    const renameAnswer = queryInterface.renameColumn(
      'Guesses',
      'answer',
      'guess'
    );

    return Promise.all([
      removeTransactionHash,
      removeBlockNumber,
      renameAnswer
    ]);
  }
};
