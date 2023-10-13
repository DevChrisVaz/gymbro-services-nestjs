import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from './domain/entities/User';
import { CreateUserDto } from './domain/dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './domain/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor() { }

  mapDtoToUser(dto: CreateUserDto | UpdateUserDto): User {
    return plainToClass(User, dto);
  }

  serializeUser(user: User): SerializedUser {
    return new SerializedUser(user);
  }
}
