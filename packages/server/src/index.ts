import cors from '@koa/cors';
import { config } from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';

import { initTypeorm } from './db';
import { applyGraphql } from './utils';

config();

const app = new Koa();

(async () => {
  await initTypeorm();

  app.use(morgan('combined')).use(bodyParser()).use(cors());

  await applyGraphql(app);

  app.listen(8080, (): void => console.log(`SERVER STARTED ON PORT 8080`));
})();
