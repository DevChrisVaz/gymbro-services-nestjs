import { Exclude } from "class-transformer";

export interface IAuth {
    ref: string;
    userName: string;
    password: string;
}

export class Auth implements IAuth {
    ref: string;
    userName: string;
    password: string;
}

export class SerializedAuth implements IAuth {
    @Exclude()
    ref: string;
    userName: string;
    password: string;

    constructor(partial: Partial<SerializedAuth>) {
        Object.assign(this, partial);
    }
}