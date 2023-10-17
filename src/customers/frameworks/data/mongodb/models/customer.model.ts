import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Customer } from 'src/customers/domain/entities/customer.entity';

export type CustomerDocument = CustomerModel & Document;

@Schema({ timestamps: true })
export class CustomerModel implements Customer {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ required: true })
  password: string;

  @Prop()
  usedPasswords: string[];

  @Prop()
  profilePicture: string;

  @Prop()
  tokens: string[];

  @Prop({ default: 'UNVERIFIED' })
  status: string;

  createdAt: string;
  updatedAt: string;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerModel);
