import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/domain/entities/User';

export type UserDocument = UserModel & Document;

@Schema({ timestamps: true })
export class UserModel implements User {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop([String])
  usedPasswords: string[];

  @Prop()
  phone: string;

  @Prop()
  profilePicture: string;

  @Prop()
  birthdate: Date;

  @Prop([String])
  tokens: string[];

  @Prop({ required: true, default: "ADMIN" })
  rol: string;

  @Prop({ required: true, default: 'ACTIVE' })
  status: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
