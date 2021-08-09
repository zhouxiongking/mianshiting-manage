<template>
  <div>
    <el-form ref="examsInfo" label-width="100px">
      <el-form-item label="公司：">
        <el-input v-model="examsInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="试题简介：">
        <el-input v-model="examsInfo.exam_describe"></el-input>
      </el-form-item>
      <el-form-item label="试题内容：">
        <ol>
          <li
            v-for="(item, index) in subjectList"
            :key="index"
            class="subjectList"
          >
            <RadioQuestion
              :questionDetail="item"
              :isEdit="true"
              :examDetail="examsInfo"
              v-if="item.subject_type == 'single'"
              :key="index"
              @updateList="updateSubjectList"
            />
            <CheckboxQuestion
              :questionDetail="item"
              :isEdit="true"
              :examDetail="examsInfo"
              v-if="item.subject_type == 'multi'"
              :key="index"
              @updateList="updateSubjectList"
            />
            <QAandCodeQuestion
              :questionDetail="item"
              :isEdit="true"
              :examDetail="examsInfo"
              :subject_type="item.subject_type"
              v-if="item.subject_type == 'qa' || item.subject_type == 'program'"
              :key="index"
              @updateList="updateSubjectList"
            />
          </li>
        </ol>
      </el-form-item>
    </el-form>
    <h2>新增面试题</h2>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-input v-model="tid" placeholder="tid"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="qid" placeholder="qid"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="subjectType" placehoder="选择题目类型">
          <el-option
            v-for="type of subjectTypeList"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="contentType" placehoder="选择题目内容类型">
          <el-option
            v-for="type of contentTypeList"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          ></el-option>
        </el-select>
      </el-col>
       <el-col :span="3">
         <el-button @click="getQuestionContent">获取内容</el-button>
      </el-col>
    </el-row>
    <el-radio-group v-model="questionType">
      <el-radio label="radio">单选题</el-radio>
      <el-radio label="checkbox">多选题</el-radio>
      <el-radio label="qa">问答题</el-radio>
      <el-radio label="program">编程题</el-radio>
    </el-radio-group>
    <div
      class="radio"
      v-if="questionType == 'radio'"
    >
      <RadioQuestion :examDetail="examsInfo" @reset="reset" @updateList="updateSubjectList"/>
    </div>
    <div class="checkbox" v-if="questionType == 'checkbox'">
      <CheckboxQuestion :examDetail="examsInfo" @reset="reset" @updateList="updateSubjectList"/>
    </div>
    <div class="QA" v-if="questionType == 'qa'" :key="questionType">
      <QAandCodeQuestion :examDetail="examsInfo" @reset="reset" :subject_type="questionType" @updateList="updateSubjectList"/>
    </div>
    <div class="QA" v-if="questionType == 'program'" :key="questionType">
      <QAandCodeQuestion :examDetail="examsInfo" @reset="reset" :subject_type="questionType" @updateList="updateSubjectList"/>
    </div>
  </div>
</template>
<script>
import CheckboxQuestion from "@/components/CheckboxQuestion.vue";
import QAandCodeQuestion from "@/components/QAandCodeQuestion.vue";
import RadioQuestion from "@/components/RadioQuestion.vue";
import { subjectTypeList, contentTypeList } from '@/config/config';
export default {
  components: {
    QAandCodeQuestion,
    RadioQuestion,
    CheckboxQuestion
  },
  mounted() {
    if (this.$route.params.id) {
      this.getExamsDetail();
      this.getSubjectList();
    } else {
      this.$router.push({ path: "/interviewQuestionManagement" });
    }
  },
  data() {
    return {
      examsInfo: {
        title: "",
        describe: ""
      },
      questionType: "",
      subjectList: [],
      tid: '',
      qid: '',
      subjectTypeList,
      subjectType: '',
      contentTypeList,
      contentType: '',
    };
  },
  methods: {
    reset() {
      this.questionType = "";
    },
    updateSubjectList() {
      this.getSubjectList();
    },
    getExamsDetail() {
      this.$api
        .getExamsDetail({ id: this.$route.params.id })
        .then(res => {
          this.examsInfo = res.data;
        })
        .catch(err => {
          console.log(err);
          this.$router.push({ path: "/interviewQuestionManagement" });
        });
    },
    getSubjectList() {
      this.$api.getSubjectList({ examId: this.$route.params.id }).then(res => {
        this.subjectList = res.data;
      });
    },
    // 爬取题目的内容
    getQuestionContent() {
      console.log(this.tid, this.qid);
      const params = {
        tid: this.tid,
        qid: this.qid,
        subjectType: this.subjectType,
        contentType: this.contentType,
      };
      this.$api.crawSubject(params).then((res) => {
        if (res.code === 0) {
          this.subjectList.push(res.data);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
