const path = require("path");
const fs = require("fs");

const express = require('express');
var busboy = require('connect-busboy');
const db_connection = require('../../models/db_connection');

const router = express.Router();
router.post('/', (req, res) => {
	req.pipe(req.busboy);
	req.busboy.on('file', function (field_name, file_data, file_name) {
		const f_write_stream = fs.createWriteStream(file_name);
		file_data.pipe(f_write_stream);
		f_write_stream.on('close', function () {
			fs.readFile(file_name, (err, file_data) => {
				db_connection.query("insert into files(file, file_name) values(BINARY(:file_data),:file_name)", {"file_data":file_data,"file_name":file_name}, (err, result) => {
					if(err){
						res.status(500).json({"msg":"server error."});
						throw err;
					}else{
						res.status(200).json({"msg":"file uploaded successfully."});
					}
					fs.unlink(file_name, (err)=>{
						if(err){
							throw err;
						};
					});
				});
			});
		});
	});
});


module.exports = router
