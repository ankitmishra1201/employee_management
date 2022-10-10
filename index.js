const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRouter=require('./Routes/User.js');
const taskRouter=require('./Routes/Task.js');

const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;


app.get("/", (req, res) =>{
    res.send("Server Activated");
});


app.use(userRouter);
app.use('/task',taskRouter)

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server started on port no. " + PORT);
    });
})
.catch((error)=>{
    console.log(error);
})