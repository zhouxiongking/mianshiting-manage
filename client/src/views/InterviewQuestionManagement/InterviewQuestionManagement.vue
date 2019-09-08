<template>
  <div>
    <el-button type="primary" size="medium " class="addBtn" @click="addIQ">新增</el-button>
    <el-table :data="tableData" style="width: 100%" border :height="600">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="show_type" label="类型"></el-table-column>
      <el-table-column prop="exam_describe" label="描述"></el-table-column>
      <el-table-column prop="count" label="题目总数"></el-table-column>
      <el-table-column prop="study_times" label="学习次数"></el-table-column>
      <el-table-column prop="create_date" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="editExamType(scope.row)">编辑试题类型</el-button>
          </div>
          <div>
            <el-button type="text" @click="editExam(scope.row.id)">编辑试题</el-button>
            <el-button type="text" @click="delExam(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @next-click="handleCurrentChange"
      @prev-click="handleCurrentChange"
      :current-page="pageInfo.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="请先创建面试题种类" :visible.sync="createExams" width="30%">
      <span>
        <el-form ref="form" label-width="100px">
          <el-form-item label="标题：">
            <el-input v-model="newExamsInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="简介：">
            <el-input v-model="newExamsInfo.exam_describe"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="newExamsInfo.exam_type">
              <el-option
                v-for="(item, index) in examType"
                :key="index"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司：" v-if="newExamsInfo.exam_type === 'enterprise_paper'">
            <el-input v-model="newExamsInfo.enterprise_name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createExams = false">取 消</el-button>
        <el-button type="primary" @click="createOrUpdateExams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { examType, examTypeMap } from "../../components/enum";
export default {
  data() {
    return {
      createExams: false,
      newExamsInfo: {
        title: "",
        exam_describe: ""
      },
      total: 0,
      pageInfo: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      examType,
      examTypeMap
    };
  },
  mounted() {
    this.getExamsList();
  },
  methods: {
    addIQ() {
      this.createExams = true;
      // this.$router.push({ path: "/interQuestion" });
    },
    createOrUpdateExams() {
      if (
        this.newExamsInfo.title.length > 0 &&
        this.newExamsInfo.exam_describe.length > 0
      ) {
        this.$api
          .createExams(this.newExamsInfo)
          .then(res => {
            this.createExams = false;
            if (this.newExamsInfo.id) {
              this.newExamsInfo = {
                title: "",
                exam_describe: ""
              };
              this.getExamsList();
            } else {
              this.$router.push({
                path: "/interQuestion/" + res.data.uid
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getExamsList() {
      let params = {
        ...this.pageInfo,
        examType: 'special_practice'
      };
      this.$api
        .getExamsList(params)
        .then(res => {
          this.total = res.total;
          this.tableData = res.data;
          this.tableData.forEach(
            item => item.show_type = this.examTypeMap[item.exam_type]
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(size) {
      this.pageInfo.pageSize = size;
      this.pageInfo.pageIndex = 1;
      this.getExamsList();
    },
    handleCurrentChange(index) {
      this.pageInfo.pageIndex = index;
      this.getExamsList();
    },
    editExam(id) {
      this.$router.push({
        path: "/interQuestion/" + id
      });
    },
    delExam(id) {
      this.$api.delExam({ id }).then(res => {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getExamsList();
      });
    },
    editExamType(exam) {
      this.newExamsInfo = exam;
      this.createExams = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.addBtn {
  width: 100px;
  height: 56px;
  font-size: 20px;
  margin-bottom: 30px;
}
</style>
