import request from 'supertest';
import { app } from '../../app';
import { TestAppDataSource } from '../../dataSources';
import { createTestServerAdmin, createTestUser } from '../../testUtils';
import { createAccesToken } from '../../utils';

beforeAll(async () => {
  await TestAppDataSource.initialize();
});

describe('retrieve all users', () => {
  test('without authenticating', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(401);
  });

  test('by authenticating', async () => {
    const user = await createTestUser();
    const user2 = await createTestUser();
    const accessToken = await createAccesToken(user);

    const res = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      users: [user.getPublicUserData(), user2.getPublicUserData()],
    });
  });
});

describe('update user', () => {
  test('without authenticating', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(401);
  });

  describe('by authenticating', () => {
    test('update my user', async () => {
      const user = await createTestUser();
      const accessToken = await createAccesToken(user);

      const res = await request(app)
        .put(`/users/${user.id}`)
        .send({
          name: 'Fernando Salas',
          email: 'nanddosalas@gmail.com',
        })
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res.statusCode).toBe(200);

      const res2 = await request(app)
        .get(`/users/${user.id}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res2.statusCode).toBe(200);
      expect(res2.body).toStrictEqual({
        ...user.getPublicUserData(),
        name: 'Fernando Salas',
        email: 'nanddosalas@gmail.com',
      });
    });

    test("update someone else's user", async () => {
      const user = await createTestUser();
      const user2 = await createTestUser();
      const accessToken = await createAccesToken(user);

      const res = await request(app)
        .put(`/users/${user2.id}`)
        .send({
          name: 'Fernando Salas',
          email: 'nanddosalas@gmail.com',
        })
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res.statusCode).toBe(401);
    });
  });
});

describe('update user role', () => {
  test('without authenticating', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(401);
  });

  describe('by authenticating', () => {
    test("not allowed to update user's role", async () => {
      const user = await createTestUser();
      const user2 = await createTestUser();
      const accessToken = await createAccesToken(user);

      const res = await request(app)
        .put(`/users/${user2.id}/role`)
        .send({ role: 'Admin' })
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res.statusCode).toBe(401);
    });

    test("user's role updated succesfully", async () => {
      const user = await createTestServerAdmin();
      const user2 = await createTestUser();
      const accessToken = await createAccesToken(user);

      const res = await request(app)
        .put(`/users/${user2.id}/role`)
        .send({ role: 'Admin' })
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res.statusCode).toBe(200);

      const res2 = await request(app)
        .get(`/users/${user2.id}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res2.statusCode).toBe(200);
      expect(res2.body).toStrictEqual({
        ...user2.getPublicUserData(),
        role: 'Admin',
      });
    });
  });
});
