module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Guesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      guess: {
        type: Sequelize.JSONB
      },
      matches: {
        type: Sequelize.INTEGER
      },
      exact: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('Guesses')
};
