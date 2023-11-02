import { Schema, SchemaTypes, model } from "mongoose";

const cartSchema = new Schema ({
    products: [
        {
            product: {
                type: SchemaTypes.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
            },
            _id: false,
        }
    ]
})

export const cartModel = model('Cart', cartSchema)