import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  customer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  plan: string;
}
