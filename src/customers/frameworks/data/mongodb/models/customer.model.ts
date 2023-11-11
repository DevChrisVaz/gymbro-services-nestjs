import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { UserModel } from 'src/users/frameworks/data/mogodb/models/user.model';

export type CustomerDocument = CustomerModel & Document;

@Schema()
export class CustomerModel implements Customer {
  @Prop({ required: true, unique: true })
  person: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop()
  usedPasswords: string[];

  @Prop()
  profilePicture: string;

  @Type(() => UserModel)
  userRef: UserModel;
}

const CustomerSchema = SchemaFactory.createForClass(CustomerModel);

// CustomerSchema.virtual('userRef', {
//   ref: 'UserModel',
//   localField: 'user',
//   foreignField: 'uuid',
//   justOne: true,
// });

export { CustomerSchema };
