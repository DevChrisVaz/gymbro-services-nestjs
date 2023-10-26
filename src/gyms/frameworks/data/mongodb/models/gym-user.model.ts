import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';
import { UserModel } from 'src/users/frameworks/data/mogodb/models/user.model';

export type GYMUserDocument = GYMUserModel & Document;

@Schema()
export class GYMUserModel implements IGYMUser {
  @Prop({ required: true, unique: true })
  user: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop([String])
  usedPasswords: string[];

  @Prop({ required: true, default: 'ADMIN' })
  rol: string;

  @Prop({ required: true })
  gym: string;

  @Type(() => UserModel)
  userRef: UserModel;
}

const GYMUserSchema = SchemaFactory.createForClass(GYMUserModel);

GYMUserSchema.virtual('userRef', {
  ref: 'UserModel',
  localField: 'user',
  foreignField: 'uuid',
  justOne: true,
});

export { GYMUserSchema };
