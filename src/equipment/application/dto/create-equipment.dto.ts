import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEquipmentDto {
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
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  branch: string;
}
