<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="多选题：">
        <Editor
          class="CheckboxQuestion"
          v-model="checkboxQuestion.title"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="选项：">
        <el-checkbox
          disabled
          :label="item.key"
          v-for="(item, index) of checkboxQuestion.answerOption"
          :key="index"
          >{{ item.content }}</el-checkbox
        >
      </el-form-item>
      <el-form-item label="正确答案：">
        <el-checkbox-group v-model="checkboxQuestion.rightKey">
          <el-checkbox
            :label="item.key"
            v-for="(item, index) of checkboxQuestion.answerOption"
            :key="index"
            >{{ item.content }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="添加选项：">
        <el-input placeholder="请输入内容" v-model="option"> </el-input>
        <el-button type="primary" class="addBtn" @click="addOption"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item label="解答过程：">
        <Editor
          class="CheckboxQuestion"
          v-model="checkboxQuestion.solution"
          :init="editorInit"
        ></Editor>
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
  data() {
    return {
      editorInit: {
        selector: ".RadioQuestion",
        language_url: lang,
        language: "zh_CN",
        skin_url: "/tinymce/skins/lightgray",
        height: 300
      },
      checkboxQuestion: {
        title: "",
        answerOption: [],
        rightKey: [],
        solution: ""
      }
    };
  },
  mounted() {
    tinymce.init({});
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
    }
  }
};
</script>
<style lang="scss" scoped>
.addBtn {
  margin-top: 20px;
}
</style>
