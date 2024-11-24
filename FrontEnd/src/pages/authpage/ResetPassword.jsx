import React, { useState } from "react";
import { Form, Input } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { ResetApi } from "../../api/request/users"
import { removeCookies } from "../../services/Cookies";
import LoadableButton from "../../components/buttons/LoadableButton";
import { useSelector } from 'react-redux';
import Lock from "../../assets/auth/Lock";

function ResetPassword() {
  const navigate = useNavigate();
  const { broker } = useSelector(state => state.broker);
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
        email: localStorage.getItem('email'),
        newPassword: (formData?.newpassword),
        userType: 1,
      }
      const { data } = await ResetApi(params);
      if (data?.success) {
        localStorage.clear('email');
        removeCookies('passwordToken');

        navigate("/");
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
            <img src='/assets/logo/logo.png' alt='logo' className='h-30 w-42 object-contain' />
          </div>
          <div className="text-center">
            <p className="text-[#2F2B3D] text-2xl font-semibold auth-heading">
              Reset Your Password
            </p>
            <p className="text-[silver] text-sm font-medium auth-com mt-2 ">
              Please enter your new password to continue.
            </p>
          </div>

          <div className="w-full">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="w-full text-sm font-normal py-1 mt-3">
                <div div className="relative">
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
              <div className="w-full text-sm font-normal py-1 mt-3">
                <div div className="relative">
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
              </div>

              <div className="mt-5">
                <LoadableButton type='submit' className='bg-primary text-[#FFFFFF] font-semibold text-lg rounded-lg w-full py-2' lable='Rest Password' isLoading={isLoading} loadingLable='Reseting Password...' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
