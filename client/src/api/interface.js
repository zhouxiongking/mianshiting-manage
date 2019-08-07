import axios from "@/utils/request";

const getExamsDetail = params => {
  return axios({
    url: "/getExamsDetail",
    method: "get",
    params
  });
};

const getExamsList = params => {
  return axios({
    url: "/getExamsList",
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

const addSubject = data => {
  return axios({
    url: "/addSubject",
    method: "post",
    data
  });
};

const delSubject = data => {
  return axios({
    url: "/delSubject",
    method: "post",
    data
  });
};

const updateSubject = data => {
  return axios({
    url: "/updateSubject",
    method: "post",
    data
  });
};
export default {
  getExamsDetail,
  createExams,
  getExamsList,
  addSubject,
  delSubject,
  updateSubject
};
