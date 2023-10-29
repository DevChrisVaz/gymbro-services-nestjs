import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Action } from 'src/permitions/domain/enums/action.enum';

export type PermitionDocument = PermitionModel & Document;

@Schema({ timestamps: true })
export class PermitionModel {
  @Prop({ unique: true, required: true })
  uuid: string;

  @Prop({
    required: true,
    enum: Action,
  })
  action: string;

  @Prop({ required: true })
  objectId: string;

  @Prop({
    required: true,
    type: Map,
    of: String,
  })
  condition: any;
}

export const BranchPermitionSchema =
  SchemaFactory.createForClass(PermitionModel);
