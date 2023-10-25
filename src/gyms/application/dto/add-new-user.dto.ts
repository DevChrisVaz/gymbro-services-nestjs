import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUUID } from 'class-validator';
import { CreateUserDto } from 'src/users/application/dto';

export class AddNewUserDto extends CreateUserDto {

  @ApiHideProperty()
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  rol: string;

  @ApiHideProperty()
  @IsUUID()
  @IsNotEmpty()
  gym: string;

}
