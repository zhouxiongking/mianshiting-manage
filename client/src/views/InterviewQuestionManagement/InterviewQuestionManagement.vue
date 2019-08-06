<template>
  <div>
    <el-button type="primary" size="medium " class="addBtn" @click="addIQ"
      >新增</el-button
    >
    <el-table :data="tableData" style="width: 100%" border :height="600">
      <el-table-column prop="creatTime" label="创建时间"> </el-table-column>
      <el-table-column prop="classify" label="类别"> </el-table-column>
      <el-table-column prop="count" label="题目总数"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template>
          <el-button type="text">
            编辑
          </el-button>
          <el-button type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
    <el-dialog
      title="请先创建面试题种类"
      :visible.sync="createExams"
      width="30%">
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
        title: '',
        describe:''
      },
      tableData: [
        {
          creatTime: "2019-08-01 23:02:52",
          classify: "啊啊啊啊啊啊",
          count: "20"
        }
      ]
    };
  },
  methods: {
    addIQ() {
      this.createExams = true;
      // this.$router.push({ path: "/interQuestion" });
    },
    creatExams() {
      if(this.newExamsInfo.title.length > 0 && this.newExamsInfo.describe.length > 0){
        this.$api.createExams(this.newExamsInfo).then(res => {
          this.$router.push({ name: "InterQuestion",params:{id:res.data.uid}});
        }).catch(err => {})
      }
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
