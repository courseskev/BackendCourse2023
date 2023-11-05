import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
        type:String,
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
        type:String
    } 
});

productSchema.plugin(mongoosePaginate)
export const productModel = model('Products', productSchema)