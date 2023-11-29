import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IUser } from 'src/users/domain/entities/user.entity';
import { IPerson } from 'src/users/domain/entities/person.entity';

export class UserResponseDTO implements IPerson, IUser {
  @Exclude()
  _id: any;

  @Exclude()
  __v: any;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  profilePicture: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  updatedAt?: string;

  @Exclude()
  person: string;

  @ApiProperty()
  userName: string;

  @Exclude()
  usedPasswords: string[];

  constructor(partial: Partial<UserResponseDTO>) {
    Object.assign(this, partial);
  }
}
