import Joi from 'joi';

export const getGamesResponse = {
  200: {
    schema: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().required(),
          name: Joi.string().required(),
          description: Joi.string().required(),
          imgUrl: Joi.string().required(),
          options: Joi.array().required(),
          balance: Joi.number().required(),
          privateKey: Joi.string().required(),
          winner: Joi.string().required(),
          answerLength: Joi.number().required(),
          createdAt: Joi.string().required(),
          updatedAt: Joi.string().required(),
          potentialAwards: Joi.object().required()
        })
      )
      .required()
  }
};
