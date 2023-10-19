import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LogInDto {

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  
}
