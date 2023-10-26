import { Schema, model } from "mongoose";

const messageSchema = new Schema ({
    user: {
        type: String,
        required:true
    },
    message: {
        type: String
    }
})

export const messageModel = model('Messages', messageSchema)
