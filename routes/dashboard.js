const express = require('express');
const router = express.Router();
const oauth = require('../functions/oauth');

lpack = [];
router.get('/', async function (req, res) {
  if (!req.cookies.refresh_token || req.cookies.refresh_token === 'undefined') {
    res.redirect('/login');
  }else{
    const { token_type, access_token, refresh_token } = await oauth.refresh_token(req.cookies.refresh_token);
    const { username, id } = await oauth.getUser(access_token)

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true
    });
    r = {};
    r["type"] = "cmd";
    r["cmd"] = "shareguilds";
    r["args"] = {};
    r["args"]["id"] = id;
    ws.send(JSON.stringify(r));
    while(!module.parent.exports.ws.exports.res["shareguilds"]){
    await setTimeout(1);
    }
    while(!module.parent.exports.ws.exports.res["shareguilds"]){
    await setTimeout(1);
    }
    guilds = module.parent.exports.ws.exports.res["shareguilds"][id];
    
    const {g, ch, l} = req.query;
    if (!l){
        ll = "ja";
    }else{
        ll = l;
    }
    if(!g){
      res.render('dashboard',{guilds: guilds,g: g,ch: ch,lpack: lpack,ll:ll});
    }
  }
})
