import React, { useState } from "react";
import { Form, Input } from "antd";
import toast from "react-hot-toast";
import { ForgetPasswordApi } from "../../api/request/users"
import { useNavigate } from "react-router-dom";
import LoadableButton from "../../components/buttons/LoadableButton"
import { useSelector } from 'react-redux';
import Message from "../../assets/auth/Message";

function ForgetPassword() {
  const navigate = useNavigate();
  const { broker } = useSelector(state => state.broker);
  const [isLoading, setIsLoading] = useState(false);
  const [FormData, setFormData] = useState({
    email: ""
  })

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
    const { email } = FormData;
    if (!email) {
      toast.error("Email can not be empty");
      return;
    }
    try {
      setIsLoading(true)
      let params = {
        email: FormData?.email,
        userType: 0
      }
      const { data } = await ForgetPasswordApi(params);
      if (data?.success) {
        localStorage.setItem('email', FormData?.email);
        navigate("/forgotpassword_otp");
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
    <>
      <div className='sm:grid grid-cols-12 justify-items-center min-h-screen'>
        <div className='col-span-7 h-full'>
          <div className="flex h-full">
            <img src="/assets/images/login_banner.png" alt="login" className='object-contain p-5 my-auto' />
          </div>
        </div>
        <div className='md:col-span-4 col-span-5 flex flex-col bg-[#FFFFFF] justify-center items-center px-5 lg:px-10 py-10 gap-6 w-full'>
          <div>
            <img src='/assets/logo/logo.png' alt='logo' className='h-30 w-42 object-contain ' />
          </div>
          <div className="text-center">
            <p className="text-[#2F2B3D] text-2xl font-semibold auth-heading">
              Forget Your Password
            </p>
            <p className="text-[silver] text-sm font-medium auth-com mt-2 ">
              Please enter email to get code!
            </p>
          </div>

          <div className="w-full">

            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="w-full text-sm py-1 ">
                <p className="text-[#585F70] font-semibold ">E-mail</p>
                <div className="relative">
                  <Form.Item
                    type="email"
                    name="email"
                  >
                    <Input
                      placeholder="Enter your email-id"
                      className="border rounded-lg w-full ps-4 py-2"
                      prefix={
                        <Message />
                      }
                      value={FormData.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="mt-10">
                <LoadableButton type='submit' className='bg-primary text-[#FFFFFF] font-semibold text-lg rounded-lg w-full py-2' lable='Send Code' isLoading={isLoading} loadingLable='Sending Code...' />

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgetPassword;
