import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUserDto {
    @IsUUID()
    @IsNotEmpty()
    uuid: string;

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
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    birthdate: string;

    @IsString()
    @IsNotEmpty()
    rol: string;

    @IsString()
    @IsOptional()
    status?: string;
}
