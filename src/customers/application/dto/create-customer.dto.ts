import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
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
  @Transform(value => Intl.DateTimeFormat("dd/MM/yyyy").format(new Date(value.value)))
  @IsNotEmpty()
  @IsDate()
  birthdate: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  @Exclude()
  override status: string;
}
