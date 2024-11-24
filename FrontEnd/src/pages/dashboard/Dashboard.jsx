import React, { useState, useEffect } from "react";
import BarChart from "../../components/global/barChart/BarChart.jsx";
import { GetAllDashboardApi } from "../../api/request/dashboard.js";
import { presets } from '../../utils/RangePickerPresets.js';
import { DatePicker, Spin } from 'antd';
import StatisticsCard from "../../components/global/cards/StatisticsCardCard.jsx";
import ActualPNLCard from "./components/ActualPNLCard.jsx";
import RadialBarChart from "../../components/global/radialBarChart/RadialBarChart.jsx";
import useWebSocket from 'react-use-websocket';
import Accounts from "../../assets/dashboard/Accounts.jsx";
const { RangePicker } = DatePicker;

const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(0);
  const [socketData, setSocketData] = useState({});
  const [DepositWithdraw, setDepositWithdraw] = useState({ fromDate: '', toDate: '' });
  const totalDeposits = dashboardData?.depositWithdrawalList?.map(item => item.totalDeposit);
  const totalWithdrawals = dashboardData?.depositWithdrawalList?.map(item => item.totalWithdrawal);
  const primaryColor = (getComputedStyle(document.documentElement).getPropertyValue('--theme'))?.trim();
  const secondary = getComputedStyle(document.documentElement).getPropertyValue('--theme2')?.trim();

  const { lastJsonMessage } = useWebSocket(`wss://mt5.EduOrbitfxcrm.com/api/OnlineUserCount/Get-OnlineUserCount`);

  useEffect(() => {
    setSocketData(lastJsonMessage)
  }, [lastJsonMessage])

  const getAllDashboard = async () => {
    try {
      setIsLoading(true);
      let params = {
        FromDate: DepositWithdraw?.fromDate,
        ToDate: DepositWithdraw?.toDate,
      }
      const { data } = await GetAllDashboardApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setDashboardData(data?.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllDashboard();
  }, [DepositWithdraw]);

  const dates = dashboardData?.depositWithdrawalList?.map(item => {
    const date = new Date(item.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const data = [
    { name: "Total Deposit", data: totalDeposits },
    { name: "Total Withdrawal", data: totalWithdrawals },
  ];

  const handleDateChange = (value, type) => {
    if (value && value.length === 2) {
      const fromDate = value[0].format('MM/DD/YYYY');
      const toDate = value[1].format('MM/DD/YYYY');

      setDepositWithdraw({ fromDate: fromDate, toDate: toDate });

    }
    if (!value || value.length === 0) {
      setDepositWithdraw({ fromDate: '', toDate: '' });
    }
  };

  const disabled7DaysDate = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, 'days')) >= 7;
    }
    return false;
  };

  const calculatePercentage = (a, b) => {
    const total = a + b;
    const percentageA = (a / total) * 100;
    return (percentageA.toFixed(2));
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center flex-col mt-[20%]">
          <Spin size="large" />
          <p className="primary text-center mt-2">Loading...</p>
        </div>
      ) : (
        <div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-5">

            <div className="order-2 xl:order-1">
              <ActualPNLCard amount={socketData?.MT5ActualProfitLoss} />
            </div>

            <div className="sm:col-span-2 xl:order-2 order-1">
              <div className="grid sm:grid-cols-3 gap-4">
                <StatisticsCard title='Total Accounts' value={socketData?.MT5ActiveAccounts} change={+75} icon={<Accounts />} />
                <StatisticsCard secondary={true} title='Active Accounts' value={socketData?.MT5TotalAccounts} change={+60} />
                <StatisticsCard title='Inactive Accounts' value={socketData?.MT5InactiveAccounts} change={+10} />
                <StatisticsCard title='Online Users' secondary={true} value={socketData?.MT5OnlineUsers} change={-18} />
                <StatisticsCard title='Pending Accounts' value={dashboardData?.liveAccPending} change={-50} />
                <StatisticsCard title='Pending KYC' secondary={true} value={dashboardData?.kycPending} change={-50} />
              </div>
            </div>

            <div className="sm:col-span-2 order-4 xl:order-3">
              <div className="border-2 border-light sm:p-4 rounded-[10px]">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    {/* <p className="text-xl font-medium">Deposit - Withdraw</p> */}
                    <div className="flex items-center flex-wrap">
                      <div className="flex items-center pl-6">
                        <div className="h-[10px] w-[10px] bg-[var(--theme2)] rounded-[50%]"></div>
                        <p className="ml-2 text-xl font-medium text-[#07111CCC]">Deposit</p>
                      </div>
                      <div className="flex items-center ml-3">
                        <div className="h-[10px] w-[10px] bg-primary rounded-[50%]"></div>
                        <p className="ml-2 text-xl font-medium text-[#07111CCC]">Withdraw</p>
                      </div>
                    </div>
                  </div>
                  <div className='ant-date-range-selector-white'>
                    <RangePicker disabledDate={disabled7DaysDate} className='py-2' onChange={(value) => handleDateChange(value, 'MyTradeZone')} presets={presets} format='DD-MM-YYYY' />
                  </div>
                </div>
                <BarChart values={data} dates={dates} colors={[secondary, primaryColor]} />
              </div>
            </div>

            <div className='border-2 border-light p-3 sm:p-4 rounded-[10px] xl:order-4 order-3'>
              <p className='text-xl font-medium mb-4'>IB Requests</p>
              <RadialBarChart values={[calculatePercentage(dashboardData?.ibRequestApproved, dashboardData?.ibRequestPending), 100 - calculatePercentage(dashboardData?.ibRequestApproved, dashboardData?.ibRequestPending)]} labels={['Approved', 'Pending']} colors={[primaryColor, secondary]} />
              {/* <RadialBarChart values={[calculatePercentage(dashboardData?.ibRequestApproved, dashboardData?.ibRequestPending), 100 - calculatePercentage(dashboardData?.ibRequestApproved, dashboardData?.ibRequestPending)]} labels={['Approved', 'Pending']} colors={[primaryColor, secondary]} /> */}
              <div className='flex justify-between gap-4 items-center'>
                <div className='flex items-center'><div className='h-[10px] w-[10px] bg-primary rounded-full'></div><p className='ml-2 text-sm font-medium text-[#07111CCC]'>Approved Request : {dashboardData?.ibRequestApproved}</p></div>
                <div className='flex items-center'><div className='h-[10px] w-[10px] bg-secondary rounded-full'></div><p className='ml-2 text-sm font-medium text-[#07111CCC]'>Pending Request : {dashboardData?.ibRequestPending}</p></div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-5">
            <div className='border-2 border-light rounded-[10px] cursor-pointer p-6'>
              <p className='font-semibold text-lg uppercase text-[#2F2B3D]'>IB Commission</p>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className='font-semibold text-md uppercase text-[#00000080] mt-4'>Commission Generate :</p>
                  <p className="font-bold text-2xl mt-1 secondary">$ {dashboardData?.ibCommisionGen || 0}</p>

                </div>
                <div>
                  <p className='font-semibold md:text-md uppercase text-[#00000080] mt-4'>Commission Withdraw :</p>
                  <p className="font-bold text-2xl mt-1 primary">$ {dashboardData?.ibCommisionWD || 0}</p>
                </div>
              </div>
            </div>

            <div className='border-2 border-light rounded-[10px] cursor-pointer p-6'>
              <p className='font-semibold text-lg uppercase text-[#2F2B3D]'>Deposit - withdraw</p>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className='font-semibold md:text-md uppercase text-[#00000080] mt-4'>Deposit :</p>
                  <p className="font-bold text-2xl mt-1 secondary">$ {dashboardData?.totalDeposit || 0}</p>
                </div>
                <div>
                  <p className='font-semibold text-md uppercase text-[#00000080] mt-4'>Withdraw :</p>
                  <p className="font-bold text-2xl mt-1 primary">$ {dashboardData?.totalWithdraw || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default Dashboard;