const jwt=require("jsonwebtoken");
require('dotenv').config();
const verify=async(req,res,next)=>{
    const authtoken=req.headers.token;
    if(authtoken){
      try{
        const token=authtoken.split(" ")[1];
        jwt.verify(token,process.env.key,(err,data)=>{
            if(err){
                res.status(403).joson(err);
            }
            console.log(data.user);
            req.user=data.user;
            next();

        });
      }catch(err){
          console.log(err);
          res.status(500).json(err);
      }
    }else{
        res.json("Person is not autherized");
    }
}
module.exports=verify;