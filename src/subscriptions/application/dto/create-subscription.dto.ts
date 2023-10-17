import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSubscriptionDto {

    @IsNotEmpty()
    @IsUUID()
    uuid: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsUUID()
    gym: string;
    
}
