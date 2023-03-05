const express = require('express');
const router = express.Router();
const oauth = require('../functions/oauth');
const config = require('../config.json');

router.get('/', async function (req, res) {

    const { code } = req.query;


    if (code) {

        const oauthdata = await oauth.getToken(code);

        res.cookie('refresh_token', oauthdata.refresh_token, {
            httpOnly: true
        });
        const userdata = await oauth.getUser( oauthdata.access_token);
        res.redirect('/');
        
    } else {

        if (!req.cookies.refresh_token || req.cookies.refresh_token === 'undefined') {


            res.render('login');

        } else {

            const { token_type, access_token, refresh_token } = await oauth.refresh_token(req.cookies.refresh_token);
            const { username, id } = await oauth.getUser(access_token)

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true
            });

            res.redirect('/');

        };

    }
})

module.exports = router;