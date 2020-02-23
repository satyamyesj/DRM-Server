const express = require('express')
const db_con = require('../../models/db_connection')
const blockchain_network = require('../../models/constants');

const router = express.Router()
router.post("/", (req, res) => {
    var email = req.body.email;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var password = req.body.password;
    db_con.query("insert into  File_User values(null,'" + email + "','" + first_name + "','" + last_name + "','" + password + "');", (err, result) => {
        if (err) {
            throw err;
        }

        db_con.query("select * from File_User where email='" + email + "';", (err, result) => {
            if (err) {
                throw err;
            }
            var user_profile = result[0];
            res.status(200).json({
                "msg": "success",
                "user_profile": user_profile
            });
        })

    })
});

module.exports = router