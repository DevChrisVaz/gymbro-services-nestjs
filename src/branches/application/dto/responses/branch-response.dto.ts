import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
// import { CreateAddressDto } from 'src/addresses/application/dto/create-address.dto';

export class BranchResponseDto {
  @Exclude()
  _id?: string;

  @Exclude()
  __v?: string;

  @ApiHideProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  // @ApiProperty({
  //     type: CreateAddressDto,
  // })
  // address: CreateAddressDto;

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

  constructor(partial: Partial<BranchResponseDto>) {
    Object.assign(this, partial);
  }
}
