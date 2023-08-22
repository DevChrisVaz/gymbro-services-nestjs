import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    birthdate: string;

    @IsString()
    @IsNotEmpty()
    rol: string;

    @IsString()
    @IsOptional()
    status?: string;
}
