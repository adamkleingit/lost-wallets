import Joi from 'joi';
import pick from 'lodash/fp/pick';
import { Sequelize } from 'sequelize';

import { authResponses } from 'schemas/auth';

const USER_EXISTS = 'User with this email already exists';

export const login = {
  auth: { mode: 'try' },
  description: 'Login',
  notes: 'Basic login - without OAuth',
  tags: ['api', 'auth'],
  plugins: {
    'hapi-swagger': {
      responses: authResponses
    }
  },
  validate: {
    payload: Joi.object({
      email: Joi.string()
        .email()
        .required()
        .example('a@a.com'),
      password: Joi.string()
        .required()
        .example('ab123456')
    }).required()
  },
  handler: async (request, h) => {
    if (request.auth.isAuthenticated) {
      return {
        success: false,
        error: 'already authenticated'
      };
    }

    const user = await request.getDb().models.user.findOne({
      where: { email: request.payload.email }
    });
    if (!user || !user.authenticate(request.payload.password)) {
      return {
        success: false,
        error: 'invalid email/password'
      };
    }
    return h
      .response({ success: true, data: pick(['email', 'id', 'token'])(user) })
      .header('Authorization', user.token);
  }
};

export const register = {
  auth: { mode: 'try' },
  description: 'Register',
  notes: 'Register route',
  tags: ['api', 'auth'],
  plugins: {
    'hapi-swagger': {
      responses: authResponses
    }
  },
  validate: {
    payload: Joi.object({
      email: Joi.string()
        .email()
        .required()
        .example('a@a.com'),
      password: Joi.string()
        .min(8)
        .required()
        .example('ab123456')
    }).required()
  },
  handler: async (request, h) => {
    if (request.auth.isAuthenticated) {
      return {
        success: false,
        error: 'already authenticated'
      };
    }

    const user = await request.getDb().models.user.findOne({
      where: Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('email')),
        Sequelize.fn('lower', request.payload.email)
      )
    });
    if (user) {
      return {
        success: false,
        error: USER_EXISTS
      };
    }
    const newUser = await request.getDb().models.user.create(
      {
        email: request.payload.email,
        password: request.payload.password
      },
      { returning: true }
    );
    return h
      .response({
        success: true,
        data: pick(['email', 'id', 'token'])(newUser)
      })
      .header('Authorization', newUser.token);
  }
};
