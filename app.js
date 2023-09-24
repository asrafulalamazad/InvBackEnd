const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

//Security Middleware import
const rateLimit= require('express-rate-limit');
const helmet= require('helmet');
const mongoSanitize= require('express-mongo-sanitize');
const xss= require('xss-clean');
const hpp= require('hpp');
const cors= require('cors');

//Database schema
const mongoose =  require('mongoose');
// const path = require("path");  // combine stack

//Security Middleware implements
app.use(cors( ));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


//image size
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'1000mb'}));

//bodyParser implements
app.use(bodyParser.json());

// Rate Limiter implements
const limiter = rateLimit({windowMs:15*60*100, max: 3000});
app.use(limiter)

//Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.kxn7sfi.mongodb.net/INVENTORY?retryWrites=true&w=majority";
let OPTION={user:'testuser',pass:'testuser',autoIndex:true};
mongoose.connect(URI,OPTION,(error)=>{
    console.log("Connection Success")
    console.log(error)
})

//managing  back end api routing
app.use("/api/v1", router);
// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"not Found"})
})

module.exports= app;
