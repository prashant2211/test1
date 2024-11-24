import api from "../index";

export const GetAllStudentApi = (params) => api.get(`student/get-all-student?${params}`);
export const GetAllStudentByIdApi = (ActypeId) => api.get(`Student/get-byid-student?studentId=${ActypeId}`);
export const AddStudentApi = (data, headers) => api.post('student/student-Register', data, headers);
export const UpdateStudentApi = (data, headers) => api.patch('Student/update', data, headers);
export const UpdateUserStatusApi = (data) => api.patch('Student/deactivate-student', data);

