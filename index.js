const path = require("path");
const fs = require("fs");

const logger=require('./middlewares/logger')
const error=require('./middlewares/error')

const express = require("express");
var busboy = require('connect-busboy'); 
const cors=require('cors');

const PORT = 3002;
const app = express();

//#MIDDLEWARES

//middleware for cors request
var corsOptions={
  origin:"http://127.0.0.1:3002",
  optionsSuccessStatus:200
}
app.use(cors());

//MIDDLEWARES
//middlerware to log requests
app.use(logger);
//middleware to parse json body
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//middleware to handle errors
app.use(error)
//middleware for form/file upload
app.use(busboy())

//REQUEST MAPPING
//deploy index.html
app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname,'index.html'))
 })
//get api
app.use('/api/get_file', require('./routes/api/get_file'))
//post api
app.use('/api/post_file', require('./routes/api/post_file'))
//file user registration
app.use('/api/file_user_registration', require('./routes/api/file_user_registration'))
//file user login
app.use('/api/file_user_login', require('./routes/api/file_user_login'))

//ACCEPT REQUEST
app.listen(PORT, () => {
  console.log("server started on port:"+PORT);
});
