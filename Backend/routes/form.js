const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Form = require('../models/form')
const User = require('../models/user');
const router=express.Router();
const middleware=require('../middleware')
router.post("/api/form",middleware.checklogin,function(req,res){
  var form =new Form(req.body);
  console.log(req.user)
  form.admin=req.user._id;
  form.save()
  res.json(form)
})
router.put('/api/form/:id',middleware.onwership,function(req,res){
    Form.findById(req.params.id).then((doc)=>{
        doc.markup=req.body.markup;
        doc.save()
        res.json(doc)
    })
})
router.delete('/api/form/:id',middleware.onwership,function(req,res){
    Form.findByIdAndRemove(req.params.id).then((doc)=>{
        res.json("done")
    })
})
router.get('/api/form/:id',function(req,res){
    Form.findById(req.params.id).then((doc)=>{
        res.json(doc)
    })
})
module.exports=router
