import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/User';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { UsersService } from 'src/users/users.service';
import { DataHashingContract } from 'src/encryption/domain/contracts/hashing.contract';
import { CreateUserDto } from '../dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersService: UsersService,
    private readonly hashingService: DataHashingContract,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(createUserDTO: CreateUserDto): Promise<User> {
    const user = this.usersService.mapDtoToUser(createUserDTO);
    user.password = await this.hashingService.hash(user.password);
    const createdUser: User = await this.dataServices.users.save(user);
    return this.usersService.serializeUser(createdUser);
  }
}
