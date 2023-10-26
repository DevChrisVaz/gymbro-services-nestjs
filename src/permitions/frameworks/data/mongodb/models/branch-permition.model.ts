import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBranchPermition } from 'src/permitions/domain/entities/branch-permition.entity';
import { BranchRole } from 'src/permitions/domain/enums/branch-role.enum';

export type BranchPermitionDocument = BranchPermitionModel & Document;

@Schema()
export class BranchPermitionModel implements IBranchPermition {

  @Prop()
  branch: string;

  @Prop({ required: true })
  user: string;

  @Prop({
    required: true,
    enum: BranchRole,
  })
  rol: string;

  createdAt: string;
  updatedAt: string;
}

export const BranchPermitionSchema = SchemaFactory.createForClass(BranchPermitionModel);
