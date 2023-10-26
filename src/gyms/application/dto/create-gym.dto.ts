import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { AddNewUserDto } from './add-new-user.dto';
import { Type } from 'class-transformer';

export class CreateGymDto {
  
  @ApiHideProperty()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: OmitType(AddNewUserDto, ["user", "status", "rol", "uuid", "gym"]),
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OmitType(AddNewUserDto, ["gym"]))
  user: AddNewUserDto;
}
