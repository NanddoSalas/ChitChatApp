import request from 'supertest';
import { app } from '../../app';
import { TestAppDataSource } from '../../dataSources';
import { createTestAdmin } from '../../testUtils';
import { createAccesToken, createInvitation } from '../../utils';

beforeAll(() => {
  return TestAppDataSource.initialize();
});

describe('retrieve invitations', () => {
  test('without authenticating', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(401);
  });

  test('by authenticating', async () => {
    const admin = await createTestAdmin();
    const accessToken = await createAccesToken(admin);
    const invitation = await createInvitation(admin);
    const invitation2 = await createInvitation(admin);

    const res = await request(app)
      .get('/invitations')
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      invitations: [
        invitation.getPublicInvitationData(),
        invitation2.getPublicInvitationData(),
      ],
    });
  });
});

describe('generate invitation', () => {
  test('without authenticating', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(401);
  });

  test('by authenticating', async () => {
    const admin = await createTestAdmin();
    const accessToken = await createAccesToken(admin);

    const res = await request(app)
      .post('/invitations')
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res.status).toBe(200);

    const res2 = await request(app)
      .get('/invitations')
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res2.status).toBe(200);
    expect(res2.body).toStrictEqual({
      invitations: [res.body],
    });
  });
});

describe('revoke invitation', () => {
  test('without authenticating', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(401);
  });

  describe('by authenticating', () => {
    test('revoke my invitation', async () => {
      const admin = await createTestAdmin();
      const invitation = await createInvitation(admin);
      const accessToken = await createAccesToken(admin);

      const res = await request(app)
        .delete(`/invitations/${invitation.id}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res.status).toBe(200);

      const res2 = await request(app)
        .get('/invitations')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res2.status).toBe(200);
      expect(res2.body).toStrictEqual({
        invitations: [],
      });
    });

    test("revoke someone else's invitation", async () => {
      const admin = await createTestAdmin();
      const accessToken = await createAccesToken(admin);

      const admin2 = await createTestAdmin();
      const invitation = await createInvitation(admin2);

      const res = await request(app)
        .delete(`/invitations/${invitation.id}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res.statusCode).toBe(401);
    });

    test('revoke invitation that does not exist', async () => {
      const admin = await createTestAdmin();
      const accessToken = await createAccesToken(admin);

      const res = await request(app)
        .delete('/invitations/9999')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(res.status).toBe(400);
    });
  });
});
