import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IGym } from 'src/gyms/domain/entities/gym.entity';

export class GYMResponseDTO implements IGym {
  @Exclude()
  _id?: string;

  @Exclude()
  __v?: string;

  @Exclude()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  logo: string;

  @Exclude()
  status: string;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty()
  updatedAt?: string;

  constructor(partial: Partial<GYMResponseDTO>) {
    Object.assign(this, partial);
  }
}
