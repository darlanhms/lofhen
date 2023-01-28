import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import UserEntity from '@entities/user';
import BadRequestError from '@errors/badRequestError';
import IUserRepository from '@repositories/IUserRepository';
import { CreateUserRequest } from './createUserRequest';

@injectable()
export default class CreateUser implements UseCase<CreateUserRequest, UserEntity> {
  constructor(
    @inject('UserRepository')
    private userRepo: IUserRepository,
  ) {}

  async execute(request: CreateUserRequest): Promise<UserEntity> {
    const alreadyRegisteredUser = await this.userRepo.findByUsername(request.username);

    if (alreadyRegisteredUser) {
      throw new BadRequestError('Nome de usuário já cadastrado.');
    }

    const user = new UserEntity({
      name: request.name,
      username: request.username,
      role: request.role,
      password: request.password,
    });

    const newUser = await this.userRepo.save(user);

    return newUser;
  }
}
