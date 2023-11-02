import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    isSingle:{
        type:Boolean,
        required:false
    }

})

const userModel = mongoose.model('Users', usersSchema)

export default userModel