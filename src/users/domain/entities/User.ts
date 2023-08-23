import { Exclude } from "class-transformer";
import { ITimestamps } from "src/database/domain/entities/ITimestamps";

export interface IUser extends ITimestamps {
    uuid: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    usedPasswords: string[];
    phone: string;
    profilePicture: string;
    birthdate: Date;
    tokens: string[];
    status: string;
}

export class User implements IUser {
    uuid: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    usedPasswords: string[];
    phone: string;
    profilePicture: string;
    birthdate: Date;
    tokens: string[];
    status: string;
}

export class SerializedUser implements IUser {

    uuid: string;

    firstName: string;

    lastName: string;

    userName: string;

    @Exclude()
    password: string;

    @Exclude()
    usedPasswords: string[];
    
    phone: string;

    profilePicture: string;

    birthdate: Date;

    @Exclude()
    tokens: string[];

    status: string;

    createdAt?: string;

    updatedAt?: string;

    constructor(partial: Partial<SerializedUser>) {
        Object.assign(this, partial);
    }
}