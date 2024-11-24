import React from "react";

function Login() {
  return (
    <>
      <div className='sm:grid grid-cols-12 justify-items-center min-h-screen '>
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
            <form autoComplete="off">
              <div className="mt-10">
                <button
                  type="submit"
                  className="bg-[#1777F240] font-semibold text-lg text-[#2F2B3D] rounded-lg w-full py-2 login-page-btn"
                >
                  <div className="pr-4 pl-2">
                    <img src="/assets/images/login-btn.svg" alt="" className="google_logo" />
                  </div>
                  Continue with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
