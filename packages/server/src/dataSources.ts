import { DataSource } from 'typeorm';
import entities from './entities';

export const TestAppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities,
});
