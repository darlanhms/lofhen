import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import Entity from '@core/Entity';

interface UserProps {
  name: string;
  username: string;
  role: Role;
  password: string;
  hashedPassword?: boolean;
  createdAt?: Date;
}

type UpdatableProps = Pick<UserProps, 'name' | 'username' | 'password'>;

export default class UserEntity extends Entity<UserProps> {
  name: string;

  username: string;

  role: Role;

  password: string;

  hashedPassword: boolean;

  createdAt: Date;

  constructor(props: UserProps, id?: string) {
    const propsWithDefault: UserProps = {
      hashedPassword: false,
      createdAt: new Date(),
      ...props,
    };

    super(propsWithDefault, id);
  }

  update(props: Partial<UpdatableProps>): void {
    if (props.username) {
      this.username = props.username;
    }

    if (props.password) {
      this.password = props.password;
      this.hashedPassword = false;
    }

    if (props.name) {
      this.name = props.name;
    }
  }

  async hashPassword(): Promise<void> {
    if (!this.password || this.hashedPassword) {
      return;
    }

    this.password = await bcrypt.hash(this.password, 6);
    this.hashedPassword = true;
  }

  async comparePassword(plainText: string): Promise<boolean> {
    if (!this.password) {
      return false;
    }

    const matches = await bcrypt.compare(plainText, this.password);

    return matches;
  }
}
