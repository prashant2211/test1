import api from "../index";

export const LoginApi = (data) => api.post('login', data);











export const OtpApi = (data) => api.post('Authentication/LoginOtp-Verify', data);
export const SendOtpApi = (userId) => api.put(`Authentication/Resend-Otp/${userId}`);
export const LogoutApi = (userId) => api.post(`Activity/LogOut/${userId}`);
export const ForgetPasswordApi = (data) => api.post('authentication/sendotp', data);
export const ResetApi = (data) => api.put('authentication/forget-password', data);
export const GetbrokeridentityBydomainName = (data, headers) => api.get(`admin/getbrokeridentitybydomainname/${data}`, headers);
export const Addlogo = (data) => api.post('admin/logo/add-updatelogo', data, { headers: { Accept: "application/json", "Content-Type": "multipart/form-data" } });