import api from "../index";

export const GetAllTicketApi = (params) => api.get(`TicketMaster/GetAll-Ticket?${params}`);
export const GetTicketByIdApi = (ticketId) => api.get(`TicketMaster/GetTicket-ByTicketId?TicketId=${ticketId}`);
export const GetTicketChatApi = (data) => api.post('TicketMaster/AddOrGet-ChatByTicketId', data);
export const UpdateTicketApi = (data) => api.put('TicketMaster/Update-Ticket', data);