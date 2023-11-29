import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from './domain/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { CreateUserDto, UpdateUserDto } from './application/dto';
import { CreatePersonDto } from './application/dto/create-person.dto';
import { UpdatePersonDto } from './application/dto/update-person.dto';
import {
  IPerson,
  Person,
  SerializedPerson,
} from './domain/entities/person.entity';

@Injectable()
export class UsersService {
  mapDtoToPerson(dto: CreatePersonDto | UpdatePersonDto): IPerson {
    return plainToClass(Person, dto);
  }

  serializePerson(person: IPerson): SerializedPerson {
    return new SerializedPerson(person);
  }

  mapDtoToUser(dto: CreateUserDto | UpdateUserDto): User {
    return plainToClass(User, dto);
  }

  serializeUser(user: User): SerializedUser {
    return new SerializedUser(user);
  }
}
