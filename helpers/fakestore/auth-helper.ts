import { type APIRequestContext } from '@playwright/test';
import { FAKESTORE_AUTH } from '../../tests/fixtures/fakestore-data';

export async function getAuthToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('/auth/login', {
    data: FAKESTORE_AUTH.valid,
  });

  const body = (await response.json()) as { token: string };
  return body.token;
}
