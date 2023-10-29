import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPlan } from 'src/plans/domain/entities/plan.entity';

export type PlanDocument = PlanModel & Document;

@Schema({ timestamps: true })
export class PlanModel implements IPlan {
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
  branch: string;

  @Prop({ required: true, default: 'ACTIVE' })
  status: string;

  createdAt: string;
  updatedAt: string;
}

export const PlanSchema = SchemaFactory.createForClass(PlanModel);
