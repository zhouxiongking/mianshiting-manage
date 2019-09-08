import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Home.vue"),
      children: [
        {
          path: "/interviewQuestionManagement",
          name: "InterviewQuestionManagement",
          component: () =>
            import("@/views/InterviewQuestionManagement/InterviewQuestionManagement.vue")
        },
        {
          path: "/interQuestion/:id",
          name: "InterQuestion",
          component: () =>
            import("@/views/InterviewQuestionManagement/InterQuestion.vue")
        },
        {
          path: "/enterprisePaperManage",
          name: "enterprisePaperManage",
          component: () =>
            import("@/views/InterviewQuestionManagement/EnterprisePaperManage.vue")
        },
        {
          path: "/enterprisePaperDetail/:id",
          name: "enterprisePaperDetail",
          component: () =>
            import("@/views/InterviewQuestionManagement/EnterprisePaperDetail.vue")
        }
      ]
    },
    {
      path: "/login",
      component: Login,
      name: "Login"
    }
  ]
});
