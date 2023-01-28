import { router } from '../index';
import userRouter from './user';

const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
