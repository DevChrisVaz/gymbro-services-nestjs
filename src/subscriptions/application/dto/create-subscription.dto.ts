import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {

  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  customer: string;

  @IsNotEmpty()
  @IsUUID()
  gym: string;

}
