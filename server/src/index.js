/* eslint-disable no-console */
import 'app-module-path/register';

import { getServer } from 'config/server';

const start = async () => {
  try {
    const server = await getServer();
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
};

start();
/* eslint-enable no-console */
