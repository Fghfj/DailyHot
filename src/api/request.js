import axios from "axios";

switch (process.env.NODE_ENV) {
  case "production":
    axios.defaults.baseURL = import.meta.env.VITE_GLOBAL_API;
    break;
  case "development":
    axios.defaults.baseURL = import.meta.env.VITE_GLOBAL_API;
    break;
  default:
    axios.defaults.baseURL = import.meta.env.VITE_GLOBAL_API;
    break;
}

axios.defaults.timeout = 30000;
axios.defaults.headers = { "Content-Type": "application/json" };

// 请求拦截
axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    $loadingBar.error();
    if (error.response) {
      let data = error.response.data;
      switch (error.response.status) {
        case 401:
          console.log('认证错误');
          break;
        case 301:
          console.log('重定向');
          break;
        case 403:
          console.log('权限错误');
          break;
        case 404:
          console.log('资源不存在');
          break;
        case 500:
          console.log('服务器错误');
          break;
        default:
          console.log('请求失败');
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
