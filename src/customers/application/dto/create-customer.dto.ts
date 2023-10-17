import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

export class CreateCustomerDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('MX')
  phone: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  birthdate: string;
}
