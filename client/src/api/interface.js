import axios from "@/utils/request";

const getExamsDetail = params => {
  return axios({
    url: "/getExamsDetail",
    method: "get",
    params
  });
};

const createExams = data => {
  return axios({
    url: "/createExams",
    method: "post",
    data
  });
};

export default {
  getExamsDetail,
  createExams
};
