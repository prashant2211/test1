import api from "../index";

export const GetAllDashboardApi = (params) => api.get(`Admin/Admin-Dashboard?${params}`);