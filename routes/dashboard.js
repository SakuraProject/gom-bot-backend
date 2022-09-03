const express = require('express');
const router = express.Router();
const oauth = require('../functions/oauth');
const { setTimeout } = require('timers/promises');
lpack = [];
lpack["ja"] = {};
router.get('/', async function (req, res) {
  const {g, ch, l, redir} = req.query;
  if(redir){
    res.render('dashboard',{redir: redir});
  }else if (!req.cookies.refresh_token || req.cookies.refresh_token === 'undefined') {
    res.redirect('/dashboard?redir=/login');
  }else{
    const { token_type, access_token, refresh_token } = await oauth.refresh_token(req.cookies.refresh_token);
    const { username, id } = await oauth.getUser(access_token)
    const ws = module.parent.exports.ws.exports.ws;
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
    while(!module.parent.exports.ws.exports.res["shareguilds"][id]){
    await setTimeout(1);
    }
    guilds = module.parent.exports.ws.exports.res["shareguilds"][id]["guilds"];
    
    if (!l){
        ll = "ja";
    }else{
        ll = l;
    }
    if(!g){
      res.render('dashboard',{guilds: guilds,g: g,ch: ch,lpack: lpack,ll:ll,redir: redir});
    }else{
      if(!ch){
        res.render('dashboard',{guilds: guilds,g: g,ch: ch,lpack: lpack,ll:ll,redir: redir});
      }else{
        r = {};
        r["type"] = "cmd";
        r["cmd"] = "commands";
        r["args"] = {};
        r["args"]["id"] = "commands";
        ws.send(JSON.stringify(r));
        while(!module.parent.exports.ws.exports.res["commands"]){
          await setTimeout(1);
        }
        while(!module.parent.exports.ws.exports.res["commands"]["commands"]){
          await setTimeout(1);
        }
        cmds = module.parent.exports.ws.exports.res["commands"]["commands"]["commands"]
        res.render('dashboard',{guilds: guilds,g: g,ch: ch,lpack: lpack,ll:ll,cmds: cmds,redir: redir});
      }
    }
  }
})
