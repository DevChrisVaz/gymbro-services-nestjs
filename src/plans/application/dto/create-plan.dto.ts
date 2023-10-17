import { IsNotEmpty, IsUUID } from "class-validator";

export class CreatePlanDto {

    @IsNotEmpty()
    @IsUUID()
    uuid: string;

    @IsNotEmpty()
    @IsUUID()
    customer: string;

    @IsNotEmpty()
    @IsUUID()
    gym: string;
}
