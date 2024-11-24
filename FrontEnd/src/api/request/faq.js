import api from "../index";

export const GetAllfaqApi = (params) => api.get(`FAQsMaster/GetAll-FAQs?${params}`);
export const FaqStatusApi = (data) => api.put(`FAQsMaster/FAQsActive-Inactive`,data);
export const GetAllfaqByIdApi = (FaqId) => api.get(`FAQsMaster/GetFAQsById/${FaqId}`);
export const DeleteFaqApi = (bannerId) => api.delete(`FAQsMaster/DeleteFAQs/${bannerId}`);
export const AddFaqApi = (data, headers) => api.post('FAQsMaster/AddFAQs', data, headers);
export const GetAllContriensApi = () => api.get('DropDown/FAQs-Category');
export const UpdateFaqApi = (data, headers) => api.put('FAQsMaster/UpdateFAQs', data, headers);
export const GetFaqidApi = (FaqId) => api.put(`BannerMaster/Delete-Banner/${FaqId}`);





