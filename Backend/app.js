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
mailer.setApiKey('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')
mongoose.connect('mongodb://anshulrgoyal:8285578793aA#@ds241578.mlab.com:41578/poleprimate',
{useMongoClient:true});
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
