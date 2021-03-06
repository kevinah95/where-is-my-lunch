var express = require('express')
var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
})

module.exports = function(pool) {
    'use strict';
    var router = express.Router();

    router.post('/login', function(req, res) {
        console.log(req.body);
        pool.getConnection(function(err, connection) {
            connection.query('CALL login(?,?)', [req.body.email, req.body.password], function(err, rows) {
                if (err) throw err;
                console.log(rows[0]);
                if (!rows[0].length) {
                    res.send("invalid");
                } else {
                    var base64 = bufferToBase64(new Buffer(rows[0][0].photo));
                    rows[0][0].photo = base64;
                    res.send(rows[0][0]);
                }
                connection.release();
            });
        });
    });

    function bufferToBase64(buf) { //Buffer to base64
        var binstr = Array.prototype.map.call(buf, function(ch) {
            return String.fromCharCode(ch);
        }).join('');
        return binstr;
    }
    router.post('/register', upload.single('avatar'), function(req, res) {
        var d = JSON.parse(req.body.data);
        //res.send(data);
        pool.getConnection(function(err, connection) {

            connection.query("CALL InsertPerson(?,?,?,?,?,?,?)", [d.email, d.firstlastname, d.myImage, d.name, d.password, d.phone, d.secondlastname], function(err, rows) {
                if (err) throw err;
                console.log('Last insert ID:', rows.insertId);
                res.send(rows[0]);
                connection.release();
            });
        });
    });
    return router;
};
