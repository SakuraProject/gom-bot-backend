const config = require('../config.json');
const express = require('express');
const router = express.Router();
const {verify} = require('hcaptcha');
const sitekey = config["hcaptcha"]["sitekey"];
const secret = config["hcaptcha"]["secretkey"];

router.get('/', async function (req, res) {

    const { reqkey } = req.query;

    res.render('captcha',{reqkey: reqkey,sitekey: sitekey});

});

router.post('/', async function (req, res) {

    const { h-captcha-response,reqkey } = req.query;

    vcode = module.parent.exports.ws.exports.res["captcha"][reqkey]["vcode"];

    verify(secret, token).then((data) => {

        if (data.success === true) {
            res.render('captcha',{reqkey: reqkey,sitekey: sitekey, vcode: vcode,success: data.success});
        } else {
            res.render('captcha',{error: "hCaptcha‚ÉŽ¸”s‚µ‚Ü‚µ‚½"});
        }
  }).catch(async (err) => {res.render('captcha',{error: err.toString()});});

});