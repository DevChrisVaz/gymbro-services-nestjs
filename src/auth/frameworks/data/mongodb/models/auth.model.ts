import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IAuth } from "src/auth/domain/entities/auth";

export type UserDocument = AuthModel & Document;

@Schema()
export class AuthModel implements IAuth {
    @Prop({ required: true })
    ref: string;
    @Prop({ required: true })
    userName: string;
    @Prop({ required: true })
    password: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);