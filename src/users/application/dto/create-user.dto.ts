import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CreatePersonDto } from './create-person.dto';
import { Role } from 'src/permitions/domain/enums/role.enum';

export class CreateUserDto extends CreatePersonDto {
  @ApiHideProperty()
  person: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    enum: Role,
  })
  @IsOptional()
  @IsString()
  @IsEnum(Role)
  role?: string;
}
