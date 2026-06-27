import { test, expect } from '@playwright/test';

interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface ReqresUsersResponse {
  page: number;
  data: ReqresUser[];
}

interface CreateUserPayload {
  name: string;
  job: string;
}

interface CreateUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

test.beforeEach(({ }, testInfo) => {
  test.skip(
    !process.env.REQRES_API_KEY,
    'Set REQRES_API_KEY — free key at https://app.reqres.in/api-keys',
  );
});

test.describe('Reqres Users API', () => {
  test('GET /api/users?page=2 returns paginated users with required fields', async ({ request }) => {
    const response = await request.get('/api/users?page=2');

    expect(response.status()).toBe(200);

    const body = (await response.json()) as ReqresUsersResponse;

    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    for (const user of body.data) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
    }
  });

  test('POST /api/users creates a user and echoes name and job', async ({ request }) => {
    const payload: CreateUserPayload = { name: 'morpheus', job: 'leader' };

    const response = await request.post('/api/users', { data: payload });

    expect(response.status()).toBe(201);

    const body = (await response.json()) as CreateUserResponse;

    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
    expect(typeof body.id).toBe('string');
    expect(typeof body.createdAt).toBe('string');
    expect(Date.parse(body.createdAt)).not.toBeNaN();
  });

  test('POST then verify created user details (create-then-verify flow)', async ({ request }) => {
    const payload: CreateUserPayload = { name: 'morpheus', job: 'leader' };

    const createResponse = await request.post('/api/users', { data: payload });
    expect(createResponse.status()).toBe(201);

    const createdUser = (await createResponse.json()) as CreateUserResponse;

    // Reqres does not persist data, so a follow-up GET would not return the user.
    // In a real API, the next step would be:
    //   const verifyResponse = await request.get(`/api/users/${createdUser.id}`);
    //   expect(verifyResponse.status()).toBe(200);
    // Here we chain assertions on the create response as the verification step.
    expect(createdUser.id).toBeTruthy();
    expect(createdUser.name).toBe(payload.name);
    expect(createdUser.job).toBe(payload.job);
    expect(Date.parse(createdUser.createdAt)).not.toBeNaN();
  });
});
