import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBranch } from 'src/branches/domain/entities/branch.entity';

export type BranchDocument = BranchModel & Document;

@Schema({ timestamps: true })
export class BranchModel implements IBranch {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  socialMedia?: [string];

  @Prop()
  operatingHours?: [string];

  @Prop()
  policies?: [string];

  @Prop()
  rules?: [string];

  @Prop({ required: true })
  gym: string;

  @Prop()
  logo: string;

  @Prop({ default: 'UNVERIFIED' })
  status: string;
}

export const BranchSchema = SchemaFactory.createForClass(BranchModel);
