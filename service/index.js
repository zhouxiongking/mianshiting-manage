const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("node-uuid");
const fs = require("fs-extra");
const dayjs = require("dayjs");
const subject = require('./util/subject');
const app = express();
const db = require("./model/mysql.js");
app.use(express.static("wwwroot"));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log("start....");
});
// 创建新面试题
app.post("/createExams", (req, res) => {
  let uid = uuid.v1();
  const examType = req.body.exam_type || '';
  const enterpriseName = req.body.enterprise_name || '';
  let sql = null;
  // 编辑
  if (req.body.id) {
    sql = `update exams set title = ${db.mysql.escape(req.body.title)},
            exam_describe = ${db.mysql.escape(req.body.exam_describe)},
            exam_type = ${db.mysql.escape(examType)},
            enterprise_name = ${db.mysql.escape(enterpriseName)} 
            where id = '${req.body.id}'`;
  } else { // 新增
    sql = `INSERT INTO exams 
    VALUES ('${uid}', ${db.mysql.escape(req.body.title)},
      ${db.mysql.escape(req.body.exam_describe)},
      '${dayjs().format("YYYY-MM-DD HH:mm:ss")}',
      '', 0, 0, 1, '${examType}', '${enterpriseName}')`;
  }
  db.query(sql, [], function (result, fields, err) {
    if (err) {
      res.status(200).json({
        code: 500,
        msg: '操作失败'
      })
    } else {
      res.status(200).send({
        code: 0,
        data: {
          uid
        },
        msg: '操作成功'
      })
    }
  });
});

// 根据id获取面试题信息
app.get("/getExamsDetail", (req, res) => {
  let sql = 'select * from exams where id=?'
  db.query(sql, [req.query.id], function (result, fields, err) {
    if (err) {
      res.status(200).json({
        code: 500,
        msg: '查询失败'
      })
    } else {
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
  let examType = req.query.examType;
  let start = (index - 1) * size;
  let sql = 'SELECT COUNT(*) FROM exams where status=1 and exam_type = \'' + examType + '\'; SELECT * FROM exams where status=1 and exam_type = \'' + examType + '\' order by create_date desc limit ' + start + ',' + size;
  db.query(sql, [], function (result, fields, err) {
    if (err) {
      console.log(err)
      res.status(200).json({
        code: 500,
        msg: '查询失败'
      })
    } else {
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

// 获取面试题列表
app.get("/getSubjectList", (req, res) => {
  let sql = `SELECT * FROM subject where exam_id='${req.query.examId}'`;
  db.query(sql, [], function (result, fields, err) {
    if (err) {
      console.log(err)
      res.status(200).json({
        code: 500,
        msg: '查询失败'
      })
    } else {
      let data = result;
      res.status(200).json({
        code: 0,
        data,
        msg: '查询成功'
      })
    }
  });
});

// 单选题：single，多选题：multi，问答：qa，编程：program
app.post("/addSubject", (req, res) => {
  let uid = uuid.v1();
  let subject_options_key, subject_options_value, reference_answer;
  if (req.body.subject_type == 'single') {
    subject_options_key = req.body.subject_options_key.join('-');
    subject_options_value = req.body.subject_options_value.join('////');
    reference_answer = req.body.reference_answer;
  } else if (req.body.subject_type == 'multi') {
    subject_options_key = req.body.subject_options_key.join('-');
    subject_options_value = req.body.subject_options_value.join('////');
    reference_answer = req.body.reference_answer.join(',');
  } else {
    subject_options_key = '';
    subject_options_value = '';
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
    exam_id,
    upload_time,
    reference_linking) VALUES (
    '${uid}',
    '${req.body.type}',
    ${db.mysql.escape(req.body.subject_describe)},
    '${req.body.subject_type}',
    ${db.mysql.escape(req.body.subject_title)},
    '${subject_options_key}',
    ${db.mysql.escape(subject_options_value)},
    ${db.mysql.escape(reference_answer)},
    ${db.mysql.escape(req.body.answer_detail)},
    '${req.body.examId}',
    '${dayjs().format("YYYY-MM-DD HH:mm:ss")}',
    ${db.mysql.escape(req.body.reference_linking)}
    )`;
  db.query(sql, [], function (result, fields, err) {
    if (err) {
      res.status(200).json({
        code: 500,
        msg: '创建失败'
      })
    } else {
      updateExamCount(req.body.examId)
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
  let subject_options_key, subject_options_value, reference_answer;
  if (req.body.subject_type == 'single') {
    subject_options_key = req.body.subject_options_key.join('-');
    subject_options_value = req.body.subject_options_value.join('////');
    reference_answer = req.body.reference_answer;
  } else if (req.body.subject_type == 'multi') {
    subject_options_key = req.body.subject_options_key.join('-');
    subject_options_value = req.body.subject_options_value.join('////');
    reference_answer = req.body.reference_answer.join(',');
  } else {
    subject_options_key = '';
    subject_options_value = '';
    reference_answer = req.body.reference_answer;
  }
  let sql = `UPDATE subject SET
            type=${db.mysql.escape(req.body.type)},
            subject_describe=${db.mysql.escape(req.body.subject_describe)},
            subject_title=${db.mysql.escape(req.body.subject_title)},
            subject_options_key='${subject_options_key}',
            subject_options_value='${subject_options_value}',
            reference_answer='${reference_answer}',
            exam_id='${req.body.exam_id}',
            answer_detail=${db.mysql.escape(req.body.answer_detail)},
            reference_linking=${db.mysql.escape(req.body.reference_linking)} 
            WHERE id = '${req.body.id}' `;
  db.query(sql, [], function (result, fields, err) {
    if (err) {
      res.status(200).json({
        code: 500,
        msg: '修改失败'
      })
    } else {
      res.status(200).send({
        code: 0,
        msg: '修改成功'
      })
    }
  });
});

app.post("/delSubject", (req, res) => {
  let sql = `DELETE FROM subject WHERE id = '${req.body.id}'`;
  db.query(sql, [], function (result, fields, err) {
    if (err) {
      res.status(200).json({
        code: 500,
        msg: '删除失败'
      })
    } else {
      updateExamCount(req.body.examId)
      res.status(200).send({
        code: 0,
        msg: '删除成功'
      })
    }
  });
});

app.post("/delExam", (req, res) => {
  let sql = `UPDATE exams SET status=0 WHERE id = '${req.body.id}'`;
  db.query(sql, [], function (result, fields, err) {
    if (err) {
      res.status(200).json({
        code: 500,
        msg: '删除失败'
      })
    } else {
      res.status(200).send({
        code: 0,
        msg: '删除成功'
      })
    }
  });
});

// 爬取题目
app.get('/crawingSubject', (req, res) => {
  const { tid, qid, subjectType, contentType } = req.query;
  subject.crawSubject({tid, qid, subjectType, contentType}).then((response) => {
    res.status(200).send({
      code: 0,
      msg: '操作成功',
      data: response,
    });
  }).catch(error => {
    res.status(200).json({
      code: 500,
      msg: error.message,
    });
  });
});

function updateExamCount(id) {
  let sql = `UPDATE exams SET count = (SELECT COUNT(*) FROM subject where exam_id='${id}') WHERE id = '${id}' `;
  db.query(sql, [], function (result, fields, err) {
    if (err) {
      console.log(err);
    }
  });
}