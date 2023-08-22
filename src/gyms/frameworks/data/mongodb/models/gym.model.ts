import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IGym } from "src/gyms/domain/entities/gym.entity";

export type GymDocument = GymModel & Document;

@Schema({ timestamps: true })
export class GymModel implements IGym {
    @Prop({ required: true, unique: true })
    uuid: string;
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    logo: string;
    
    @Prop()
    
    address: string;

    @Prop({ default: "UNVERIFIED" })
    status: string
}

export const GymSchema = SchemaFactory.createForClass(GymModel);