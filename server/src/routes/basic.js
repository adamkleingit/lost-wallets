import {
  helloWorld as helloWorldSchema,
  getPostsResponse as getPostsResponseSchema,
  getUserResponse as getUserResponseSchema
} from 'schemas/basic';

export const helloWorld = {
  auth: false,
  description: 'Hello world',
  notes: 'enter your name',
  tags: ['api', 'basic'],
  validate: {
    params: helloWorldSchema
  },
  handler: async request => `Hello ${request.params.name}`
};

export const getPosts = {
  description: 'Get posts',
  notes: 'get posts if you are authenticated',
  tags: ['api', 'basic'],
  plugins: {
    'hapi-swagger': {
      responses: getPostsResponseSchema
    }
  },
  handler: async request => {
    const { data } = await request.httpRequest({
      method: 'get',
      url: '/posts'
    });
    return data;
  }
};

export const getUser = {
  description: 'Get user',
  notes: 'Get user from database',
  tags: ['api', 'basic'],
  plugins: {
    'hapi-swagger': {
      responses: getUserResponseSchema
    }
  },
  handler: async request => {
    const user = await request.getDb().models.user.findOne({
      where: { email: request.auth.credentials.email }
    });

    return {
      success: true,
      data: {
        email: user.toJSON().email
      }
    };
  }
};
