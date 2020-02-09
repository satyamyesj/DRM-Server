const path = require("path");
const fs = require("fs");

const logger=require('./middlewares/logger')
const error=require('./middlewares/error')

const express = require("express");
var busboy = require('connect-busboy'); 

const PORT = 3002;
const app = express();

//#MIDDLEWARES

//middlerware to log requests
app.use(logger);

//middleware to parse json body
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//middleware to handle errors
app.use(error)

//middleware for form/file upload
app.use(busboy())

//#HANDLING REQUESTS
app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname,'index.html'))
 })

//get api
app.use('/api/get_file', require('./routes/api/get_file'))
//post api
app.use('/api/post_file', require('./routes/api/post_file'))

app.listen(PORT, () => {
  console.log("server is running....");
});
