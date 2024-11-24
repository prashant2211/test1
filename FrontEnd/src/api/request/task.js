import api from "../index";

export const AddUpdateTaskApi = (data) => api.post('TaskMaster/Create-Task', data);
export const GetAllTaskCategoryApi = () => api.get('DropDown/TaskCategory-List');
export const GetAllTaskPriorityApi = () => api.get('DropDown/TaskPriority-List');
export const GetAllTasksApi = (params) => api.get(`TaskMaster/GetAll-Tasks?${params}`);
export const UpdateTasksStatusApi = (data) => api.patch('atask/update-taskstatus', data);
export const DeleteTaskApi = (taskId) => api.delete(`atask/deletetask/${taskId}`);
export const GetAllTeamApi = (params) => api.get(`DropDown/GetUser-List?${params}`);