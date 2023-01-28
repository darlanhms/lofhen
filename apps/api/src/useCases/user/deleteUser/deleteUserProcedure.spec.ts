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

  const user = await caller.user.create({
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
  });

  return user;
};

describe('Delete user', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deletes a user', async () => {
    const caller = createTestCaller();

    const user = await createUser();

    await caller.user.delete(user.id);

    const softDeletedUser = await prisma.user.findFirst({
      where: {
        id: user.id,
        deleted: true,
      },
    });

    expect(softDeletedUser?.deleted).toBeTruthy();
  });
});
