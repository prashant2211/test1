import React, { useState } from 'react'
import { Input, Form } from "antd";
import ModalComponent from "../../../components/global/modal/ModalComponent";
import toast from "react-hot-toast";
import Lock from "../../../assets/auth/Lock";
import { ChangepasswordApi } from "../../../api/request/teacher.js"
import LoadableButton from "../../../components/buttons/LoadableButton.jsx";

function ChangePassword({ changePasswor, setChangePassword,id }) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ newpassword: "", confirmpassword: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newpassword, confirmpassword } = formData;
    if (newpassword !== confirmpassword) {
      toast.error("New password and Confirm password do not match");
      return;
    }
    if (!newpassword || !confirmpassword) {
      toast.error("New password or Confirm password can not be empty");
      return;
    }
    try {
      setIsLoading(true)
      let params = {
        confirmPassword: (formData?.confirmpassword),
        password :(formData?.newpassword),
        userId:id
      }
      const { data } = await ChangepasswordApi(params);
      if (data?.success) {
        setFormData({ newpassword: "", confirmpassword: "" })
        setChangePassword(false)
      }
      setIsLoading(false)
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        toast.error(error?.response?.data?.error?.message);
      }
      setIsLoading(false)
    }
  };

  return (
    <div>
      <ModalComponent isOpen={changePasswor} setIsOpen={setChangePassword} title="Change Password" width={600}>
        <form autoComplete="off" onSubmit={handleSubmit}>

          <div>
            <div className='input-white'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>New Password</label>
              <Form.Item name="password" >
                <Input.Password
                  placeholder="Enter your new password"
                  className="border rounded-lg w-full ps-4 py-2"
                  prefix={<Lock />}
                  name="newpassword"
                  onChange={handleChange}
                  value={formData.newpassword}
                />
              </Form.Item>
            </div>
          </div>
          <div className='input-white mt-3'>
            <label className='text-base text-[#2F2B3DCC] font-medium'>Confirm Password</label>
            <Form.Item name="password" >
              <Input.Password
                placeholder="Confirm password"
                className="border rounded-lg w-full ps-4 py-2"
                prefix={<Lock />}
                name="confirmpassword"
                onChange={handleChange}
                value={formData.confirmpassword}
              />
            </Form.Item>
          </div>

          <div className='flex justify-between items-center gap-5 flex-wrap mt-6'>

            <div className="flex gap-5">
              <button type='button' onClick={() => setChangePassword(false)} className='bg-primary text-sm text-white font-semibold rounded-lg px-6 py-2 uppercase themeHover duration-500'>Cancel</button>
              <LoadableButton
              type='submit' className='bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover duration-500'
              disabled={isLoading}
              lable="Submit"
              isLoading={isLoading}
              loadingLable="Send Credentials..."
            />
            </div>
          </div>
        </form>
      </ModalComponent>
    </div>
  )
}

export default ChangePassword
