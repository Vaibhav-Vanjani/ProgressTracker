const mongoose = require('mongoose');
const { boolean } = require('zod');
const { required } = require('zod/mini');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
         type:String,
         required:true,
    },
    password:{
         type:String,
         required:true,
    },
    phoneNumber:{
         type:String,
         required:true,
    },
    isAdmin:{
        type:boolean,
        required:true,
    },
    availableSheets:[{
        type:String,
    }]
})

module.exports =  mongoose.model('User',userSchema);