import React,{useState} from 'react'
import { Input, Form } from "antd";
import ModalComponent from "../../../components/global/modal/ModalComponent";
import toast from "react-hot-toast";
import { NotificationApi } from "../../../api/request/teacher.js";
import LoadableButton from "../../../components/buttons/LoadableButton.jsx";
const { TextArea } = Input;

function SendNotification({isNotification,setIsNotification,id}) {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState()
  const [isFaqLoading, setIsFaqLoading] = useState(false);
  
  const handleChange = () => { }

  const handleSubmit = async (values) => {
    setIsFaqLoading(true);

    let params = {
      ...values,
      userId : [id],
      isAdmin: true
    };

    try {
      
        const { data } = await NotificationApi(params);
        if (data?.success) {
          toast.success(data?.message);
          setIsNotification(false);
          form.resetFields();
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || 'An error occurred');
    } finally {
      setIsFaqLoading(false);
    }
  };

  return (
    <div>
       <ModalComponent isOpen={isNotification} setIsOpen={setIsNotification} title="Add Notification" width={800}>
        <Form className='w-full' autoComplete="off" form={form} initialValues={initialValues} onFinish={handleSubmit}>
          
            <div>
              <div className='input-white'>
                <label className='text-base text-[#2F2B3DCC] font-medium'>Title</label>
                <Form.Item name="title" rules={[{ required: true, message: 'Please enter title.' }]}>
                  <Input
                    placeholder="title"
                    className="border mt-1 border-primary w-full ps-4 py-2"
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>
            </div>
            <div className='input-white'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Description</label>
              <Form.Item name="message" rules={[{ required: true, message: 'Please enter description.' }]}>
                <TextArea
                  className="mt-1"
                  onChange={handleChange}
                  placeholder="Description..."
                  autoSize={{ minRows: 5, maxRows: 8 }}
                />
              </Form.Item>
            </div>
         
          <div className='flex justify-between items-center gap-5 flex-wrap mt-6'>
           
            <div className="flex gap-5">
              <button type='button' onClick={() => setIsNotification(false)} className='bg-primary text-sm text-white font-semibold rounded-lg px-6 py-2 uppercase themeHover duration-500'>Cancel</button>
              <LoadableButton
              type='submit' className='bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover duration-500'
              disabled={isFaqLoading}
              lable="Submit"
              isLoading={isFaqLoading}
              loadingLable="Send notification..."
            />
            </div>
          </div>
        </Form>
      </ModalComponent>
    </div>
  )
}

export default SendNotification
