import { instanceRefreshToken, instance } from "./axios.custom";
const registerApi = (dataUser) => {
  const URL_API = "/v1/api/register";
  return instance.post(URL_API, dataUser);
};
const loginApi = (dataUser) => {
  const URL_API = "/v1/api/login";
  return instance.post(URL_API, dataUser, {
    withCredentials: true,
  });
};
const refreshTokenApi = () => {
  const URL_API = "/v1/api/refresh";
  return instanceRefreshToken.put(URL_API, null, {
    withCredentials: true,
  });
};
const forgotPasswordApi = (dataUser) => {
  const URL_API = "/v1/api/forgotPassword";
  return instance.post(URL_API, dataUser);
};
const resetPasswordApi = (dataUser) => {
  const URL_API = "/v1/api/resetPassword";
  return instance.post(URL_API, dataUser);
};
const logoutApi = () => {
  const URL_API = "/v1/api/logout";
  return instance.put(URL_API, null, {
    withCredentials: true,
  });
};
const infoAccountApi = () => {
  const URL_API = "/v1/api/account";
  return instance.get(URL_API);
};
const getRankApi = () => {
  const URL_API = "/v1/api/rank";
  return instance.get(URL_API);
};
const updateScore = (dataUser) => {
  const URL_API = "/v1/api/updateScore";
  return instance.put(URL_API,dataUser);
};
const confirmOtp=(dataUser)=>{
  const URL_API = "/v1/api/confirmOtp";
  return instance.post(URL_API, dataUser);
}
export { registerApi, loginApi, getRankApi, refreshTokenApi, logoutApi,infoAccountApi,confirmOtp,forgotPasswordApi,resetPasswordApi,updateScore};
