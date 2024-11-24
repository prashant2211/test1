import api from "../../index";

export const GetAllAccountApi = (params) => api.get(`Withdraw/GetWithdraw-Request?${params}`);
export const RequestAcceptRejectApi = (data) => api.post('WalletMaster/Wallet-Withdraw', data);
export const GetAllWithdrawByIdApi = (params) => api.get(`WalletMaster/GetSingle-WithdrawalById?${params}`);