const express = require('express');
const expressWs = require('express-ws')
const router = express.Router()
expressWs(router);

router.ws('/', async (ws, req) => {
  console.log('�ڑ�����');
  ws.on('message',async msg => {
    data = JSON.parse(msg);
    if(data["type"]=="cmd"){
      data["args"] = await module.exports[data["cmd"]](data["args"]);
      data["type"] = "res";
      ws.send(JSON.stringify(data));
    }else if(data["type"]=="res"){
      if(!module.exports.res[data["cmd"]]){
        module.exports.res[data["cmd"]] = [];
      }
      module.exports.res[data["cmd"]][data["args"]["id"]] = data["args"];
    }
  })
})
obj = {}
obj.router = router;
module.exports = obj;
module.exports.res = [];
module.exports.jsk = async function(args){
  const res = new Promise((resolve) => resolve(eval(args["code"])));
  args["res"] = res.then(async (out) => {
    if (typeof out !== "string") {
      out = require("util").inspect(out, { depth: 0 });
    }
    return out
  }).catch(async (err) => {
    return err.toString();
  });
  return args
}