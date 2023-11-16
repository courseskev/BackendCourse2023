import { Schema, model } from "mongoose";

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
    role: {
        type:String,
        enum: ['ADMIN', 'STANDARD'],
        default: 'STANDARD'
    },
    auth: {
        type: String,
        enum: ['GOOGLE', 'GITHUB', 'NONE'],
        default: 'NONE'
    }
})

export const usersModel = model('Users', usersSchema)