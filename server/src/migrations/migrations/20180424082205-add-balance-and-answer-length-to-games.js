module.exports = {
  up: (queryInterface, Sequelize) => {
    const addBalance = queryInterface.addColumn('Games', 'balance', {
      type: Sequelize.DECIMAL
    });
    const addAnswerLength = queryInterface.addColumn('Games', 'answerLength', {
      type: Sequelize.INTEGER
    });
    const addPrivateKey = queryInterface.addColumn('Games', 'privateKey', {
      type: Sequelize.STRING
    });
    const addWinner = queryInterface.addColumn('Games', 'winner', {
      type: Sequelize.STRING
    });

    return Promise.all([addBalance, addAnswerLength, addPrivateKey, addWinner]);
  },

  down: queryInterface => {
    const removeBalance = queryInterface.removeColumn('Games', 'balance');
    const removeAnswerLength = queryInterface.removeColumn(
      'Games',
      'answerLength'
    );
    const removePrivateKey = queryInterface.removeColumn('Games', 'privateKey');
    const removeWinner = queryInterface.removeColumn('Games', 'winner');

    return Promise.all([
      removeBalance,
      removeAnswerLength,
      removePrivateKey,
      removeWinner
    ]);
  }
};
