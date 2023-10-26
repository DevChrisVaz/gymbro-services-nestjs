import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddNewUserDto } from './add-new-user.dto';
import { PickType } from '@nestjs/mapped-types';

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
    type: PickType(AddNewUserDto, ["userName", "password"] as const),
  })
  @IsNotEmpty()
  @ValidateNested()
  user: AddNewUserDto;
}
