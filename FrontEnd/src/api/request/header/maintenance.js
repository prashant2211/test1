import api from "../../index";

export const MaintenanceOn = () => api.post('Maintenance/Maintenance-Enable');
export const MaintenanceOff = () => api.post('Maintenance/Maintenance-Disable');