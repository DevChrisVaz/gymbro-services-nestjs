import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUserRole } from 'src/permitions/domain/entities/user-role.entity';
import { Role } from 'src/permitions/domain/enums/role.enum';

export type UserRoleDocument = UserRoleModel & Document;

@Schema({ timestamps: true })
export class UserRoleModel implements IUserRole {
  @Prop({ unique: true, required: true })
  user: string;

  @Prop({
    required: true,
    enum: Role,
  })
  role: string;

  @Prop()
  gym: string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRoleModel);
