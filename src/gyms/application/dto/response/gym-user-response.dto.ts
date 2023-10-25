import { IGYMUser } from "src/gyms/domain/entities/gym-user.entity";
import { IUser } from "src/users/domain/entities/User";

export interface GYMUserResponseDTO extends IUser, IGYMUser {
    // user: string;
    // usedPasswords: string[];
    // userName: string;
    // gym: string;
    // rol: string;
    // uuid: string;
    // firstName: string;
    // lastName: string;
    // profilePicture: string;
    // status: string;
    // createdAt?: string;
    // updatedAt?: string;
}

// applyMixins(GYMUserResponseDTO, [User, GYMUser]);

// export default { GYMUserResponseDTO };