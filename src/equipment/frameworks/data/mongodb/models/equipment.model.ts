import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IEquipment } from 'src/equipment/domain/entities/equipment.entity';

export type EquipmentDocument = EquipmentModel & Document;

@Schema({ timestamps: true })
export class EquipmentModel implements IEquipment {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 1 })
  qty: number;

  @Prop({ required: true })
  image: string;

  @Prop({ default: 'UNVERIFIED' })
  status: string;

  @Prop({ required: true })
  branch: string;

  createdAt: string;
  updatedAt: string;
}

export const EquipmentSchema = SchemaFactory.createForClass(EquipmentModel);
