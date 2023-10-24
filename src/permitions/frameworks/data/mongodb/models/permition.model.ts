import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPermition } from 'src/permitions/domain/entities/permition.entity';
import { AccessLevel } from 'src/permitions/domain/enums/access-level.enum';
import { Roles } from 'src/permitions/domain/enums/roles.enum';

export type PermitionDocument = PermitionModel & Document;

@Schema()
export class PermitionModel implements IPermition {

    @Prop({
        required: true,
        enum: AccessLevel
    })
    accessLevel: string;

    @Prop()
    entity?: string;

    @Prop({ required: true })
    user: string;

    @Prop({
        required: true,
        enum: Roles,
    })
    rol: string;

    createdAt: string;
    updatedAt: string;
}

export const PermitionSchema = SchemaFactory.createForClass(PermitionModel);
