// import { Exclude } from "class-transformer";
import { ITimestamps, TTimestamps } from "src/database/domain/entities/ITimestamps";

export interface IPlan extends ITimestamps {
    uuid: string;
    customer: string;
    gym: string;
    status: string;
}

// export type TPlan = TTimestamps & {
//     uuid: string;
//     customer: string;
//     gym: string;
//     status: string;
// }

export class Plan implements IPlan {
    uuid: string;
    customer: string;
    gym: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

// export class SerializedPlan implements IPlan {

//     uuid: string;
//     customer: string;
//     gym: string;
//     status: string;

//     constructor(partial: Partial<SerializedPlan>) {
//         Object.assign(this, partial);
//     }
// }