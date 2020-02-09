const path = require("path");
const fs = require("fs");

const express=require('express');
var busboy = require('connect-busboy');
const db_con=require('../../models/db_connection')

const router=express.Router()
//post file api
router.post('/', (req, res)=> {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/file_storage/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename)   
		var temp_path=path.join(__dirname, 'file_storage', filename);     
		fs.open(temp_path, 'r', (err, data)=>{
			var stats = fs.statSync(temp_path);
			var fileSizeInBytes = stats["size"];
			var buffer=new Buffer(fileSizeInBytes);
			fs.read(data, buffer, 0, fileSizeInBytes, 0, (err, readBytes, buffer)=>{
				var sql="insert into files SET ?";
				values={fid:1, file:buffer};
				db_con.query(sql, values, (err, data)=>{
					res.status(200).json({"msg":"success"});
				});	
			});	
		});	
            });
        });
});


module.exports=router
