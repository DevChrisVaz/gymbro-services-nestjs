import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ObjectDocument = ObjectModel & Document;

@Schema({ timestamps: true })
export class ObjectModel {
  @Prop({ unique: true, required: true })
  uuid: string;

  @Prop({ required: true })
  name: string;
}

export const BranchPermitionSchema = SchemaFactory.createForClass(ObjectModel);
