import Joi from 'joi';

export const getGuessesResponse = {
  200: {
    schema: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().required(),
          user: Joi.string().required(),
          gameId: Joi.number().required(),
          answer: Joi.array().required(),
          matches: Joi.number().required(),
          exact: Joi.number().required(),
          createdAt: Joi.string().required(),
          updatedAt: Joi.string().required(),
          blockNumber: Joi.number().required(),
          transactionHash: Joi.string().required()
        })
      )
      .required()
  }
};

export const getGuessesInput = Joi.object({
  gameId: Joi.number().required()
});
