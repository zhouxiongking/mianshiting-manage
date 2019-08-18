import axios from "axios";
import config from "./config.js";
import qs from "qs";
import { Message } from "element-ui";

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {}
    });

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        if (
          config.method.toLocaleLowerCase() === "post" ||
          config.method.toLocaleLowerCase() === "put" ||
          config.method.toLocaleLowerCase() === "delete"
        ) {
          config.data = qs.stringify(config.data);
        }
        return config;
      },
      error => {
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data = response.data;
        // 根据返回的code值来做不同的处理（和后端约定）
        // switch (data.code) {
        //   case "0":
        //     break;
        //   default:
        // }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.description)

        // err.data = data
        // err.response = response

        // throw err
        if (data.code != 0) {
          Promise.reject(data);
        }
        return data;
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;

            case 401:
              err.message = "未授权，请登录";
              break;

            case 403:
              err.message = "拒绝访问";
              break;

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`;
              break;

            case 408:
              err.message = "请求超时";
              break;

            case 500:
              err.message = "服务器内部错误";
              break;

            case 501:
              err.message = "服务未实现";
              break;

            case 502:
              err.message = "网关错误";
              break;

            case 503:
              err.message = "服务不可用";
              break;

            case 504:
              err.message = "网关超时";
              break;

            case 505:
              err.message = "HTTP版本不受支持";
              break;

            default:
          }
        }
        console.error(err);
        Message.error(`ERROR: ${err}`);
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );

    //请求处理
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(error => {
        reject(error);
      });
  });
}
