/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';

import { Role } from '@prisma/client';
import { createTestCaller } from '@core/tests/trpc';
import prisma from '@infra/prisma/client';

const createUser = async (): Promise<void> => {
  const caller = createTestCaller();

  await caller.user.create({
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
  });
};

describe('Find all users', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('list all users', async () => {
    const caller = createTestCaller();

    await createUser();
    await createUser();
    await createUser();

    const users = await caller.user.list();

    expect(users).toHaveLength(3);
  });
});
