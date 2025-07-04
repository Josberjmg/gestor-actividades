import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Activity extends Document {
    @Prop({ type: String, required: true })
    title?: string;

    @Prop({ type: String })
    description?: string;

    @Prop({ type: Number, required: true })
    duration?: number;

    @Prop({ type: Boolean, default: false })
    completed?: boolean;

    @Prop({ type: Date })
    date?: Date;

    @Prop({ type: String, ref: 'User', required: true })
    user?: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);