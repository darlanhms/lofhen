import { z } from 'zod';
import { Role } from '../../../types/enums';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
  role: z.nativeEnum(Role, {
    errorMap: (issue, ctx) => {
      return { message: 'Cargo deve ser ADMIN ou AGENT' };
    },
  }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(4, 'Senha deve ter no mínimo 4 caracteres')
    .max(20, 'Senha deve ter no máximo 20 caracteres'),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;
