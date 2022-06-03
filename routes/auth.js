const router=require("express").Router();
const User=require("../models/user");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//SignUP
router.post('/signup',async(req,res)=>{
    try{
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(req.body.password,salt);
        const user=await new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        });
        await user.save();
        console.log(user);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
//Login
router.post('/login',async(req,res)=>{
    try{
       if(validator.isEmail(req.body.email)){
           const user=await User.findOne({email:req.body.email});
           if(bcrypt.compareSync(req.body.password,user.password)){
            const accsessToken=jwt.sign({user},process.env.key,{expiresIn:'24h'});
            res.status(200).json({id:user.id,accsessToken});
           }else{
            res.json("Email or password is Not Valid");
           }
       }else{
           res.json("Email is Not Valid");
       }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports=router