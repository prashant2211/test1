import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { Input } from "antd";
import toast from "react-hot-toast";
import { OtpApi, ForgetPasswordApi } from "../../api/request/users";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import LoadableButton from "../../components/buttons/LoadableButton"
import { useSelector } from 'react-redux';

function Otp() {

  const navigate = useNavigate();
  const { broker } = useSelector(state => state.broker);
  const [cookies, setCookie] = useCookies(['passwordToken']);
  const [timer, setTimer] = useState(120);
  const [isLoading, setIsLoading] = useState(false)
  const [FormData, setFormData] = useState({
    otp: "",
  });

  const formatTime = (timer) => {
    const minutes = Math.floor(timer / 60);
    const remainingSeconds = timer % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    setInterval(() => {
      setTimer(current => current !== 0 ? current - 1 : 0);
    }, 1000);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { otp } = FormData;
    if (!otp) {
      toast.error("OTP can not be empty");
      return;
    }
    try {
      setIsLoading(true)
      let params = {
        email: localStorage.getItem('email'),
        otp: Number(FormData.otp),
        userType: 1,
        tokenType: 1
      }
      const { data } = await OtpApi(params);
      if (data?.success) {
        setCookie('passwordToken', data?.data?.authToken, { path: '/' })
        navigate("/reset_password");
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  };

  const onChange = (e) => {
    const newValue = e.target ? e.target.value : e;
    setFormData({ ...FormData, otp: newValue });
  };

  const sharedProps = {
    onChange,
  };

  const resendOTPHandler = async () => {
    try {
      let params = {
        email: localStorage.getItem('email'),
      }
      const { data } = await ForgetPasswordApi(params);
      if (data?.success) {

        setTimer(120);
      }
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        toast.error(error?.response?.data?.error?.message);
      }
    }
  }

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
              Welcome to {broker?.firstName} {broker?.lastName}!
            </p>
            <p className="text-[silver] text-sm font-medium auth-com mt-2  ">
              Please enter the OTP and verify yourself
            </p>
          </div>
          <div className="w-full">
            <form autoComplete="off" onSubmit={handleSubmit} >
              <div className="w-full text-sm py-1">
                <div className="relative">
                  <Form.Item
                    name="otp"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.OTP
                      variant="filled"
                      {...sharedProps}
                      value={FormData.otp}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>

                </div>
              </div>
              <div className="mt-8">
                <LoadableButton type='submit' className='bg-primary text-[#FFFFFF] font-semibold text-lg rounded-lg w-full py-2' lable='Verify' isLoading={isLoading} loadingLable='Verifyin...' />

              </div>
            </form>
            <div className="resend mt-3">
              {
                timer == 0 ? (<button onClick={resendOTPHandler}>Resend OTP</button>) : (<p>Resend OTP in {formatTime(timer)}</p>)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;
