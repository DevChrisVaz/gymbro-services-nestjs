import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  zip: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  constructor(partial: Partial<AddressResponseDto>) {
    Object.assign(this, partial);
  }
}
