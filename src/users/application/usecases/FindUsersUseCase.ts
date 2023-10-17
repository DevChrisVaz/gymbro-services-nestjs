import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { User } from 'src/users/domain/entities/User';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FindUsersUseCase {
  constructor(
    private readonly usersService: UsersService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(): Promise<User[]> {
    const users: User[] = await this.dataServices.users.find({});
    return users.map((user) => this.usersService.serializeUser(user));
  }
}
