const mongoose = require('mongoose');
const { required } = require('zod/mini');

const sheetSchema = new mongoose.Schema({
    sheetName:{
        type:String,
    },
    section:[   
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    createdBy:{
        type:String,
        enum:["User","Admin","ViewOnly"],
        required:true,
    }
})

module.exports = mongoose.model("Sheet",sheetSchema);