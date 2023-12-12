import mongoose, { Schema, model } from "mongoose";

const usersSchema = new Schema({
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    age: {
        type: Number, 
        required: true
    },
    role: {
        type:String,
        enum: ['ADMIN', 'STANDARD'],
        default: 'STANDARD'
    },
    auth: {
        type: String,
        enum: ['GOOGLE', 'GITHUB', 'NONE'],
        default: 'NONE'
    },
    cart: {
        type:[{type: mongoose.SchemaTypes.ObjectId, ref: "Cart"}],
        default: []
    }
})

export const usersModel = model('Users', usersSchema)