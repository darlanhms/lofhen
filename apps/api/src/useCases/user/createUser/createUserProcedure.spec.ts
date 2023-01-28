/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';
import { createTestCaller } from '@core/tests/trpc';
import BadRequestError from '@errors/badRequestError';
import NotAuthorizedError from '@errors/notAuthorizedError';
import prisma from '@infra/prisma/client';
import { CreateUserRequest } from './createUserRequest';

function makeUserPayload(overrides?: Partial<CreateUserRequest>): CreateUserRequest {
  return {
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
    ...overrides,
  };
}

describe('Create user procedure', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates a user', async () => {
    const caller = createTestCaller();

    const payload = makeUserPayload();

    const user = await caller.user.create(payload);

    const userInDb = await prisma.user.findFirst({
      where: {
        username: payload.username,
      },
    });

    expect(user).toBeTruthy();
    expect(userInDb).toBeTruthy();
  });

  it('returns an error if username was already registered', async () => {
    const caller = createTestCaller();

    const payload = makeUserPayload();

    await prisma.user.create({
      data: {
        username: payload.username,
        name: faker.name.fullName(),
        password: faker.internet.password(),
        role: Role.ADMIN,
      },
    });

    try {
      await caller.user.create(payload);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect((error as BadRequestError).message).toMatch('Nome de usuário já cadastrado');
    }
  });

  it('ensures that only admin users can create new users', async () => {
    const caller = createTestCaller({
      user: {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        name: faker.name.fullName(),
        role: Role.AGENT,
        createdAt: new Date(),
      },
    });

    try {
      await caller.user.create(makeUserPayload());
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(NotAuthorizedError);
    }
  });
});
