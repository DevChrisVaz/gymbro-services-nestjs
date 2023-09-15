import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LogInDto {

    @IsString()
    @IsNotEmpty()
    ref: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
    
}