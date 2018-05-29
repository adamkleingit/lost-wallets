import { map } from 'lodash/fp';
import { getGamesResponse } from 'schemas/games';
import { AWARDS_PERCENTAGE } from 'constants/guesses';

export const getGames = {
  auth: false,
  description: 'Get games',
  notes: 'Get games from database',
  tags: ['api', 'game'],
  plugins: {
    'hapi-swagger': {
      responses: getGamesResponse
    }
  },
  handler: async request => {
    const data = await request.getDb().models.Game.findAll({
      attributes: { exclude: ['answer'] }
    });

    return map(
      game => ({
        ...game.dataValues,
        potentialAwards: AWARDS_PERCENTAGE[game.answerLength]
      }),
      data
    );
  }
};
