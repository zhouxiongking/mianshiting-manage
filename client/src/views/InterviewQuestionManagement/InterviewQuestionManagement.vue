<template>
  <div>
    <el-button type="primary" size="medium " class="addBtn" @click="addIQ"
      >新增</el-button
    >
    <el-table :data="tableData" style="width: 100%" border :height="600">
      <el-table-column prop="create_date" label="创建时间" :formatter="formatTime"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="describe" label="描述"> </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>
      <el-table-column prop="count" label="题目总数"> </el-table-column>
      <el-table-column prop="study_times" label="学习次数"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editExam(scope.row.id)">
            编辑
          </el-button>
          <el-button type="text" @click="delExam(scope.row.id)">
            删除
          </el-button>
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
    >
    </el-pagination>
    <el-dialog
      title="请先创建面试题种类"
      :visible.sync="createExams"
      width="30%"
    >
      <span>
        <el-form ref="form" label-width="100px">
          <el-form-item label="标题：">
            <el-input v-model="newExamsInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="简介：">
            <el-input v-model="newExamsInfo.describe"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createExams = false">取 消</el-button>
        <el-button type="primary" @click="creatExams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      createExams: false,
      newExamsInfo: {
        title: "",
        describe: ""
      },
      total: 0,
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: []
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
    creatExams() {
      if (
        this.newExamsInfo.title.length > 0 &&
        this.newExamsInfo.describe.length > 0
      ) {
        this.$api
          .createExams(this.newExamsInfo)
          .then(res => {
            this.createExams = false;
            this.$router.push({
              path: "/interQuestion/" + res.data.uid,
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getExamsList() {
      this.$api.getExamsList(this.pageInfo).then(res => {
        this.total = res.total;
        this.tableData = res.data;
      }).catch(err => {
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
        path: "/interQuestion/" + id,
      });
    },
    delExam(id) {
      this.$api.delExam({id}).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.getExamsList();
      })
    },
    formatTime(row, column, cellValue, index) {
      let date = new Date(parseInt(cellValue));
      let year = date.getFullYear();
      let month = (date.getMonth() + 1) > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
      let day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
      let hours = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
      let minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
      let seconds = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
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
