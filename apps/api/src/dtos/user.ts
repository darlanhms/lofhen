import { Role } from '@prisma/client';

export interface UserDTO {
  id: string;
  name: string;
  username: string;
  role: Role;
  createdAt: Date;
}
