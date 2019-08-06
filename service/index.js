const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("node-uuid");
const fs = require("fs-extra");
const app = express();
const db = require("./model/mysql.js");
app.use(express.static("wwwroot"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log("start....");
});
// 创建新面试题
app.post("/createExams", (req, res) => {
  let uid = uuid.v1();
  let timestamp = new Date().getTime();
  let sql = `INSERT INTO exams VALUES ('${uid}', '${req.body.title}','${req.body.describe}',${timestamp},'',0,0)`;
  db.query(sql, [], function(result, fields) {
    if(fields){
      res.status(200).json({
        code: 500,
        msg: '创建失败'
      })
    }else {
      res.status(200).json({
        code: 0,
        data: {
          uid
        },
        msg: '创建成功'
      })
    }
  });
});

// 根据id获取面试题信息
app.get("/getExamsDetail", (req, res) => {
  let sql = 'select * from exams where id=?'
  db.query(sql, [req.query.id], function(result, fields) {
    if(fields){
      res.status(200).json({
        code: 500,
        msg: '创建失败'
      })
    }else {
      console.log(result)
      res.status(200).json({
        code: 0,
        data: {
        },
        msg: '创建成功'
      })
    }
  });
});