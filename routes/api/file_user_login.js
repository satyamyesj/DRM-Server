const express = require('express')
const db_con = require('../../models/db_connection')

const router = express.Router()
router.post("/", (req, res) => {
    var email = req.body.email;
    var password=req.body.password;
    db_con.query("select * from File_User where email='" + email + "' and password='"+password+"';", (err, result) => {
        if (err) {
            throw err;
        }
        var user_profile = result[0];
        res.status(200).json({
            "msg": "success",
            "user_profile": user_profile
        });
    })
});

module.exports = router