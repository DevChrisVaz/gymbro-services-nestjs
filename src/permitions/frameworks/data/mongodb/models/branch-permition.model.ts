import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBranchPermition } from 'src/permitions/domain/entities/branch-permition.entity';

export type BranchPermitionDocument = BranchPermitionModel & Document;

@Schema({ timestamps: true })
export class BranchPermitionModel implements IBranchPermition {
  @Prop()
  branch: string;

  @Prop({ required: true })
  user: string;
}

export const BranchPermitionSchema =
  SchemaFactory.createForClass(BranchPermitionModel);
