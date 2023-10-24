import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {

  @ApiHideProperty()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiPropertyOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  birthdate: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  rol: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;
}
