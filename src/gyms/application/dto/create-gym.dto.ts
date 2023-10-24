import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/users/application/dto';

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
    type: CreateUserDto
  })
  @IsNotEmpty()
  @ValidateNested()
  user: CreateUserDto

}
