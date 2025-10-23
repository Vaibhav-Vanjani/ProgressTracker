const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({
    questionName:{
        type:String,
    },
    questionLink:{
        type:String,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
    },
    markForRevision:{
        type:Boolean,
    },
    markCompleted:{
        type:Boolean,
    }
})

module.exports = mongoose.model("Subsection",subSectionSchema);