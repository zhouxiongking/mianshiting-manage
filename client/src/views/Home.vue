<template>
  <div id="full">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="300px">
          <div class="aside">
            <el-menu
              default-active="interviewQuestions"
              class="el-menu-vertical-demo"
              router
            >
              <el-submenu index="interviewQuestions">
                <template slot="title">
                  <i class="el-icon-s-management"></i>
                  <span class="IQ">面试题</span>
                </template>
                <el-menu-item index="/interviewQuestionManagement" class="IQM"
                  >面试题管理</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div class="main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  }
};
</script>
<style lang="scss" scoped>
#full {
  width: 100%;
  height: 100%;
  /deep/ .el-header {
    padding: 0;
    height: 80px !important;
  }
  /deep/ .el-container {
    width: 100%;
    height: 100%;
  }
  .aside,
  .main {
    height: 100%;
    overflow: auto;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }
  .IQ {
    font-size: 20px;
  }
  .IQM {
    font-size: 18px;
  }
}
</style>
