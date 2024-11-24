import api from "../index";

export const GetUserListWithParentAndChildApi = (params) => api.get(`DropDown/GetUser-List-With-Parent-Child?${params}`);
export const StartNewChatApi = (userId) => api.post(`Chat/StartChat/${userId}`);
export const GetMessagesApi = (userId) => api.get(`Chat/Getmessages/${userId}`);
export const SendMessageApi = (data) => api.post('Chat/SendMessage', data);
export const GetChatHistoryApi = () => api.post('Chat/GetChatHistory');
export const SendMessageWithAttachmentApi = (chatId, data, header) => api.post(`Chat/AttachDocument?${chatId}`, data, header);