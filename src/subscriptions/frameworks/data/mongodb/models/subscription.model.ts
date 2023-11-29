import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISubscription } from 'src/subscriptions/domain/entities/subscription.entity';

export type SubscriptionDocument = SubscriptionModel & Document;

@Schema({ timestamps: true })
export class SubscriptionModel implements ISubscription {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  customer: string;

  @Prop({ required: true })
  plan: string;

  @Prop({ required: true, default: 'ACTIVE' })
  status: string;

  createdAt: string;
  updatedAt: string;
}

export const SubscriptionSchema =
  SchemaFactory.createForClass(SubscriptionModel);
