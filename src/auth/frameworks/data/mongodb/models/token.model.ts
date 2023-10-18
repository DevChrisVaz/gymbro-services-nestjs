import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TokenContract } from 'src/auth/domain/entities/token';

export type TokenDocument = TokenModel & Document;

@Schema({ timestamps: true })
export class TokenModel implements TokenContract {
  @Prop({ required: true })
  ref: string;

  @Prop({ required: true })
  token: string;

  createdAt: string;
  updatedAt: string;
}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);
