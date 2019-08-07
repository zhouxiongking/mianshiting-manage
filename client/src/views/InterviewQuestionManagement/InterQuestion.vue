<template>
  <div>
    <el-form ref="examsInfo" label-width="100px">
      <el-form-item label="公司：">
        <el-input v-model="examsInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="试题简介：">
        <el-input v-model="examsInfo.describe"></el-input>
      </el-form-item>
      <el-form-item label="试题内容："> </el-form-item>
    </el-form>
    <h2>新增面试题</h2>
    <el-radio-group v-model="questionType">
      <el-radio label="judge">判断题</el-radio>
      <el-radio label="radio">单选题</el-radio>
      <el-radio label="checkbox">多选题</el-radio>
      <el-radio label="QA">问答题</el-radio>
      <el-radio label="code">编程题</el-radio>
    </el-radio-group>
    <div
      class="radio"
      v-if="questionType == 'radio' || questionType == 'judge'"
    >
      <RadioQuestion :examDetail="examsInfo" @reset="reset"/>
    </div>
    <div class="checkbox" v-if="questionType == 'checkbox'">
      <CheckboxQuestion :examDetail="examsInfo" @reset="reset"/>
    </div>
    <div class="QA" v-if="questionType == 'QA' || questionType == 'code'">
      <QAandCodeQuestion :examDetail="examsInfo" @reset="reset"/>
    </div>
  </div>
</template>
<script>
import CheckboxQuestion from "@/components/CheckboxQuestion.vue";
import QAandCodeQuestion from "@/components/QAandCodeQuestion.vue";
import RadioQuestion from "@/components/RadioQuestion.vue";
export default {
  components: {
    QAandCodeQuestion,
    RadioQuestion,
    CheckboxQuestion
  },
  mounted() {
    if (this.$route.params.id) {
      this.$api
        .getExamsDetail({ id: this.$route.params.id })
        .then(res => {
          this.examsInfo = res.data;
        })
        .catch(err => {
          console.log(err);
          this.$router.push({ path: "/interviewQuestionManagement" });
        });
    } else {
      this.$router.push({ path: "/interviewQuestionManagement" });
    }
  },
  data() {
    return {
      examsInfo: {
        title: "",
        describe: "",
      },
      questionType: ""
    };
  },
  methods: {
    reset() {
      this.questionType = ''
    }
  }
};
</script>
<style lang="scss" scoped></style>
