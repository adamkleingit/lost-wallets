module.exports = {
  up: (queryInterface, Sequelize) => {
    const addHacked = queryInterface.addColumn('Games', 'hacked', {
      type: Sequelize.BOOLEAN
    });
    const addReward = queryInterface.addColumn('Guesses', 'award', {
      type: Sequelize.DECIMAL
    });

    return Promise.all([addHacked, addReward]);
  },

  down: queryInterface => {
    const removeHacked = queryInterface.removeColumn('Games', 'hacked');
    const removeReward = queryInterface.removeColumn('Guesses', 'award');

    return Promise.all([removeHacked, removeReward]);
  }
};
