import Joi from 'joi';

export const helloWorld = Joi.object({
  name: Joi.string().required()
});

export const getPostsResponse = {
  200: {
    schema: Joi.array()
      .items(
        Joi.object({
          userId: Joi.number().required(),
          id: Joi.number().required(),
          title: Joi.string().required(),
          body: Joi.string().required()
        })
      )
      .required()
  }
};

export const getUserResponse = {
  200: {
    schema: Joi.object({
      success: Joi.bool().required(),
      data: Joi.object({
        email: Joi.string().required()
      }),
      error: Joi.string()
    }).required()
  }
};
