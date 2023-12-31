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
  @Transform((value) => {
    const parts = value.value.split('/').map(Number);
    return new Date(parts[2], parts[1] - 1, parts[0]);
  })
  @IsNotEmpty()
  @IsDate()
  birthdate: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  @Exclude()
  override status: string;
}
