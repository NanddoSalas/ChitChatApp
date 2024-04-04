import { faker } from '@faker-js/faker';
import { User } from './entities';
import { UserRoles } from './types';

const createUser = (role: UserRoles) => {
  return User.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role,
  })
    .setPassword('password')
    .save();
};

export const createTestUser = async () => {
  return createUser('Basic');
};

export const createTestAdmin = async () => {
  return createUser('Admin');
};

export const createTestServerAdmin = async () => {
  return createUser('ServerAdmin');
};
