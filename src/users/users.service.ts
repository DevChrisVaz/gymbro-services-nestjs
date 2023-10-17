import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from './domain/entities/User';
import { plainToClass } from 'class-transformer';
import { CreateUserDto, UpdateUserDto } from './application/dto';

@Injectable()
export class UsersService {
  mapDtoToUser(dto: CreateUserDto | UpdateUserDto): User {
    return plainToClass(User, dto);
  }

  serializeUser(user: User): SerializedUser {
    return new SerializedUser(user);
  }
}
