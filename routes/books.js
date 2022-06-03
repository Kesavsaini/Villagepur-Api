const router=require("express").Router();
const Book=require("../models/book");
const verify=require("../verify");
//Making a Book
router.post('/newbook',verify,async(req,res)=>{
    if(req.user.isAdmin){
    try{
      const book=await new Book({...req.body});
      await book.save();
      res.status(200).json(book);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
  }else{
    res.json("Only admin can a Book");
  }
});
//Getting all Books
router.get('/allbooks',async(req,res)=>{
    try{
      const books=await Book.find().sort({createdAt:-1});
      res.status(200).json(books);
    }catch(err){
        res.status(500).json(err);
    }
});
   
//Get Latest Books
router.get('/latestbooks',async(req,res)=>{
  try{
    const books=await Book.find().sort({createdAt:-1}).limit(6);
    res.status(200).json(books);
  }catch(err){
      res.status(500).json(err);
  }
});
//Editing Book
router.put('/:id/updatebook',verify,async(req,res)=>{
  if(req.user.isAdmin){
    try{
      const book=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.status(200).json(book);
    }catch(err){
      res.status(500).json(err);
    }
  }
  else{
    req.json("Only admin can update this Book");
  }
});
//Deleting a Book
router.delete('/:id/deletebook',verify,async(req,res)=>{
  if(req.user.isAdmin){
  try{
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json("Book deleted");
  }catch(err){
    res.status(500).json(err);
  }
}else{
  req.json("only admin can Delete this Book");
}
})
module.exports=router;