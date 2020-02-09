const path = require("path");
const fs = require("fs");

const express=require('express')
const db_con=require('../../models/db_connection')

const router=express.Router()
//get api
router.get("/:id", (req, res) => {
	var id=req.params.id;
	console.log(id);
    	db_con.query('select file from files where fid='+id, (err, result)=>{
		if(err){
			throw err;
		}
		res.writeHead(200, {
        	'Content-Type': 'text/plain'
    		});
		var readStream = fs.createReadStream(result.file.toString('utf8'));
		readStream.pipe(res);
	})
  });

module.exports=router
