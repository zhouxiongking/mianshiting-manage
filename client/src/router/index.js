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
            import(
              "@/views/InterviewQuestionManagement/InterviewQuestionManagement.vue"
            )
        },
        {
          path: "/interQuestion",
          name: "InterQuestion",
          component: () =>
            import(
              "@/views/InterviewQuestionManagement/InterQuestion.vue"
            )
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
