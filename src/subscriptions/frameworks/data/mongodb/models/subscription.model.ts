import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";
import { ISubscription } from "src/subscriptions/domain/entities/subscription.entity";

export type SubscriptionDocument = SubscriptionModel & Document;

@Schema({ timestamps: true })
export class SubscriptionModel implements ISubscription {

    @Prop({ required: true, unique: true })
    uuid: string;

    @Prop({ required: true })
    title: string;
    
    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    duration: number;

    @Prop({ required: true })
    price: number;

    @Prop()
    gym: string;

    @Prop({ required: true, default: "ACTIVE" })
    status: string;

    @Prop({ default: now() })
    createdAt: string;

    @Prop({ default: now() })
    updatedAt: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(SubscriptionModel);