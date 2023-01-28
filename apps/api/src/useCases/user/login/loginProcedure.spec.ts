/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import { createTestCaller } from '@core/tests/trpc';
import { UserDTO } from '@dtos/user';
import appRouter from '@infra/trpc/routes';

interface CreateTestUserCredentials {
  username: string;
  password: string;
}

const createUser = async (userData: CreateTestUserCredentials): Promise<UserDTO> => {
  const caller = createTestCaller();

  const user = await caller.user.create({
    ...userData,
    name: faker.name.fullName(),
    role: Role.ADMIN,
  });

  return user;
};

describe('Login procedure', () => {
  it('should login', async () => {
    const caller = createTestCaller();

    const userCredentials = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = await createUser(userCredentials);

    const data = await caller.user.login({
      username: userCredentials.username,
      password: userCredentials.password,
    });

    expect(data.jwt).toBeTruthy();
    expect(data.user.id).toBe(user.id);
  });
});
