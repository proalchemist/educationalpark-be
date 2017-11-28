var config = require('config.json');
var express = require('express');
var router = express.Router();
var otpService = require('services/otpapi.service');

// routes
router.post('/generate', generate);
router.post('/verify', verify);

module.exports = router;


function generate(req, res) {
    console.log('generating otp');
    if(!req.body.username && !req.body.mobileno){
        res.status(200).send('{"error" : "Required params not found" }');
        return false;
    }
    otpService.generate(req.body.username,req.body.mobileno)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function verify(req, res) {
    console.log('verifying otp');
    if(!req.body.username && !req.body.otp){
        res.status(200).send('{"error" : "Required params not found" }');
        return false;
    }
    otpService.validate(req.body.username, req.body.otp)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
