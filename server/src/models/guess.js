module.exports = (sequelize, DataTypes) => {
  const Guess = sequelize.define(
    'Guess',
    {
      user: DataTypes.STRING,
      gameId: DataTypes.INTEGER,
      answer: DataTypes.JSONB,
      matches: DataTypes.INTEGER,
      exact: DataTypes.INTEGER,
      transactionHash: DataTypes.STRING,
      blockNumber: DataTypes.INTEGER,
      award: DataTypes.DECIMAL
    },
    {}
  );
  return Guess;
};
