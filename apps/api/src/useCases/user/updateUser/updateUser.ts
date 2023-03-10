import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import IUserRepository from '@repositories/IUserRepository';
import { UpdateUserRequest } from './updateUserRequest';

@injectable()
export default class UpdateUser implements UseCase<UpdateUserRequest, void> {
  constructor(
    @inject('UserRepository')
    private userRepo: IUserRepository,
  ) {}

  async execute(request: UpdateUserRequest): Promise<void> {
    const user = await this.userRepo.findById(request.id);

    if (!user) {
      return;
    }

    user.update({
      name: request.name,
      username: request.username,
      password: request.password,
    });

    await this.userRepo.save(user);
  }
}
