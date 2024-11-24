import api from "../index";

export const GetAllinstudionApi = (params) => api.get(`instution/get-all-instution?${params}`);
export const GetAllinstudionByIdApi = (ActypeId) => api.get(`instution/get-byid-instution?instutionId=${ActypeId}`);
export const AddinstudionApi = (data, headers) => api.post('instution/instution-Register', data, headers);
export const UpdateinstudionApi = (data, headers) => api.patch('instution/update-instution', data, headers);
export const UpdateUserStatusApi = (data) => api.patch('instution/deactivate-instution', data);