const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({

    name : {
        type : String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    dateofjoin : {
        type : Date,
        default: Date.now,
        required: true,
    },
    contactno:{
        type: Number,
        required: true,

    },
    department:{
        type: String,
        required: true,

    },
    role:{
        type: String,
        required: true,
        default:'Normal'
    }

}, {timestamps : true});

const User=mongoose.model("User", UserSchema);
module.exports=User;