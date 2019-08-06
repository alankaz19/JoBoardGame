import axios from "axios";

// auth相關的 api
const userRequest = axios.create({
  baseURL: "http://35.221.163.65:3000/api/auth/"
});
// 補發驗證信相關的 api
const mailRequest = axios.create({
  baseURL: "http://35.221.163.65:3000/api/mail/"
});
// Member相關的 api
const memberRequest = axios.create({
  baseURL: "http://35.221.163.65:3000/api/member/"
});
// Visit相關的 api
const visitRequest = axios.create({
  baseURL: "http://35.221.163.65:3000/api/visit/"
});
// Group相關的 api
const groupRequest = axios.create({
  baseURL: "http://35.221.163.65:3000/api/group/"
});
// 上傳相關的 api
const uploadRequest = axios.create({
  baseURL: "http://35.221.163.65:3000/api/upload/"
});

// 店家相關的 api
const storeRequest = axios.create({
  baseURL: "http://35.221.163.65:3000/api/store/"
});

// Auth 相關的 api
export const apiUserLogin = data => userRequest.post("/login", data);
export const apiUserRegister = data => userRequest.post("/register", data);
export const apiUserForgetPw = data => userRequest.post("/forget", data);
export const apiUserRePassword = data => userRequest.post("/rePassword", data);
export const apiUserFbLogin = data => userRequest.get("/fbLogin", data);

//Mail 相關的api
export const apiSendMail = data => mailRequest.get("/sendMail", data);

//Member相關的 api
export const apiGetUserInfo = headers => memberRequest.get("/showMember", headers);
export const apiCheckUserInfo = (data,headers) => memberRequest.get(`/showMember?memberId=${data}`,headers);
export const apiEditUserInfo = (data,headers) => memberRequest.post("/updateMember", data, headers);
export const apiGetUserGroup = headers => memberRequest.get("/showMyGroups", headers);

// Visit相關的 api
export const apiGetGroupList = (data,headers) => visitRequest.post("/webFindGroup", data, headers);
export const apiSearchGroup = (data,headers) => visitRequest.post("/webSearch", data, headers);
export const apiGetGroupInfo = (groupId,memberId) => visitRequest.get(`/showGroup?groupId=${groupId}&memberId=${memberId}`);

// Group相關的 api
export const apiCreateGroup = (data,headers) => groupRequest.post("/create", data, headers);
export const apiUpdateGroup = (data,headers) => groupRequest.post("/updateGroup", data, headers);
export const apiJoinGroup = (groupId,headers) => groupRequest.get(`/joinGroup?groupId=${groupId}`, headers);
export const apiQuitGroup = (groupId,headers) => groupRequest.get(`/quitGroup?groupId=${groupId}`, headers);
export const apiReplyApplication = (data,headers) => groupRequest.post("/applicationReply", data, headers);

// Upload相關的 api
export const apiUploadAvatar = (data,headers) => uploadRequest.post("/avatar", data, headers);

// store相關的 api
export const apiGetAllStore = headers => storeRequest.get("/getAllStore", headers);
export const apiGetDistStore =  (data,headers) => storeRequest.post("/getDistStore",data, headers);

// socket

