const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({

    title : {
        type : String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    start_time:{
        type: Date,
        required: true

    },
    end_time:{
        type: Date,
        required: true,
    },
    duration:{
        type: Number,
        
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {timestamps : true});

module.exports = mongoose.model("Task", TaskSchema);