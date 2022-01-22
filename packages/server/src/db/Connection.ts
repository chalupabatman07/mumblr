import { createConnection } from 'typeorm';

import { Profile } from '../models';

const entities = [Profile];

export const initTypeorm = async (): Promise<void> => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities,
      synchronize: true,
    });
  } catch (e) {
    throw e;
  }
};
