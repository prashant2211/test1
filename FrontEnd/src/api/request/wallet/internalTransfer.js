import api from "../../index";

export const GetAllwalletinternalTransferApi = (params) => api.get(`Admin/GetAll-InternalTransfers?${params}`);