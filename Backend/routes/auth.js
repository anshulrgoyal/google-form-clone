var express = require("express");
var router = express.Router();
var jwt=require('jsonwebtoken')
var mongoose = require('mongoose');
var user = require('../models/user');
const middlewareoject = require("../middleware.js");
const key=require('../conf/key')
const cors=require('cors')
const mailer=require('@sendgrid/mail')

router.post("/api/auth/signup",function(req,res){
   user.create(req.body).then((user)=>{
       var token=jwt.sign({userId:user.id},key.tokenKey);
       const msg={
        to:user.email,
           from:'verification@unbakedpotato.herokuapp.com',
           subject:'Verify Your mail',
           html:`<strong><a href="https://unbakedpotato.herokuapp.com/user/${token}">Click Here</a> to verify</strong>`
       }
mailer.send(msg)
       res.status(200).json({
           userId:user.id,
           username:user.username,
           image:user.image,
           name:user.first,
           tags:user.tags,
           activated:user.activated,
       })
   }).catch((err)=>{
       res.status(400).json(err);
   })
})
router.post('/api/auth/signin',function(req,res){
    console.log(req.body)
    user.findOne({email:req.body.email}).then((user)=>{
        if(user.activated){
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(isMatch){
                    var token=jwt.sign({userId:user.id},key.tokenKey);
                    console.log(token)
                    res.status(200).json({
                        userId:user.id,
                        username:user.username,
                        image:user.image,
                        name:user.first,
                        token
                    })
                }
                else{
                    if(!user.activated){
                        res.json({message:'email not verified'})
                    }
                    else res.status(200).json({message:'Invaild Password/Username'})
                }
            })
        }
        
        
    }).catch((err)=>{
        res.status(400).json({message:'Invalid Password/Username'});
    })
})
router.get('/api/user/:token',function(req,res){
    try {
        
        const token = req.params.token
        console.log(token)
        jwt.verify(token, key.tokenKey, function (err, payload) {
            console.log(payload)
            if (payload) {
               user.findById(payload.userId).then((found)=>{
                   found.activation=true;
                   found.save();
                   console.log(found)
                   res.json({message:'verified'})
               })
               
            } else {
                res.json({message:'not-verified'})
            }
        })
    }
    catch (e) {
        res.send(e);
    }
})
router.get('/api/test',function(req,res){
     const msg={
        recipients: [
            {address: user.email},
          ],
           from:'verification@unbakedpotato.herokuapp.com',
           subject:'Verify Your mail',
           html:`<strong><a href="https://unbakedpotato.herokuapp.com/user/">Click Here</a> to verify</strong>`
       }
sender.transmissions.send(msg)
})
module.exports = router;
