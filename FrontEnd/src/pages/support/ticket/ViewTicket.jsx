import React, { useState, useEffect } from "react";
import { Avatar, Input, Spin } from 'antd';
import ConfirmationModal from "../../../components/global/modal/ConfirmationModal.jsx";
import { GetTicketByIdApi, GetTicketChatApi, UpdateTicketApi } from '../../../api/request/ticket'
import { useParams } from 'react-router-dom';
import moment from "moment/moment";
import toast from "react-hot-toast";

function ViewTicket() {

  const { id } = useParams();
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--theme")?.trim();
  const [isLoading, setIsLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [ticket, setTicket] = useState({});
  const [ticketChat, setTicketChat] = useState([]);
  const [message, setMessage] = useState('');
  const [closeTicketConfirmation, setCloseTicketConfirmation] = useState(false);
  const [isCloseTicketLoading, setIsCloseTicketLoading] = useState(false);

  const getTicketById = async () => {
    try {
      setIsLoading(true);
      const { data } = await GetTicketByIdApi(id);
      if (data?.success) {
        setTicket(data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  const getTicketChat = async () => {
    setIsChatLoading(true);
    try {
      let apiParams = {
        ticketId: id,
        userComment: null,
        adminComment: null,
      };
      const { data } = await GetTicketChatApi(apiParams);
      if (data?.success) {
        setTicketChat(data?.data?.comments);
        setIsChatLoading(false);
      }
      setIsChatLoading(false);
    } catch (error) { }
  };

  useEffect(() => {
    getTicketById();
    getTicketChat();
  }, []);

  const sendMessage = async () => {
    if (!message) {
      return;
    }
    try {
      let apiParams = {
        ticketId: id,
        userComments: null,
        adminComments: message,
      };
      const { data } = await GetTicketChatApi(apiParams);
      if (data?.success) {
        setMessage("");
        setTicketChat(data?.data?.comments);
      }
    } catch (error) { }
  };

  const closeTicketHandler = async () => {
    try {
      setIsCloseTicketLoading(true);
      let params = {
        ticketId: ticket?.ticketId,
        userId: ticket?.userId,
        adminComments: null,
        ticketStatusId: 3
      };
      const { data } = await UpdateTicketApi(params);
      if (data?.success) {
        setIsCloseTicketLoading(false);
        toast.success(data?.message);
        setCloseTicketConfirmation(false);
      }
    } catch (error) {
      setIsCloseTicketLoading(false);
    }
  }

  return (
    <div>
      {isLoading || isChatLoading ? (
        <div className="flex justify-center flex-col mt-[20%]">
          <Spin size="large" />
          <p className="primary text-center mt-2">Loading...</p>
        </div>
      ) : (
        <div>
          <div className="border-[2px] border-light rounded-xl pt-4 w-full">
            <div className="px-4 lg:px-6 pb-4 border-b border-light flex flex-wrap justify-between items-center">
              <p className="text-[#2F2B3D] text-xl font-semibold">Ticket - #{ticket?.ticketNo}</p>
              {
                ticket?.status == 'Open' &&
                <button className="bg-primary text-sm text-white font-medium uppercase px-6 py-2 rounded-lg themeHover duration-500" onClick={() => setCloseTicketConfirmation(true)}>Close Ticket</button>
              }
            </div>
            <div className="lg:p-6 p-4">
              <p className="primary text-xl font-semibold">{ticket?.title}</p>
              <p className="primary text-base mt-2">{ticket?.description}</p>
            </div>
          </div>

          <div className='border-[2px] border-light rounded-xl pt-4 w-full mt-5'>
            <div className='flex items-center px-4 lg:px-6 pb-4 border-b border-light'>
              <Avatar round size={40} src='https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg' />
              <p className='font-semibold text-base ml-2 text-[#2F2B3D]'>{ticket?.firstName} {ticket?.lastName}</p>
            </div>
            <div className="max-h-[500px] min-h-[200px] overflow-y-auto">
              {ticketChat?.length > 0 ? (
                <div className="px-4 lg:px-6">
                  {ticketChat?.map((message, index) => (
                    <>
                      {/* Received message */}
                      {message?.userComments !== null && (
                        <div key={index} className="flex w-full my-6">
                          <Avatar round size={40} src='https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg' />
                          <div className="w-[70%] md:w-[50%] lg:w-[40%] ml-3">
                            <div className="flex justify-between mb-1">
                              <p className="text-sm text-[#2F2B3D] font-medium">{ticket?.firstName} {ticket?.lastName}</p>
                              <p className="text-sm text-[#2F2B3D] opacity-70 font-medium">{moment(message?.createdDate).format("DD-MM-YYYY LT")}</p>
                            </div>
                            <p className="bg-primary-light text-[#2F2B3D] rounded-b-md rounded-tr-md py-2 px-4 font-medium">{message?.userComments}</p>
                          </div>
                        </div>
                      )}

                      {/* Sent message */}
                      {message?.adminComments !== null && (
                        <div className="flex justify-end w-full my-6">
                          <div className="w-[70%] md:w-[50%] lg:w-[40%] ml-3">
                            <div className="flex justify-between mb-1">
                              <p className="text-sm text-[#2F2B3D] font-medium">You</p>
                              <p className="text-sm text-[#2F2B3D] opacity-70 font-medium">{moment(message?.createdDate).format("DD-MM-YYYY LT")}</p>
                            </div>
                            <p className="bg-primary-light text-[#2F2B3D] rounded-b-md rounded-tl-md font-medium py-2 px-4">{message?.adminComments}</p>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              ) : (
                <div className="p-4 lg:p-6">
                  <p className="opacity-50 primary">Start new conversation with {ticket?.firstName} {ticket?.lastName} ...</p>
                </div>
              )}
            </div>

            <div className="p-4 lg:p-6">
              <Input
                className="transperant-input py-2 rounded-lg search-bar text-base w-full"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={sendMessage}
                suffix={
                  <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" fill="#e5e5e5" viewBox="0 0 24 24" stroke-width="1.5" stroke={primaryColor} className="w-6 h-6 cursor-pointer duration-300" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={closeTicketConfirmation}
        setIsOpen={setCloseTicketConfirmation}
        message='Are you sure you want to close this ticket?'
        onConfirm={closeTicketHandler}
        isLoading={isCloseTicketLoading}
        loadingLabel='Closing ticket...'
      />
    </div>
  );
}

export default ViewTicket;
