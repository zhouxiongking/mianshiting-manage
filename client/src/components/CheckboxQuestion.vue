<template>
  <div>
    <el-form :model="checkboxQuestion" ref="checkboxQuestion" label-width="100px" :rules="rules">
      <br />
      <el-form-item label="试题类型：" prop="type">
        <el-select v-model="checkboxQuestion.type">
          <el-option v-for="(item, index) in subjecttype" :key="index" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目：" prop="subject_title">
        <Editor class="CheckboxQuestion" v-model="checkboxQuestion.subject_title" :init="editorInit"></Editor>
      </el-form-item>
      <el-form-item label="描述：" prop="subject_describe">
        <Editor class="CheckboxQuestion" v-model="checkboxQuestion.subject_describe" :init="editorInit"></Editor>
      </el-form-item>
      <el-form-item label="选项：">
        <span v-for="(item, index) of checkboxQuestion.subject_options_key" :key="index">
          <el-checkbox disabled :label="item" >
            {{ item }}.{{
            checkboxQuestion.subject_options_value[index]
            }}
          </el-checkbox>
          <el-button @click="delOption(index)" style="margin: 0 10px;" type="warning" size="mini">删除</el-button>
        </span>
      </el-form-item>
      <el-form-item label="添加选项：">
        <el-input placeholder="请填写选项" v-model="subjectOption.key" style="margin-bottom:20px;"></el-input>
        <el-input placeholder="请填写内容" v-model="subjectOption.value"></el-input>
        <el-button type="primary" class="addBtn" @click="addOption">添加</el-button>
      </el-form-item>
      <el-form-item label="正确答案：" prop="reference_answer" style="margin-bottom:20px;">
        <el-checkbox-group v-model="checkboxQuestion.reference_answer">
          <el-checkbox :label="item" v-for="(item, index) of checkboxQuestion.subject_options_key" :key="index">
            {{ item }}.{{
            checkboxQuestion.subject_options_value[index]
            }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="解答过程：" prop="answer_detail">
        <Editor class="CheckboxQuestion" v-model="checkboxQuestion.answer_detail" :init="editorInit"></Editor>
      </el-form-item>
      <el-form-item label="参考链接：">
        <el-input placeholder="请填写参考链接" v-model="subjectOption.reference_linking"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="addBtn">
          <el-button type="primary" @click="save('checkboxQuestion')" v-if="!isEdit">保存</el-button>
          <el-button type="primary" @click="submit('checkboxQuestion')" v-else>提交</el-button>
          <el-button @click="close('checkboxQuestion')" v-if="!isEdit">取消</el-button>
          <el-button @click="del('checkboxQuestion')" v-else>删除</el-button>
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
import { type } from "./enum.js";
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
        selector: ".CheckboxQuestion",
        language_url: lang,
        language: "zh_CN",
        skin_url: "/tinymce/skins/lightgray",
        height: 300
      },
      subjectOption: {
        key: "",
        value: ""
      },
      subjecttype:type,
      checkboxQuestion: {
        type: "",
        examId: "",
        subject_describe: "",
        subject_title: "",
        subject_type: 'multi',
        subject_options_key: [],
        subject_options_value: [],
        reference_answer: [],
        answer_detail: "",
        reference_linking: ""
      },
      rules: {
        type: [{ required: true, message: "请选择题目类型", trigger: "change" }],
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
      this.checkboxQuestion = this.questionDetail;
      this.checkboxQuestion.subject_options_key = this.checkboxQuestion.subject_options_key.split(
        "-"
      );
      this.checkboxQuestion.subject_options_value = this.checkboxQuestion.subject_options_value.split(
        "////"
      );
      this.checkboxQuestion.reference_answer = this.checkboxQuestion.reference_answer.split(
        ","
      );
    }
    this.checkboxQuestion.examId = this.examDetail.id;
  },
  methods: {
    delOption(index) {
      this.checkboxQuestion.subject_options_key.splice(index,1);
      this.checkboxQuestion.subject_options_value.splice(index,1);
      this.checkboxQuestion.reference_answer = '';
    },
    addOption() {
      if (
        this.subjectOption.key.length == 0 &&
        this.subjectOption.value.length == 0
      ) {
        this.$message({
          message: "请填写完整!",
          type: "warning"
        });
        return false;
      }
      if(this.checkboxQuestion.subject_options_key.indexOf(this.subjectOption.key) != -1) {
        this.$message({
          message: "重复选项!",
          type: "warning"
        });
        return false;
      }
      this.checkboxQuestion.subject_options_key.push(this.subjectOption.key);
      this.checkboxQuestion.subject_options_value.push(
        this.subjectOption.value
      );
      this.subjectOption = {
        key: "",
        value: ""
      };
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.addSubject(this.checkboxQuestion).then(res => {
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
          this.$api.updateSubject(this.checkboxQuestion).then(res => {
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
    submit(formName) {
      if (this.checkboxQuestion.id) {
        this.edit(formName);
      } else {
        this.save(formName);
      }
    },
    close(formName) {
      this.$refs[formName].resetFields();
      this.$emit("reset");
    },
    del() {
      this.$api
        .delSubject({
          id: this.checkboxQuestion.id,
          examId: this.checkboxQuestion.examId
        })
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
<style lang="scss" scoped>
.addBtn {
  margin-top: 20px;
}
</style>
