import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAddress } from 'src/addresses/domain/entities/address.entity';

export type AddressDocument = AddressModel & Document;

@Schema({ timestamps: true })
export class AddressModel implements IAddress {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  building: string;

  @Prop({ required: true })
  zip: string;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  status: string;

  createdAt: string;
  updatedAt: string;
}

export const AddressSchema = SchemaFactory.createForClass(AddressModel);
