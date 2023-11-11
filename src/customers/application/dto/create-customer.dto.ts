import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CreatePersonDto } from 'src/users/application/dto/create-person.dto';

export class CreateCustomerDto extends CreatePersonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('MX')
  phone: string;

  @ApiProperty()
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  birthdate: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  @Exclude()
  override status: string;
}
