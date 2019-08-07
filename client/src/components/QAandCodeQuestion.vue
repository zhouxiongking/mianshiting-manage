<template>
  <div>
    <el-form ref="form" label-width="100px">
      <br>
      <el-form-item label="试题类题：">
        <el-input placeholder="请输入内容" v-model="option"> </el-input>
      </el-form-item>
      <el-form-item label="问答题：">
        <Editor
          class="QAandCodeQuestion"
          v-model="question.title"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="正确答案：">
        <Editor
          class="QAandCodeQuestion"
          v-model="question.rightKey"
          :init="editorInit"
        ></Editor>
      </el-form-item>
      <el-form-item label="解答过程：">
        <Editor
          class="QAandCodeQuestion"
          v-model="question.solution"
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
      question: {
        title: "",
        rightKey: 1,
        solution: ""
      }
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {}
};
</script>
<style lang="scss" scoped></style>
