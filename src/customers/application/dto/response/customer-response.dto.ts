import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ICustomer } from 'src/customers/domain/entities/customer.entity';
import { IUser } from 'src/users/domain/entities/user.entity';
import { IPerson } from 'src/users/domain/entities/person.entity';

export class CustomerResponseDTO implements IPerson, ICustomer {
  @Exclude()
  _id?: string;

  @Exclude()
  __v?: string;

  @Exclude()
  person: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthdate: Date;

  @Exclude()
  usedPasswords: string[];

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  profilePicture: string;

  @Exclude()
  status: string;

  @Exclude()
  userRef?: IUser;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  updatedAt?: string;

  constructor(partial: Partial<CustomerResponseDTO>) {
    Object.assign(this, partial);
  }
}
