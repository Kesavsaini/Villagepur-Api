const router=require("express").Router();
const Post=require("../models/post");
const verify=require("../verify");
//Making a Post
router.post('/newpost',verify,async(req,res)=>{
    if(req.user.isAdmin){
    try{
      const post=await new Post({...req.body,user:req.user.id});
      await post.save();
      res.status(200).json(post);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    
    }
  }else{
    res.json("Only admin can a post");
  }
});
//Getting all posts
router.get('/allpost',async(req,res)=>{
    try{
      const posts=await Post.find().sort({createdAt:-1});
      res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});
//Getting post by id
router.get('/:id/getpost',async(req,res)=>{
  try{
     const post=await Post.findById(req.params.id);
     res.status(200).json(post);
  }catch(err){
     res.status(500).json(err);
  }
});
//Get Latest Blog's
router.get('/latestposts',async(req,res)=>{
  try{
    const posts=await Post.find().sort({createdAt:-1}).limit(6);
    res.status(200).json(posts);
  }catch(err){
      res.status(500).json(err);
  }
});
//Editing Blog
router.put('/:id/updatepost',verify,async(req,res)=>{
  if(req.user.isAdmin){
    try{
      const post=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.status(200).json(post);
    }catch(err){
      res.status(500).json(err);
    }
  }
  else{
    req.json("Only admin can update this Post");
  }
});
//Deleting a post
router.delete('/:id/deletequote',verify,async(req,res)=>{
  if(req.user.isAdmin){
  try{
    await Quote.findByIdAndDelete(req.params.id);
    res.status(200).json("post deleted");
  }catch(err){
    res.status(500).json(err);
  }
}else{
  req.json("only admin can Delete this post");
}
})
module.exports=router;