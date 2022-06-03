const express=require("express");
const app=express();
const UserRoute=require("./routes/auth");
const PostRoute=require("./routes/posts");
const QuotRoute=require('./routes/quotes')
const mongoose=require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL,()=>{console.log("DataBase is Running")});
app.use(express.json());
app.use("/auth",UserRoute);
app.use("/post",PostRoute);
app.use('/quote',QuotRoute);
app.listen(8000,()=>{
    console.log("Server is running");
})
