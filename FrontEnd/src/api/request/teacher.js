import api from "../index";


export const AddTeacherApi = (data) => api.post(`teacher/teacher-Register`, data);
export const GetAllteacherApi = (params) => api.get(`teacher/get-all-Teacher?${params}`);
export const GetteacherByIdApi = (data) => api.get(`teacher/${data}`);
export const UpdateUserStatusApi = (data) => api.patch('teacher/deactive-teacher', data);
export const UplodeDocumentApi = (data, headers) => api.post('manage_Teacher_Doc/upload_Teacher_Doc', data, headers);


export const GetteacherAccountsByIdApi = (teacherId) => api.get(`Admin/MT5Account-ByUserId/${teacherId}`);
export const GetteacheraccountByIdApi = (loginId) => api.get(`MTFiveAccount/UserGetSingle-LiveAccount/${loginId}`);
export const GetteacheraccountDetailsApi = (loginId) => api.get(`MTFiveAccount/TradingHistory-LiveAccount/${loginId}`);
export const GetuserpasswordApi = (params) => api.get(`Admin/GetUserPassword?${params}`);
export const GetParentTreeApi = (params) => api.get(`UserMaster/IBParentTree-UserById/${params}`);
export const GetIBTreeApi = (params) => api.get(`UserMaster/IBTree-GetAllUserById/${params}`);
export const UpdateteacherApi = (data) => api.put('Admin/Update-UserProfile', data);
export const UnassignUserRuleApi = (data) => api.put('RuleMaster/UnAssignRule', data);
export const AssignUserRuleApi = (data) => api.post('RuleMaster/AssignRule', data);
export const GetAssignableRulesApi = (userId) => api.get(`RuleMaster/GetRuleForAssign/${userId}`);
export const GetIBUserDetailsApi = (userId) => api.get(`Admin/IB-User-Details-ByUserId/${userId}`);

export const UpdateIBStatusApi = (params) => api.patch(`Admin/UpdateIBUserStatus/${params}`);



// MT5 account
export const GetStudentsApi = (params) => api.get(`DropDown/GetAll-Student?${params}`);
export const CreateMT5AccountApi = (data) => api.post('MTFiveAccount/CreateLive-Account', data);

// Deposit
export const GetPaymentGatewayApi = () => api.get('PaymentGateway/GetActivePaymentGatways');
export const DepositAmountApi = (data) => api.post('WalletMaster/deposit-amount-teacher-wallet', data);

// Withdraw
export const GetWithdrawRequestApi = (params) => api.get(`Withdraw/GetWithdraw-RequestByUserId?${params}`);
export const GetWalletApi = (userId, params) => api.get(`WalletMaster/Get-WalletDetailsByRule/${userId}?${params}`);
export const AddWithdrawRequestApi = (data) => api.post('Withdraw/Create-Withdraw-Request', data);

// Internal-Transfer
export const WalletToAccountTransferApi = (data) => api.post('WalletMaster/Internal-Transfer-Wallet-to-Terminal', data);
export const AccountToWalletTransferApi = (data) => api.post('WalletMaster/Internal-Transfer-Terminal-to-Wallet', data);
export const GetMT5AccountsApi = (userId) => api.get(`DropDown/GetUserLive-MTFiveAccount/${userId}`);

export const sendCredentialsApi = (Id) => api.get(`Admin/SendUser-PwdDetails/${Id}`);
export const NotificationApi = (data, headers) => api.post('Notification/SendNotification', data, headers);
export const ChangepasswordApi = (data) => api.put('Admin/Change-Password', data);
export const GetAlllogsApi = (Id, params) => api.get(`Admin/AuditLog-ByUserId/${Id}?${params}`);
export const mt5detailsApi = (data, headers) => api.post('MTFiveAccount/LiveAccount-ChangePassword', data, headers);
