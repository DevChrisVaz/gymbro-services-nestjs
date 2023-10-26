import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
  address: CreateAddressDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  gym: string;
}
