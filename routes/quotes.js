const router=require("express").Router();
const Quote=require("../models/quote");
const verify=require("../verify");
//Making a Quote
router.post('/newquote',verify,async(req,res)=>{
    if(req.user.isAdmin){
    try{
      const quote=await new Quote({...req.body});
      await quote.save();
      res.status(200).json(quote);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    
    }
  }else{
    res.json("Only admin can a quote");
  }
});
//Getting all quotes
router.get('/allquotes',async(req,res)=>{
    try{
      const quotes=await Quote.find().sort({createdAt:-1});
      res.status(200).json(quotes);
    }catch(err){
        res.status(500).json(err);
    }
});
   
//Get Latest Quotes
router.get('/latestquotes',async(req,res)=>{
  try{
    const quotes=await Quote.find().sort({createdAt:-1}).limit(6);
    res.status(200).json(quotes);
  }catch(err){
      res.status(500).json(err);
  }
});
//Editing Blog
router.put('/:id/updatequote',verify,async(req,res)=>{
  if(req.user.isAdmin){
    try{
      const quote=await Quote.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.status(200).json(quote);
    }catch(err){
      res.status(500).json(err);
    }
  }
  else{
    req.json("Only admin can update this Quote");
  }
});
//Deleting a quote
router.delete('/:id/deletequote',verify,async(req,res)=>{
  if(req.user.isAdmin){
  try{
    await Quote.findByIdAndDelete(req.params.id);
    res.status(200).json("quote deleted");
  }catch(err){
    res.status(500).json(err);
  }
}else{
  req.json("only admin can Delete this quote");
}
})
module.exports=router;