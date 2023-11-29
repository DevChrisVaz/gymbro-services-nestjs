import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/addresses/application/dto/create-address.dto';

export class CreateBranchDto {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: CreateAddressDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('MX')
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  gym: string;
}
