const express = require('express');
const router = express.Router();
const config = require('../config.json');
const mysql = require('mysql');
const client = mysql.createConnection(config["mysql"]);


router.get('/', async function (req, res) {

    const { q } = req.query;
    
    if (q) {
       
       client.connect();

       words = q.split(" ");

       gid = "`gid` LIKE '" + q + "'";

       name = "`name` LIKE '%" + words[0] +"%'";

       description = "`description` LIKE '%" + words[0] +"%'";

       category = "`category` LIKE '%" + words[0] +"%'";

       for ( i=1;i<words.length;i++){
          
          name = name + " OR `name` LIKE '%" + words[i] +"%'";

          description = description + " OR `description` LIKE '%" + words[i] +"%'";

          category = category + " OR `category` LIKE '%" + words[i] +"%'";
       
       }

       client.query('SELECT * FROM rocations WHERE (' + gid + ') OR (' + name + ') OR (' + description + ') OR (' + category + ')', function(error, response) {

          if(error) throw error;

          res.render('rocations',{response: response,q:q});

        })
       
    }else{
       
       client.connect();

       client.query('SELECT * FROM rocations ORDER BY `uptime` desc', function(error, response) {

          if(error) throw error;

          res.render('rocations',{response: response,q:q});

        })
    
    }

})

module.exports = router;
