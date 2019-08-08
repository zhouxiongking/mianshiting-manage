<template>
  <div>
    <el-form
      :model="question"
      ref="question"
      label-width="100px"
      :rules="rules"
    >
      <br />
      <el-form-item label="试题类题：" prop="type">
        <el-input placeholder="请输入内容" v-model="question.type"> </el-input>
      </el-form-item>
      <el-form-item label="题目：" prop="subject_title">
        <Editor
          class="QAandCodeQuestion"
          v-model="question.subject_title"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="描述：" prop="subject_describe">
        <Editor
          class="QAandCodeQuestion"
          v-model="question.subject_describe"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="正确答案：" prop="reference_answer">
        <Editor
          class="QAandCodeQuestion"
          v-model="question.reference_answer"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="解答过程：" prop="answer_detail">
        <Editor
          class="QAandCodeQuestion"
          v-model="question.answer_detail"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item>
        <div class="addBtn">
          <el-button type="primary" @click="save('question')" v-if="!isEdit"
            >保存</el-button
          >
          <el-button type="primary" @click="edit('question')" v-else
            >提交</el-button
          >
          <el-button @click="close('question')" v-if="!isEdit">取消</el-button>
          <el-button @click="del('question')" v-else>删除</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import "@/assets/tinymce/skins/ui/oxide/skin.min.css"; //富文本样式
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme.min.js"; //引入富文本的主要脚本
import lang from "@/assets/tinymce/zh_CN.js"; //引用中文语言
export default {
  components: {
    Editor
  },
  props: {
    questionDetail: {
      type: Object,
      default: () => {}
    },
    examDetail: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editorInit: {
        selector: ".QAandCodeQuestion",
        language_url: lang,
        language: "zh_CN",
        skin_url: "/tinymce/skins/lightgray",
        height: 300
      },
      question: {
        type: "",
        examId: "",
        subject_describe: "",
        subject_title: "",
        subject_type: 2,
        subject_options_key: [],
        subject_options_value: [],
        reference_answer: "",
        answer_detail: ""
      },
      rules: {
        type: [{ required: true, message: "请输入题目类型", trigger: "blur" }],
        subject_describe: [
          { required: true, message: "请输入题目描述", trigger: "blur" }
        ],
        subject_title: [
          { required: true, message: "请输入题目标题", trigger: "blur" }
        ],
        reference_answer: [
          { required: true, message: "请选择正确答案", trigger: "change" }
        ],
        answer_detail: [
          { required: true, message: "请选择答案解析", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    tinymce.init({});
    if (this.isEdit) {
      this.question = this.questionDetail;
    }
    this.question.examId = this.examDetail.id;
  },
  methods: {
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.addSubject(this.question).then(res => {
            this.$refs[formName].resetFields();
            this.$emit("reset");
            this.$emit("updateList");
          });
        } else {
          return false;
        }
      });
    },
    edit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.updateSubject(this.question).then(res => {
            this.$message({
              message: res.msg,
              type: "success"
            });
          });
        } else {
          return false;
        }
      });
    },
    close(formName) {
      this.$refs[formName].resetFields();
      this.$emit("reset");
    },
    del() {
      this.$api
        .delSubject({ id: this.question.id, examId: this.question.examId })
        .then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.$emit("updateList");
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
