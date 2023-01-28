/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import { createTestCaller } from '@core/tests/trpc';
import { UserDTO } from '@dtos/user';
import prisma from '@infra/prisma/client';

const createUser = async (): Promise<UserDTO> => {
  const caller = createTestCaller();

  const user = caller.user.create({
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
  });

  return user;
};

describe('Find user by id', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('finds a user by id', async () => {
    const caller = createTestCaller();

    const user = await createUser();

    const foundUser = await caller.user.byId(user.id);

    expect(foundUser).toStrictEqual(user);
  });
});
