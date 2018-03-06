const express=require('express');
const app=express();
const passport=require('passport');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const form =require('./routes/form')
const Form =require('./models/form')
const User=require('./models/user')
const auth =require('./routes/auth')
const mailer=require('@sendgrid/mail')
const key =require('./conf/key')
const jwt=require('jsonwebtoken')

mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(function(req,res,next){
    console.log("hello")
    try{
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    jwt.verify(token, key.tokenKey, function (err, payload) {
        console.log(payload)
        if (payload) {
            User.findById(payload.userId).then(
                (doc)=>{
                    req.user=doc;
                    next()
                }
            )
        } else {
           next()
        }
    })
}catch(e){
    next()
}
})
app.set('view engine', 'ejs')
app.use(form)
app.use(auth)
app.listen("3001"||process.env.PORT,()=>{
    console.log('done.....')
})
