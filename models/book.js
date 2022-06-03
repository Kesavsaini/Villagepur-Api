const mongoose=require("mongoose");
const bookSchema=new mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    link:{
     type:String,
     required:true
    }
},{timestamps:true});
module.exports=mongoose.model("Book",bookSchema);
