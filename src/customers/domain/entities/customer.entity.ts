import { Exclude } from "class-transformer";
import { ITimestamps } from "src/core/domain/entities/ITimestamps";

export abstract class Customer extends ITimestamps {
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

export class SerializedCustomer implements Customer {

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

    createdAt?: string;

    updatedAt?: string;
}
