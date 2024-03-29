const express = require('express');
const router = express.Router();
const { setTimeout } = require('timers/promises');
lpack = [];
lpack["ja"] = {"catdesc": "このページはSakuraBotのコマンドヘルプです。カテゴリを選択することにより、カテゴリに含まれるコマンドを見ることが出来ます","cmddesc":"このページはSakuraBotのコマンドヘルプです。コマンドを選択するとコマンドの説明を表示します。もしグループコマンドの場合はグループ内のコマンドリストを表示します"};
lpack["en"] = {"catdesc": "This page is the command help for SakuraBot. By selecting a category, you can see the commands included in that category.", "cmddesc": "This page is the command help for SakuraBot. By selecting a command, you can see a description of the command. If it is a group command, a list of commands in the group will be displayed"};
router.get('/', async function (req, res) {
    const ws = module.parent.exports.ws.exports.ws;
    const { l,cat,cmd } = req.query;
    if (!l){
        ll = "ja";
    }else{
        ll = l;
    }
    if(cmd){
        r = {};
        r["type"] = "cmd";
        r["cmd"] = "command";
        r["args"] = {};
        r["args"]["id"] = cmd;
        ws.send(JSON.stringify(r));
        while(!module.parent.exports.ws.exports.res["command"]){
        await setTimeout(1);
        }
        wsr = module.parent.exports.ws.exports.res["command"][cmd];
    }else if(cat){
        r = {};
        r["type"] = "cmd";
        r["cmd"] = "help_cmdlist";
        r["args"] = {};
        r["args"]["id"] = cat;
        r["args"]["l"] = ll;
        ws.send(JSON.stringify(r));
        while(!module.parent.exports.ws.exports.res["help_cmdlist"]){
        await setTimeout(1);
        }
        wsr = module.parent.exports.ws.exports.res["help_cmdlist"][cat];
    }else{
        r = {};
        r["type"] = "cmd";
        r["cmd"] = "help_catlist";
        r["args"] = {};
        r["args"]["id"] = "catlist";
        r["args"]["l"] = ll;
        ws.send(JSON.stringify(r));
        while(!module.parent.exports.ws.exports.res["help_catlist"]){
        await setTimeout(1);
        }
        wsr = module.parent.exports.ws.exports.res["help_catlist"]["catlist"];
    }
    res.render('help',{wsr: wsr,cmd: cmd,cat: cat,l: ll,lpack: lpack});
        
  
});
module.exports = router;
