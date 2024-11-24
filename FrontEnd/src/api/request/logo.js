import api from '../index';

export const GetAllLogo = () => api.get('admin/logo/getall-logo');
export const ActiveInactiveLogo = (id, status) => api.put(`admin/logo/active-inactive-logo/${id}?IsActive=${status}`);
export const AddUpdateLogo = (data) => api.post('admin/logo/add-updatelogo', data,
    { headers: { Accept: "application/json", "Content-Type": "multipart/form-data" } });