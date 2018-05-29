module.exports = {
  development: {
    url: 'postgres://127.0.0.1:5432/lost_wallets',
    dialect: 'postgres'
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: { ssl: true }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: { ssl: true }
  }
};
