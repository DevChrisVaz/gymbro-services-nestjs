import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UserLogInDto {

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;
}