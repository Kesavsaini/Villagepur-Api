const mongoose=require("mongoose");
const quoteSchema=new mongoose.Schema({
   quote:{
       type:String,
       required:true
   },
   auther:{
       type:String,
       required:true
   },
   img:String
},{timestamps:true});
module.exports=mongoose.model("Quote",quoteSchema);
