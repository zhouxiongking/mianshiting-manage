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
  db.query(sql, [], function(result, fields, err) {
    if(err){
      res.status(200).json({
        code: 500,
        msg: '创建失败'
      })
    }else {
      res.status(200).send({
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
  db.query(sql, [req.query.id], function(result, fields, err) {
    if(err){
      res.status(200).json({
        code: 500,
        msg: '查询失败'
      })
    }else {
      res.status(200).json({
        code: 0,
        data: result[0],
        msg: '查询成功'
      })
    }
  });
});

// 获取面试题列表
app.get("/getExamsList", (req, res) => {
  let index = req.query.pageIndex;
  let size = req.query.pageSize;
  let start = (index - 1) * size;
  let sql = 'SELECT COUNT(*) FROM exams; SELECT * FROM exams limit ' + start + ',' + size;
  db.query(sql, [], function(result, fields, err) {
    if(err){
      console.log(err)
      res.status(200).json({
        code: 500,
        msg: '查询失败'
      })
    }else {
      let total = result[0][0]['COUNT(*)'];
      let data = result[1];
      res.status(200).json({
        code: 0,
        data,
        total,
        msg: '查询成功'
      })
    }
  });
});

// 单选题：0，多选题：1，问答：2
app.post("/addSubject", (req, res) => {
  let uid = uuid.v1();
  let timestamp = new Date().getTime();
  let subject_options_key,subject_options_value ,reference_answer;
  if(req.body.subject_type == 0){
    subject_options_key = req.body.subject_options_key.join('-');
    subject_options_value = req.body.subject_options_value.join('-');
    reference_answer = req.body.reference_answer;
  }else if (req.body.subject_type == 1){
    subject_options_key = req.body.subject_options_key.join('-');
    subject_options_value = req.body.subject_options_value.join('-');
    reference_answer = req.body.reference_answer.join(',');
  }else {
    subject_options_key = req.body.subject_options_key;
    subject_options_value = req.body.subject_options_value;
    reference_answer = req.body.reference_answer;
  }
  let sql = `INSERT INTO subject (
    id, 
    type,
    subject_describe,
    subject_type,
    subject_title,
    subject_options_key,
    subject_options_value,
    reference_answer,
    answer_detail,
    examId,
    subject_index) VALUES (
    '${uid}',
    '${req.body.type}',
    '${req.body.subject_describe}',
    '${req.body.subject_type}',
    '${req.body.subject_title}',
    '${subject_options_key}',
    '${subject_options_value}',
    '${reference_answer}',
    '${req.body.answer_detail}',
    '${req.body.examId}',
    ${req.body.index}
    )`;
  db.query(sql, [], function(result, fields, err) {
    if(err){
      res.status(200).json({
        code: 500,
        msg: '创建失败'
      })
    }else {
      res.status(200).send({
        code: 0,
        data: {
          uid
        },
        msg: '创建成功'
      })
    }
  });
});

app.post("/updateSubject", (req, res) => {
  let uid = uuid.v1();
  let timestamp = new Date().getTime();
  let sql = `INSERT INTO exams VALUES ('${uid}', '${req.body.title}','${req.body.describe}',${timestamp},'',0,0)`;
  db.query(sql, [], function(result, fields, err) {
    if(err){
      res.status(200).json({
        code: 500,
        msg: '创建失败'
      })
    }else {
      res.status(200).send({
        code: 0,
        data: {
          uid
        },
        msg: '创建成功'
      })
    }
  });
});

app.post("/delSubject", (req, res) => {
  let uid = uuid.v1();
  let timestamp = new Date().getTime();
  let sql = `INSERT INTO exams VALUES ('${uid}', '${req.body.title}','${req.body.describe}',${timestamp},'',0,0)`;
  db.query(sql, [], function(result, fields, err) {
    if(err){
      res.status(200).json({
        code: 500,
        msg: '创建失败'
      })
    }else {
      res.status(200).send({
        code: 0,
        data: {
          uid
        },
        msg: '创建成功'
      })
    }
  });
});