import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRole } from 'src/permitions/domain/entities/role.entity';

export type RoleDocument = RoleModel & Document;

@Schema({ timestamps: true })
export class RoleModel implements IRole {
  @Prop({ unique: true, required: true })
  uuid: string;

  @Prop({ required: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel);
