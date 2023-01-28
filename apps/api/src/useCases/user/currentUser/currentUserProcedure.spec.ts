/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import { createTestCaller } from '@core/tests/trpc';
import prisma from '@infra/prisma/client';

describe('Current user controller', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('returns the current user when logged in', async () => {
    const userInDb = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        role: Role.ADMIN,
      },
    });

    const caller = createTestCaller({
      user: userInDb,
    });

    const currentUser = await caller.user.current();

    expect(currentUser).toBeDefined();
  });

  it('returns null if not logged in', async () => {
    const caller = createTestCaller({
      user: undefined,
    });

    const currentUser = await caller.user.current();

    expect(currentUser).toBeNull();
  });
});
