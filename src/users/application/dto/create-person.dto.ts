import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePersonDto {
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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;
}
