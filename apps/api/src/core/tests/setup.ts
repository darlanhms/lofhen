import 'reflect-metadata';
import '@infra/prisma/middlewares';
import '@infra/containers';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';

config();
faker.locale = 'pt_BR';
