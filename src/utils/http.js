import axios from 'axios' //引用axios
 
// axios 配置
axios.defaults.timeout = 5000; 
axios.defaults.baseURL = 'http://35.221.163.65:3000/api/'; //
axios.defaults.withCredentials = true;
 
// // http request 攔截器，通過這個，我們就可以把token傳到後端
// axios.interceptors.request.use(
//   config => {
//     const token = this.getCookie('session'); //獲取Cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/x-www-form-urlencoded' //設置跨域headers
//     };
//     if (token) {
//       config.params = {'token': token} //後端接收的參數
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
//   );
  
//   // http response 拦截器
//   axios.interceptors.response.use(
//   response => {
// //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
//     if(response.data.status == 400) {
//       router.push({
//         path: '/login',
//         query: {redirect: router.currentRoute.fullPath} //从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error.response.data)
//   });
 
export default axios;