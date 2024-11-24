import React,{useState} from 'react'
import ConfirmationModal from "../../../components/global/modal/ConfirmationModal.jsx";
import toast from "react-hot-toast";
import { sendCredentialsApi } from "../../../api/request/teacher.js";

function SendCredentials({ isOpenModal, setIsOpenModal ,id }) {
  const [isReqLoading, setIsReqLoading] = useState(false);

  const SendCredentials = async (value) => {
   
    try {
        setIsReqLoading(true);
        
        const { data } = await sendCredentialsApi(id);
        if (data?.success) {
            toast.success(data?.message);
            setIsOpenModal(false);
        }
        
        setIsReqLoading(false);
    } catch (error) {
        toast.error(error?.response?.data?.error?.message);
        setIsReqLoading(false);
    }
   
}
  return (
    <div>
      <ConfirmationModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                type='success'
                message='Are you sure to send login Details ?'
                onConfirm={() => SendCredentials(true)}
                isLoading={isReqLoading}
                loadingLabel='Accepting request...'
            />
    </div>
  )
}

export default SendCredentials
