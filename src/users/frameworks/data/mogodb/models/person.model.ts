import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Person } from 'src/users/domain/entities/person.entity';

export type PersonDocument = PersonModel & Document;

@Schema({ timestamps: true })
export class PersonModel implements Person {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  profilePicture: string;

  @Prop({ required: true, default: 'ACTIVE' })
  status: string;
}

export const PersonSchema = SchemaFactory.createForClass(PersonModel);
