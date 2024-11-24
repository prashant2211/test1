import api from "../index";

export const AddUpdateBannerApi = (data, headers) => api.post('BannerMaster/Add-Banner', data, headers);
export const UpdateBannerApi = (data, headers) => api.put('BannerMaster/Update-Banner', data, headers);
export const GetAllBannersApi = (params) => api.get(`BannerMaster/GetAllBanner?${params}`);
export const DeleteBannerApi = (bannerId) => api.delete(`BannerMaster/Delete-Banner/${bannerId}`);
export const BannerStatusApi = (data) => api.put(`BannerMaster/Banner-ActiveInactive`,data);

