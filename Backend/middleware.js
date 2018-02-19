const mongoose = require('mongoose');
const form = require('./models/form');
const user = require('./models/user');
const jwt = require('jsonwebtoken')
//const kil=require("./seed.js");
const key = require('./conf/key')
const middlewareobject = {};
middlewareobject.checklogin = function (req, res, next) {
    try {
        //console.log(JSON.stringify(req.headers))
        const token = req.headers.authorization.split(" ")[1]
       // console.log(token)
        jwt.verify(token, key.tokenKey, function (err, payload) {
           // console.log(payload)
            if (payload) {

                return next();
            } else {
                res.json({ message: 'Please login first' })
            }
        })
    }
    catch (e) {
        res.json({ message: 'Please login first' })
    }
}

middlewareobject.onwership = function check(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, key.tokenKey, function (err, payload) {
            //console.log(payload)
            if (payload) {
                form.findById(req.params.id).populate('admin').exec(function (err, newdevice) {
                    console.log(newdevice.admin._id)
                    console.log(payload.userId)
                    console.log(newdevice.admin._id == payload.userId)
                    if (newdevice.admin._id == payload.userId) {
                        next();
                    }
                });
            } else {
                res.json({ message: 'Please login first' })
            }
        })
    }
    catch (e) {
        res.json({ message: 'error' })
    }

};
module.exports = middlewareobject;
