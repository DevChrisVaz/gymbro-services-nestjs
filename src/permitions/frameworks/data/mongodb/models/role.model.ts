import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = RoleModel & Document;

@Schema({ timestamps: true })
export class RoleModel {
  @Prop({ unique: true, required: true })
  uuid: string;

  @Prop({ required: true })
  name: string;
}

export const BranchPermitionSchema = SchemaFactory.createForClass(RoleModel);
