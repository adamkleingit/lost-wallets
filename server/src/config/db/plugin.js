import HapiSequelize from 'hapi-sequelizejs';
import { join } from 'path';

import parameters from 'config/parameters';

// BIGINT will be returned as int and not string
require('pg').defaults.parseInt8 = true;

const databasePlugin = {
  name: 'database',
  plugin: HapiSequelize,
  options: [
    {
      name: 'lost_wallets',
      models: [join(__dirname, '../../models/**/*.js')],
      sequelize: parameters.SEQUELIZE_INSTANCE,
      sync: true,
      forceSync: false
    }
  ]
};

export default databasePlugin;
