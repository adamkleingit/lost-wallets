import { getGuessesResponse, getGuessesInput } from 'schemas/guesses';

export const getGuesses = {
  auth: false,
  description: 'Get guesses',
  notes: 'Get guesses from database',
  tags: ['api', 'guess'],
  validate: {
    params: getGuessesInput
  },
  plugins: {
    'hapi-swagger': {
      responses: getGuessesResponse
    }
  },
  handler: async request => {
    const data = await request.getDb().models.Guess.findAll({
      where: { gameId: request.params.gameId },
      order: [['createdAt', 'DESC']]
    });
    return data;
  }
};
