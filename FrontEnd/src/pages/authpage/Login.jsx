import React, { useState } from "react";
import { Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginApi } from "../../api/request/users";
import LoadableButton from "../../components/buttons/LoadableButton"
import { useSelector } from 'react-redux';
import Lock from "../../assets/auth/Lock";
import Message from "../../assets/auth/Message";
import { useDispatch } from 'react-redux';
import { setUserDetails, setloggedIn } from "../../store/Slices/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { broker } = useSelector(state => state.broker);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({  });

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
    const { username, password } = formData;

    if (!username || !password) {
      toast.error("User Name or password can not be empty");
      return;
    } 
    try {
      setIsLoading(true);
      const { data } = await LoginApi({ ...formData, platformName: "admin", });
      if (data?.success) {
        toast.success(data?.message);
        localStorage.setItem('token', data?.data?.token);
        dispatch(setloggedIn(true));
        let user = data?.data;
        dispatch(setUserDetails(user));
        navigate("/dashboard");
      }
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.data?.error?.message) {
        toast.error(error?.response?.data?.error?.message);
      }
      setIsLoading(false);
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
              Welcome to EduOrbit Admin!
            </p>
          </div>
          <div className="w-full">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="w-full text-sm py-1">
                <p className="text-[#585F70] font-semibold ">User Name</p>
                <div className="relative">
                  <Form.Item  name="username">
                    <Input
                      placeholder="Enter your Email,PhoneNo,Username"
                      className="border rounded-lg w-full ps-4 py-2"
                      prefix={
                        <Message />
                      }
                      onChange={handleChange}
                      name="username"
                      value={formData.username}
                      defaultValue={formData.username}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="w-full text-sm font-normal py-1 mt-3">
                <p className="text-[#585F70] font-semibold">Password</p>
                <div div className="relative">
                  <img
                    src="../assets/images/lock.svg"
                    alt=""
                    className="absolute top-[15%] left-5"
                  />
                  <Form.Item name="password">
                    <Input.Password
                      placeholder="Enter your password"
                      className="border rounded-lg w-full ps-4 py-2"
                      prefix={
                        <Lock />
                      }
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      defaultValue={formData.password}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-between w-full text-sm font-normal">
                <label htmlFor="remeber">
                  <Form.Item name="remember" className="me-1 accent-[#8D5AE2]">
                    <Checkbox className="custom-checkbox">Remember me</Checkbox>
                  </Form.Item>
                </label>
                <Link
                  to="/forget_password"
                  className="font-semibold text-xs primary cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mt-5">
                <LoadableButton className='bg-primary text-[#FFFFFF] font-semibold text-lg rounded-lg w-full py-2' type='submit' lable='Login' isLoading={isLoading} loadingLable='Loging in...' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
