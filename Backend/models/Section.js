const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    subsectionName:{
        type:String,
    },
    subsection:[   
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Subsection"
        }
    ],
})

module.exports = mongoose.model("Section",sectionSchema);