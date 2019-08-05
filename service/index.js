const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("node-uuid");
const fs = require('fs-extra');
const app = express();
const db = require('./model/mysql.js')
app.use(express.static("wwwroot"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log("start....");
});
app.post('/createCatalog',(req,res) => {
  let uid = uuid.v1();
  let timestamp = new Date().getTime();
  let sql = `INSERT INTO catalog VALUES ('${uid}', '测试','测试',${timestamp},'',0)`
  db.query(sql,[],function(result,fields){
    console.log(result)
  })
})