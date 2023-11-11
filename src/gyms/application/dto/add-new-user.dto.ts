import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { CreateUserDto } from 'src/users/application/dto';

export class AddNewUserDto extends CreateUserDto {

  @ApiHideProperty()
  user: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  status?: string;

}
