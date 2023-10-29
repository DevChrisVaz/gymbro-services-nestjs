import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  building: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  zip: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;
}
