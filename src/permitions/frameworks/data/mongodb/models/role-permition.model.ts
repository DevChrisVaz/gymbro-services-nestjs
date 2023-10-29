import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RolePermitionDocument = RolePermitionModel & Document;

@Schema({ timestamps: true })
export class RolePermitionModel {
  @Prop({ unique: true, required: true })
  uuid: string;

  @Prop({ required: true })
  roleId: string;

  @Prop({ required: true })
  permitionId: string;
}

export const BranchPermitionSchema =
  SchemaFactory.createForClass(RolePermitionModel);
