const express = require('express');
const router = express.Router();
const oauth2 = require("../functions/oauth");
const config = require("../config.json");

router.get('/', (req, res) => {
    const {code} = req.query;
    if (code) {
        oauth2.getToken(code)
        .then(token => {
            console.log(token);
            oauth2.getUser(token)
            .then(user => {
                res.render('login', { user: user });
            })
            .catch(err => {
                console.log(err);
                res.redirect(`/error?err=${err}`);
            }
            );
        }
        )
        .catch(err => {
            console.log(err);
            res.redirect(`/error?err=${err}`);
        }
        );
    } else {
        res.render('login');
    }
}
);


module.exports = router;