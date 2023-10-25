import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddNewUserDto } from './add-new-user.dto';

export class CreateGymDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: AddNewUserDto 
  })
  @IsNotEmpty()
  @ValidateNested()
  user: AddNewUserDto

}
