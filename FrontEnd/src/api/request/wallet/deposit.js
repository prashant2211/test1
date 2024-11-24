import api from "../../index";

export const GetAllwalletDepositApi = (params) => api.get(`WalletMaster/GetWallet-Deposit?${params}`);