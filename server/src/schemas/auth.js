import Joi from 'joi';

export const authResponses = {
  200: {
    schema: Joi.object({
      success: Joi.bool().required(),
      data: Joi.object({
        email: Joi.string(),
        id: Joi.number(),
        token: Joi.string()
      }),
      error: Joi.string()
    }).required()
  },
  400: { description: 'Invalid paramters' }
};
