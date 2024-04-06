import request from 'supertest';
import { app } from '../../app';
import { TestAppDataSource } from '../../dataSources';
import { createTestAdmin, createTestUser } from '../../testUtils';
import { addUserToRoom, createAccesToken, createRoom } from '../../utils';

beforeAll(async () => {
  await TestAppDataSource.initialize();
});

describe('room messages', () => {
  describe('retrieve paginated messages', () => {
    test('without authenticating', async () => {
      const res = await request(app).get('/users');

      expect(res.statusCode).toBe(401);
    });

    describe('by authenticating', () => {
      test('room does not exist', async () => {
        const user = await createTestUser();
        const accessToken = await createAccesToken(user);

        const res = await request(app)
          .get('/rooms/9999/messages')
          .set('Authorization', 'Bearer ' + accessToken);

        expect(res.statusCode).toBe(400);
      });

      test("not allowed to see room's messages", async () => {
        const user = await createTestUser();
        const accessToken = await createAccesToken(user);
        const admin = await createTestAdmin();
        const room = await createRoom('private', admin, true);

        const res = await request(app)
          .get(`/rooms/${room.id}/messages`)
          .set('Authorization', 'Bearer ' + accessToken);

        expect(res.statusCode).toBe(401);
      });

      test('paginated messages retrieved successfully', async () => {
        const user = await createTestUser();
        const admin = await createTestAdmin();
        const accessToken = await createAccesToken(user);
        const adminToken = await createAccesToken(user);
        const privateRoom = await createRoom('private', admin, true);
        const publicRoom = await createRoom('public', admin, false);
        await addUserToRoom(user, privateRoom);

        const res = await request(app)
          .get(`/rooms/${privateRoom.id}/messages`)
          .set('Authorization', 'Bearer ' + adminToken);

        expect(res.statusCode).toBe(200);

        const res2 = await request(app)
          .get(`/rooms/${publicRoom.id}/messages`)
          .set('Authorization', 'Bearer ' + accessToken);

        expect(res2.statusCode).toBe(200);

        const res3 = await request(app)
          .get(`/rooms/${privateRoom.id}/messages`)
          .set('Authorization', 'Bearer ' + accessToken);

        expect(res3.statusCode).toBe(200);
      });
    });
  });

  describe('send message', () => {
    test('without authenticating', async () => {
      const res = await request(app).get('/users');

      expect(res.statusCode).toBe(401);
    });

    describe('by authenticating', () => {
      test('room does not exist', async () => {
        const user = await createTestUser();
        const accessToken = await createAccesToken(user);

        const res = await request(app)
          .post('/rooms/9999/messages')
          .set('Authorization', 'Bearer ' + accessToken);

        expect(res.statusCode).toBe(400);
      });

      test('not allowed to send messages', async () => {
        const user = await createTestUser();
        const admin = await createTestAdmin();
        const accessToken = await createAccesToken(user);
        const room = await createRoom('private', admin, true);

        const res = await request(app)
          .post(`/rooms/${room.id}/messages`)
          .set('Authorization', 'Bearer ' + accessToken);

        expect(res.statusCode).toBe(401);
      });

      test('message send successfully', async () => {
        const admin = await createTestAdmin();
        const accessToken = await createAccesToken(admin);
        const room = await createRoom('private', admin, true);

        const res = await request(app)
          .post(`/rooms/${room.id}/messages`)
          .send({ message: 'Hi' })
          .set('Authorization', 'Bearer ' + accessToken);

        expect(res.statusCode).toBe(200);

        const res2 = await request(app)
          .get(`/rooms/${room.id}/messages`)
          .set('Authorization', 'Bearer ' + accessToken);

        expect(res2.statusCode).toBe(200);
      });
    });
  });
});
