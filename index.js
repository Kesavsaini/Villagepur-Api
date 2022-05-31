const express=require("express");
const app=express();
const mongoose=require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL,()=>{console.log("DataBase is Running")});
app.listen(8000,()=>{
    console.log("Server is running");
})
