import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/users/application/dto';
import { CreateBranchDto } from 'src/branches/application/dto/create-branch.dto';

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

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: OmitType(CreateUserDto, ['person', 'status', 'uuid']),
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ApiProperty({
    type: CreateBranchDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateBranchDto)
  branch: CreateBranchDto;
}
