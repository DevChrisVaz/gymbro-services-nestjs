import { User } from "../../entities/User";

export class CreateUserResponseDTO {
    success: boolean;
    createdUser?: User;
}