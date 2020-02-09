const express=require('express')
const db_con=require('../../models/db_connection')

const router=express.Router()
//get api
router.get("/", (req, res) => {
    	db_con.query('select marks from temp where roll=1', (err, result)=>{
		if(err){
			throw err;
		}
		res.status(200).json(result);		
	})
  });

module.exports=router
