const express = require('express')
const db_con = require('../../models/db_connection')

const router = express.Router()
router.get("/", (req, res) => {
    db_con.query("select* from Request_Access;", (err, result) => {
        if (err) {
            throw err;
        }
        var temp = result[0];
        db_con.query("update Request_Access set request_id="+(temp.request_id+1)+" where request_id="+temp.request_id+";", (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                "msg": "success",
                "request_id": temp.request_id
            });
        })
    })
});

module.exports = router