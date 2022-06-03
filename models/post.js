const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    user:{
        type:String,
       
    }
},{timestamps:true});
module.exports=mongoose.model("Post",postSchema);
