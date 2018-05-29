import Joi from 'joi';
import Sequelize from 'sequelize';

const port = process.env.PORT || 8000;

const shared = {
  JWT_SECRET: 'ThisIsOurBoilerplatePassword',
  APPLICATION_NAME: 'mySampleApp',
  PORT: port,
  API_URL: 'https://jsonplaceholder.typicode.com'
};

const configuration = {
  development: {
    ...shared,
    DOCUMENTATION: {
      PROTOCOL: 'http',
      HOST: `localhost:${port}`
    },
    DATABASE_URL: 'postgres://127.0.0.1:5432/lost_wallets',
    MNEMONIC:
      'xxx',
    INFURA_URL: 'https://rinkeby.infura.io/knH2rw30f8rM5flRig42',
    SENDGRID_PASSWORD: '---',
    SENDGRID_USERNAME: '---',
    RECEPIENT_EMAILS: ['mark@500tech.com']
  },
  production: {
    ...shared,
    DOCUMENTATION: {
      PROTOCOL: 'http',
      HOST: `lost-wallets.herokuapp.com:${port}`
    },
    DATABASE_URL: process.env.DATABASE_URL,
    SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
    SENDGRID_USERNAME: process.env.SENDGRID_USERNAME,
    MNEMONIC: process.env.MNEMONIC,
    INFURA_URL: process.env.INFURA_URL,
    RECEPIENT_EMAILS: [
      'mark@500tech.com',
      'boris@500tech.com',
      'adam@500tech.com',
      'lostwallets@500tech.com'
    ]
  }
};

const environment = process.env.NODE_ENV || 'development';

const AddRuntimeParameters = parameters => ({
  ...parameters,
  SEQUELIZE_INSTANCE: new Sequelize(parameters.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl:
        parameters.NODE_ENV === 'production' ||
        parameters.NODE_ENV === 'staging'
    },
    logging: false
  })
});

const parameters = AddRuntimeParameters({
  ...process.env,
  ...configuration[environment]
});

const parametersSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  APPLICATION_NAME: Joi.string().required(),
  PORT: Joi.number().required(),
  API_URL: Joi.string().required(),
  DOCUMENTATION: Joi.object({
    PROTOCOL: Joi.string()
      .valid('http', 'https')
      .required(),
    HOST: Joi.string().required()
  }).required(),
  DATABASE_URL: Joi.string().required(),
  SEQUELIZE_INSTANCE: Joi.any().required(),
  MNEMONIC: Joi.string().required(),
  INFURA_URL: Joi.string().required(),
  SENDGRID_PASSWORD: Joi.string().required(),
  SENDGRID_USERNAME: Joi.string().required(),
  RECEPIENT_EMAILS: Joi.array().required()
})
  .unknown()
  .required();

const { error, value: validatedParameters } = Joi.validate(
  parameters,
  parametersSchema
);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default validatedParameters;
