import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Activity {
    @Prop()
    id!: string;

    @Prop()
    title!: string;

    @Prop() description?: string;
    date!: Date;

    @Prop()
    duration!: number;

    @Prop()
    completed?: boolean = false;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user!: mongoose.Types.ObjectId;
}

export const activitySchema = SchemaFactory.createForClass(Activity);

activitySchema.set("toJSON", {
    virtuals: false,
    versionKey: false,
    transform: function(doc, returnedObject){
        returnedObject.id = doc._id;
        delete returnedObject._id; 
        delete returnedObject.__v; 
    }
})