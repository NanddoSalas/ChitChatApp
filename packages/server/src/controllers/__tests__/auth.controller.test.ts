import request from 'supertest';
import { app } from '../../app';
import { TestAppDataSource } from '../../dataSources';
import { createTestUser } from '../../testUtils';
import { createInvitation } from '../../utils';

beforeAll(() => {
  return TestAppDataSource.initialize();
});

describe('register user', () => {
  test('email already in user', async () => {
    const user = await createTestUser();
    const invitation = await createInvitation(user);

    const res = await request(app).post('/users/register').send({
      name: 'Fernando',
      email: user.email,
      password: 'password',
      invitation: invitation.code,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({ email: 'email already in use' });
  });

  test('password to weak', async () => {
    const user = await createTestUser();
    const invitation = await createInvitation(user);

    const res = await request(app).post('/users/register').send({
      name: 'Fernando',
      email: 'nanddosalas@gmail.com',
      password: 'pass',
      invitation: invitation.code,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('password');
  });

  test('invalid invitation code', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Fernando',
      email: 'nanddosalas@gmail.com',
      password: 'password',
      invitation: 'code',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({ invitation: 'invalid invitation code' });
  });

  test('successful registration', async () => {
    const user = await createTestUser();
    const invitation = await createInvitation(user);

    const res = await request(app).post('/users/register').send({
      name: 'Fernando',
      email: 'nanddosalas@gmail.com',
      password: 'password',
      invitation: invitation.code,
    });

    expect(res.statusCode).toBe(200);

    const res2 = await request(app)
      .post('/users/login')
      .send({ email: user.email, password: 'password' });
    const accessToken: string = res2.body.accessToken || '';

    expect(res2.statusCode).toBe(200);
    expect(res2.body.user).toStrictEqual(user.getPublicUserData());

    const res3 = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res3.statusCode).toBe(200);
    expect(res3.body).toStrictEqual(user.getPublicUserData());
  });
});

describe('user login', () => {
  test('invalid credentials', async () => {
    const user = await createTestUser();

    const res = await request(app)
      .post('/users/login')
      .send({ email: 'userlogin@gmail.com', password: 'password' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({ message: 'invalid credentials' });

    const res2 = await request(app)
      .post('/users/login')
      .send({ email: user.email, password: 'invalid' });

    expect(res2.statusCode).toBe(400);
    expect(res2.body).toStrictEqual({ message: 'invalid credentials' });
  });

  test('valid credentials', async () => {
    const user = await createTestUser();

    const res = await request(app)
      .post('/users/login')
      .send({ email: user.email, password: 'password' });
    const accessToken: string = res.body.accessToken || '';

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toStrictEqual(user.getPublicUserData());

    const res2 = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res2.statusCode).toBe(200);
    expect(res2.body).toStrictEqual(user.getPublicUserData());
  });
});
