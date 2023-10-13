import { Exclude } from "class-transformer";
import { ITimestamps } from "src/database/domain/entities/ITimestamps";

export interface ICustomer extends ITimestamps {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthdate: Date;
    password: string;
    usedPasswords: string[];
    profilePicture: string;
    tokens: string[];
    status: string;
}

export class Customer implements ICustomer {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthdate: Date;
    password: string;
    usedPasswords: string[];
    profilePicture: string;
    tokens: string[];
    status: string;
}

export class SerializedCustomer implements ICustomer {

    uuid: string;
    
    firstName: string;
    
    lastName: string;
    
    email: string;

    phone: string;

    birthdate: Date;
        
    @Exclude()
    password: string;
    
    @Exclude()
    usedPasswords: string[];
    
    profilePicture: string;

    @Exclude()
    tokens: string[];

    status: string;

    createdAt: string;

    updatedAt: string;

    constructor(partial: Partial<SerializedCustomer>) {
        Object.assign(this, partial);
    }
}
