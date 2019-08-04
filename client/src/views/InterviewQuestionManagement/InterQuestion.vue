<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="公司：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="试题简介：">
        <el-input v-model="form.brief"></el-input>
      </el-form-item>
      <el-form-item label="试题内容：">
      </el-form-item>
    </el-form >
    <h2>新增面试题</h2>
    <el-radio-group v-model="questionType">
      <el-radio label="judge">判断题</el-radio>
      <el-radio label="radio">单选题</el-radio>
      <el-radio label="checkbox">多选题</el-radio>
      <el-radio label="QA">问答题</el-radio>
      <el-radio label="code">编程题</el-radio>
    </el-radio-group>
    <div class="radio" v-if="questionType == 'radio' || questionType == 'judge'">
      <RadioQuestion />
    </div>
    <div class="checkbox" v-if="questionType == 'checkbox'">
      <CheckboxQuestion />
    </div>
    <div class="QA" v-if="questionType == 'QA' || questionType == 'code'">
      <QAandCodeQuestion />
    </div>
  </div>
</template>
<script>
import CheckboxQuestion from "@/components/CheckboxQuestion.vue"
import QAandCodeQuestion from "@/components/QAandCodeQuestion.vue"
import RadioQuestion from "@/components/RadioQuestion.vue"
export default {
  components: {
    QAandCodeQuestion,
    RadioQuestion,
    CheckboxQuestion
  },
  data() {
    return {
      form: {
        name: '123',
        brief: '',
        radio: ''
      },
      questionType: ''
    }
  },
}
</script>
<style lang="scss" scoped>

</style>


