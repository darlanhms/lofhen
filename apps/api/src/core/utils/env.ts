/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  ADMIN_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
