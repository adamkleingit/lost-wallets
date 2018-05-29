module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'Game',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      balance: DataTypes.DECIMAL,
      imgUrl: DataTypes.STRING,
      options: DataTypes.JSONB,
      answer: DataTypes.JSONB,
      answerLength: DataTypes.DECIMAL,
      privateKey: DataTypes.STRING,
      winner: DataTypes.STRING,
      hacked: DataTypes.BOOLEAN,
      potentialAwards: DataTypes.VIRTUAL
    },
    {}
  );

  Game.prototype.getResult = function getResult(userAnswer) {
    let matches = 0;
    let exact = 0;

    userAnswer.forEach((word, index) => {
      if (this.answer[index] === word) {
        exact += 1;
      } else if (this.answer.includes(word)) {
        matches += 1;
      }
    });

    return { matches, exact };
  };

  return Game;
};
