<template>
  <div>
    <el-button type="primary" size="medium " class="addBtn" @click="addIQ">新增</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="600">
      <el-table-column
        prop="creatTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="classify"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="count"
        label="题目总数">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template>
          <el-button
            type="text">
            编辑
          </el-button>
          <el-button
            type="text">
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
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          creatTime: '2019-08-01 23:02:52',
          classify: '啊啊啊啊啊啊',
          count: '20'
        }
      ]
    }
  },
  methods: {
    addIQ() {
      this.$router.push({path: '/interQuestion'})
    }
  }
}
</script>
<style lang="scss" scoped>
.addBtn {
  width: 100px;
  height: 56px;
  font-size: 20px;
  margin-bottom: 30px;
}
</style>


