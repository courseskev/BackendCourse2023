import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type:String,
        required:true
    }, 
    description:{
        type:String,
        required:true
    }, 
    code:{
        type:Number,
        required:true
    }, 
    price: {
        type:Number,
        required:true
    }, 
    status: {
        type:Boolean,
        default: true
    },
    stock:{
        type:Number,
        default: 0
    },
    category: {
        type:String
    },
    thumbnails: {
        type:Array
    } 
});

export const productModel = model('Product', productSchema)