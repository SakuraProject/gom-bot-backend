const express = require('express');
const router = express.Router();
const ws = require('./routes/ws');
const sleep = require('sleep');
router.get('/', async function (req, res) {
    const { l,cat,cmd } = req.query;
    if (!l){
        l = "ja";
    }
    if(cmd){
        r = [];
        r["type"] = "cmd";
        r["cmd"] = "command";
        r["args"] = [];
        r["args"]["id"] = cmd;
        ws.ws.send(JSON.stringify(r));
        sleep.sleep(1);
        wsr = ws.res["command"][cmd];
    }else if(cat){
        r = [];
        r["type"] = "cmd";
        r["cmd"] = "help_cmdlist";
        r["args"] = [];
        r["args"]["id"] = cat;
        r["args"]["l"] = l;
        ws.ws.send(JSON.stringify(r));
        sleep.sleep(1);
        wsr = ws.res["help_cmdlist"][cmd];
    }else{
        r = [];
        r["type"] = "cmd";
        r["cmd"] = "help_catlist";
        r["args"] = [];
        r["args"]["id"] = "catlist";
        r["args"]["l"] = l;
        ws.ws.send(JSON.stringify(r));
        sleep.sleep(1);
        wsr = ws.res["help_catlist"]["catlist"];
    }
    res.render('help',{wsr: wsr,cmd: cmd,cat: cat,l: l});
        
  
});
module.exports = router;
