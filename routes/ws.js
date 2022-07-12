const express = require('express');
const expressWs = require('express-ws')
const router = express.Router()
expressWs(router);

router.ws('/', (ws, req) => {
  console.log('Ú‘±¬Œ÷');
  ws.on('message', msg => {
    if(msg=="numdata"){
      ws.send(""+module.exports.wait.length)
      while(module.exports.wait.length!=0){
         ws.send(module.exports.wait.shift())
      }
    }else{
    data = JSON.parse(msg);
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
module.exports.wait = [];
module.exports.res = [];