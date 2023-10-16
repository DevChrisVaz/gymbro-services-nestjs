import { Exclude } from "class-transformer";
import { ITimestamps, TTimestamps } from "src/database/domain/entities/ITimestamps";

export interface ISubscription extends ITimestamps {
    uuid: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    gym: string;
    status: string;
}

export type TSubscription = TTimestamps & {
    uuid: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    gym: string;
    status: string;
}

export class Subscription implements TSubscription {
    uuid: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    gym: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

// export class SerializedUser implements ISubscription {

//     uuid: string;

//     firstName: string;

//     lastName: string;

//     userName: string;

//     @Exclude()
//     password: string;

//     @Exclude()
//     usedPasswords: string[];
    
//     phone: string;

//     profilePicture: string;

//     birthdate: Date;

//     @Exclude()
//     tokens: string[];

//     status: string;

//     rol: string;

//     createdAt: string;

//     updatedAt: string;

//     constructor(partial: Partial<SerializedUser>) {
//         Object.assign(this, partial);
//     }
// }