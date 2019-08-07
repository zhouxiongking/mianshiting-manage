<template>
  <div>
    <el-form :model="radioQuestion"  ref="radioQuestion" label-width="100px" :rules="rules">
      <br>
      <el-form-item label="试题类题：" prop="type">
        <el-input placeholder="请输入内容" v-model="radioQuestion.type"> </el-input>
      </el-form-item>
      <el-form-item label="题目：" prop="subject_title">
        <Editor
          class="RadioQuestion"
          v-model="radioQuestion.subject_title"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="描述：" prop="subject_describe">
        <Editor
          class="RadioQuestion"
          v-model="radioQuestion.subject_describe"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="选项：">
        <el-radio
          disabled
          :label="item"
          v-for="(item, index) of radioQuestion.subject_options_key"
          :key="index"
          >{{item}}.{{ radioQuestion.subject_options_value[index] }}</el-radio
        >
      </el-form-item>
      <el-form-item label="添加选项：">
        <el-input placeholder="请填写选项" v-model="subjectOption.key" style="margin-bottom:20px;"> </el-input>
        <el-input placeholder="请填写内容" v-model="subjectOption.value"> </el-input>
        <el-button type="primary" class="addBtn" @click="addOption"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item label="正确答案：" prop="reference_answer">
        <el-radio-group v-model="radioQuestion.reference_answer">
          <el-radio
            :label="item"
            v-for="(item, index) of radioQuestion.subject_options_key"
            :key="index"
            >{{item}}.{{ radioQuestion.subject_options_value[index] }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="解答过程：" prop="answer_detail">
        <Editor
          class="RadioQuestion"
          v-model="radioQuestion.answer_detail"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save('radioQuestion')">保存</el-button>
        <el-button @click="close('radioQuestion')">取消</el-button>
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
  },
  data() {
    return {
      editorInit: {
        selector: ".RadioQuestion",
        language_url: lang,
        language: "zh_CN",
        skin_url: "/tinymce/skins/lightgray",
        height: 300
      },
      subjectOption: {
        key: '',
        value: ''
      },
      radioQuestion: {
        type:'',
        examId: '',
        index: 0,
        subject_describe: "",
        subject_title: "",
        subject_type: 0,
        subject_options_key: [],
        subject_options_value: [],
        reference_answer:'',
        answer_detail: ""
      },
      rules: {
        type: [
          { required: true, message: '请输入题目类型', trigger: 'blur' },
        ],
        subject_describe: [
          { required: true, message: '请输入题目描述', trigger: 'blur' }
        ],
        subject_title: [
          { required: true, message: '请输入题目标题', trigger: 'blur' }
        ],
        reference_answer: [
          { required: true, message: '请选择正确答案', trigger: 'change' }
        ],
        answer_detail: [
          { required: true, message: '请选择答案解析', trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
    tinymce.init({});
    this.radioQuestion.examId = this.examDetail.id;
    this.radioQuestion.index = this.examDetail.count ++;
    if (this.questionDetail) {
      this.radioQuestion = this.questionDetail;
    }
  },
  methods: {
    addOption() {
      if (this.subjectOption.key.length > 0 && this.subjectOption.value.length > 0) {
        this.radioQuestion.subject_options_key.push(this.subjectOption.key);
        this.radioQuestion.subject_options_value.push(this.subjectOption.value);
        this.subjectOption = {
          key: '',
          value: ''
        }
      } else {
        this.$message({
          message: "请填写完整!",
          type: "warning"
        });
      }
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addSubject(this.radioQuestion).then(res => {
            this.$refs[formName].resetFields();
            this.$emit('reset');
          })
        } else {
          return false;
        }
      });
    },
    close(formName) {
      this.$refs[formName].resetFields();
      this.$emit('reset');
    }
  }
};
</script>
<style lang="scss" scoped>
.addBtn {
  margin-top: 20px;
}
</style>
