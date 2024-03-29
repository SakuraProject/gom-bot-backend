const config = require('../config.json');
const express = require('express');
const router = express.Router();
const {verify} = require('hcaptcha');
const sitekey = config["hcaptcha"]["sitekey"];
const secret = config["hcaptcha"]["secretkey"];

router.get('/', async function (req, res) {

    const { reqkey } = req.query;

    res.render('captcha',{reqkey: reqkey,sitekey: sitekey,error: null,success: null});

});

router.post('/', async function (req, res) {

    const { reqkey } = req.body;
    const token = req.body["h-captcha-response"];

    vcode = module.parent.exports.ws.exports.res["captcha"][reqkey]["vcode"];

    verify(secret, token).then((data) => {

        if (data.success === true) {
            res.render('captcha',{reqkey: reqkey,sitekey: sitekey, vcode: vcode,success: data.success,error: null});
        } else {
            res.render('captcha',{error: "hCaptchaに失敗しました"});
        }
  }).catch(async (err) => {res.render('captcha',{error: err.toString()});});

});
module.exports=router
