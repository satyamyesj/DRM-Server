const path = require("path");
const fs = require("fs");

const express=require('express')
const db_connection=require('../../models/db_connection')

const router=express.Router();
router.get("/:fid", (req, res) => {
	const fid=req.params.fid;
    	db_connection.query('select file, file_name from files where fid='+fid, (err, result)=>{
		if(err){
			res.status(500).json({"msg":"server error."});
			throw err;
		}
		const row=result[0];
		const file_data=row.file;
		const file_name=row.file_name;
		const file_buffer = Buffer.from(file_data, "binary");	
		fs.writeFileSync(file_name, file_buffer);
		var readStream = fs.createReadStream(file_name);
		var file_stats = fs.statSync(file_name);
		var fileSizeInBytes = file_stats["size"];
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			"Content-Length":fileSizeInBytes,
			"Content-Disposition": "attachment; filename="+file_name
			});
		readStream.pipe(res);
		fs.unlink(file_name, (err)=>{
			if(err){
				throw err;
			}
		});
	})
  });

module.exports=router
