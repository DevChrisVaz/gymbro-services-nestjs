import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IGymManager } from 'src/gyms/domain/entities/gym-manager.entity';

export type GymManagerDocument = GymManagerModel & Document;

@Schema({ timestamps: true })
export class GymManagerModel implements IGymManager {

    @Prop({ required: true })
    gym: string;

    @Prop({ required: true })
    user: string;

    @Prop({ required: true })
    rol: string;

    @Prop({ required: true })
    status: string;

    createdAt: string;
    updatedAt: string;
}

export const GymManagerSchema = SchemaFactory.createForClass(GymManagerModel);
