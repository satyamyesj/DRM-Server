const express=require('express')
const db_con=require('../../models/db_connection')

const router=express.Router()
//get api
router.post("/", (req, res) => {
    var flag=true;
    console.log(req.body);
    var email=req.body.email;
    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var password=req.body.password;
    db_con.query("insert into  File_User values(null,'"+email+"',null,'"+first_name+"','"+last_name+"','"+password+"');", (err, result)=>{
        if(err){
            throw err;
            flag=false;
        }	
    })
    var id=0;
    db_con.query("select id from File_User where email='"+email+"';", (err, result)=>{
        if(err){
            throw err;
            flag=false;
        }
        id=result[0].id;	
        //console.log(result);
        //console.log("id="+id);
        var blockchain_id="org.ownershiprecord.network.FileUser#"+id;
        db_con.query("update File_User set blockchain_id='"+blockchain_id+"' where id="+id+";", (err, result)=>{
            if(err){
                throw err;
                flag=false;
            }		
        })
    })
    
    if(flag){
        res.status(200).json({"msg":"success"});
    }
    else{
        res.status(400).json({"msg":"failure"});
    }
});

module.exports=router
