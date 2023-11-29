import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AddressResponseDto } from 'src/addresses/application/dto/responses/address-response.dto';

export class BranchWithAddressResponseDto {
  @Exclude()
  _id?: string;

  @Exclude()
  __v?: string;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: AddressResponseDto,
  })
  address: AddressResponseDto;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @Exclude()
  gym: string;

  @Exclude()
  socialMedia?: [string];

  @Exclude()
  operatingHours?: [string];

  @Exclude()
  policies?: [string];

  @Exclude()
  rules?: [string];

  @Exclude()
  status: string;

  constructor(partial: Partial<BranchWithAddressResponseDto>) {
    Object.assign(this, partial);
  }
}
