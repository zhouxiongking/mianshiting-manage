<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="单选题：">
        <Editor
          class="RadioQuestion"
          v-model="radioQuestion.title"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="选项：">
        <el-radio
          disabled
          :label="item.key"
          v-for="(item, index) of radioQuestion.answerOption"
          :key="index"
          >{{ item.content }}</el-radio
        >
      </el-form-item>
      <el-form-item label="添加选项：">
        <el-input placeholder="请输入内容" v-model="option"> </el-input>
        <el-button type="primary" class="addBtn" @click="addOption"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item label="正确答案：">
        <el-radio-group v-model="radioQuestion.rightKey">
          <el-radio
            :label="item.key"
            v-for="(item, index) of radioQuestion.answerOption"
            :key="index"
            >{{ item.content }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="解答过程：">
        <Editor
          class="RadioQuestion"
          v-model="radioQuestion.solution"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button>取消</el-button>
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
    }
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
      option: "",
      radioQuestion: {
        title: "",
        answerOption: [],
        rightKey: "",
        solution: ""
      }
    };
  },
  mounted() {
    tinymce.init({});
    if (this.questionDetail) {
      this.radioQuestion = this.questionDetail;
    }
  },
  methods: {
    addOption() {
      if (this.option.length > 0) {
        let temp = {
          key: this.radioQuestion.answerOption.length,
          content: this.option
        };
        this.radioQuestion.answerOption.push(temp);
        this.option = "";
      } else {
        this.$message({
          message: "请填写选项内容!",
          type: "warning"
        });
      }
    },
    save() {
      console.log(this.radioQuestion);
    }
  }
};
</script>
<style lang="scss" scoped>
.addBtn {
  margin-top: 20px;
}
</style>
