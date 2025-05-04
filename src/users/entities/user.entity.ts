import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop()
    id!:string;

    @Prop()
    name!: string;

    @Prop()
    email!: string;

    @Prop()
    password!: string;

}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.set("toJSON", {
    virtuals: false,
    versionKey: false,
    transform: function(doc, returnedObject){
        returnedObject.id = doc._id;
        delete returnedObject._id; 
        delete returnedObject.__v; 
    }
});
