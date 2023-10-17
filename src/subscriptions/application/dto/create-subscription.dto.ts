import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @IsNotEmpty()
  @IsUUID()
  customer: string;

  @IsNotEmpty()
  @IsUUID()
  gym: string;
}
