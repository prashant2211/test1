import api from "../index";

export const GetAllKycApi = (params) => api.get(`Admin/GetAll-UserKyc?${params}`);
export const GetAllKycByIdApi = (kycId) => api.get(`Admin/GetSingleKYC/${kycId}`);
export const KycRequestAcceptRejectApi = (data) => api.post('Admin/UserRejected-ApprovedKyc', data);