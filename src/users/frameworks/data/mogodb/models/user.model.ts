import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from 'src/users/domain/entities/user.entity';

export type UserDocument = UserModel & Document;

@Schema({ timestamps: true })
export class UserModel implements IUser {
  @Prop({ required: true, unique: true })
  person: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop()
  usedPasswords: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
