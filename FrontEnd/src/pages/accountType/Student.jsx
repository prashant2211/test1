import React, { useState, useEffect } from "react";
import { Select, Input, Form } from "antd";
import columns from "../../columns/Student.js";
import Pagination from "../../components/global/pagination/Pagination.jsx";
import LoadableButton from "../../components/buttons/LoadableButton.jsx";
import ModalComponent from "../../components/global/modal/ModalComponent.jsx";
import TableWithSkeleton from "../../components/global/table/TableWithSkeleton.jsx";
import { GetAllActypeApi, GetAllActypeByIdApi, GetAllplanApi, AddStudentApi, UpdateAccountApi } from "../../api/request/Student.js";
import moment from "moment";
import toast from "react-hot-toast";
import Edit from "../../assets/Edit.jsx";
import Eye from "../../assets/Eye.jsx";

export default function Student() {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState(10);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPlanModal, setIsOpenPlanModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [activePlanDetails, setActivePlanDetails] = useState({});
  const [initialValues, setInitialValues] = useState({ planName: '', groupId: null, minimumDeposit: '', instruments: '', spread: '', commission: '', leverage: null, swapFree: null, marginCall: '', stopOut: '', accType: null, });
  const [plan, setPlan] = useState([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleFieldsChange = (_, allFields) => {
    const isChanged = allFields.some(field => field.touched);
    setIsFormChanged(isChanged);
  };

  const getAllPlan = async () => {
    try {
      let params = {
        PageNumber: page,
        PageSize: pageSize,
      }
      setIsLoading(true);
      const { data } = await GetAllActypeApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setData(
          data?.data?.map((item) => {
            return {
              ...item,
              accType: item?.accType ? <p>Live</p> : <p>Demo</p>,
              actions: (
                <div className="flex">
                  <button onClick={() => { setSelectedPlanId(item?.planId); updatePlanHandler(item) }}><Edit /></button>
                  <button type="button" onClick={() => { setIsOpenModal(true); setSelectedPlanId(item?.planId); }} className="mx-3"><Eye /></button>

                </div>
              ),
              swapFree: (item?.swapFree ? (<p>Yes</p>) : (<p>No</p>)),
              createdDate: item?.createdDate ? moment(item?.createdDate).format('DD-MM-YYYY, hh:mm A') : null,

            };
          })
        );
        setTotalRecord(data?.totalRecords);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const getActivePlan = async () => {
    try {
      const { data } = await GetAllActypeByIdApi(selectedPlanId);
      setActivePlanDetails(data?.data);
    } catch (error) { }
  }

  const getplan = async () => {
    try {
      const { data } = await GetAllplanApi();
      if (data?.success) {
        setPlan(data?.data?.map((item) => ({ ...item, value: item?.id, label: item?.groupName })));
      }
    } catch (error) { }
  }

  useEffect(() => {
    getplan()
  }, []);

  useEffect(() => {
    if (selectedPlanId) {
      getActivePlan();
    }
  }, [selectedPlanId]);

  useEffect(() => {
    getAllPlan();
  }, [page, pageSize]);

  useEffect(() => {
    if (!isOpenPlanModal) {
      form.resetFields();
      setInitialValues({ planName: '', groupId: null, minimumDeposit: '', instruments: '', spread: '', commission: '', leverage: null, swapFree: null, marginCall: '', stopOut: '', accType: null, });
      setIsEdit(false);
    }
  }, [isOpenPlanModal]);

  const updatePlanHandler = (plan) => {
    form.setFieldsValue({
      accType: plan?.accType,
      leverage: plan?.leverage,
      commission: plan?.commission,
      instruments: plan?.instruments,
      marginCall: plan?.marginCall,
      minimumDeposit: plan?.minimumDeposit,
      spread: plan?.spread,
      stopOut: plan?.stopOut,
      planName: plan?.planName,
      groupId: plan?.groupId,
      swapFree: plan?.swapFree,
    });
    setIsEdit(true);
    setIsFormChanged(false);
    setIsOpenPlanModal(true);
  }

  const handleSubmit = async (values) => {
    setIsSubmitLoading(true);
    let params = {
      ...values,
      commission: Number(values.commission),
      instruments: Number(values.instruments),
      marginCall: Number(values.marginCall),
      minimumDeposit: Number(values.minimumDeposit),
      spread: Number(values.spread),
      stopOut: Number(values.stopOut),
    };
    try {
      if (isEdit) {
        const { data } = await UpdateAccountApi({ planId: selectedPlanId, ...params });
        if (data?.success) {
          toast.success(data?.message);
          setIsOpenPlanModal(false);
          getAllPlan();
          setIsEdit(false);
          form.resetFields();
        }
      } else {
        const { data } = await AddStudentApi(params);
        if (data?.success) {
          toast.success(data?.message);
          setIsOpenPlanModal(false);
          getAllPlan();
          form.resetFields();
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || 'An error occurred');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const openAddPlanModal = () => {
    form.resetFields();
    setInitialValues({ planName: '', groupId: null, minimumDeposit: '', instruments: '', spread: '', commission: '', leverage: null, swapFree: null, marginCall: '', stopOut: '', accType: null, });
    setIsFormChanged(true);
    setIsOpenPlanModal(true);
    setIsEdit(false);
  }


  return (
    <div>
      <div className="flex justify-end items-center flex-wrap gap-5">
        <div>
          <button onClick={openAddPlanModal} className="flex items-center bg-primary text-sm text-white font-semibold px-6 py-2 rounded-lg themeHover  duration-500">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85714 9.14286H0V6.85714H6.85714V0H9.14286V6.85714H16V9.14286H9.14286V16H6.85714V9.14286Z" fill="white" />
            </svg>
            Add Plan
          </button>
        </div>
      </div>

      <div className="border-[2px] border-[var(--theme-light)] rounded-xl pt-4 lg:pt-6 w-full mt-5">
        <div className="px-4 lg:px-6">
          <p className="text-[#2F2B3D] text-xl font-semibold">Student</p>
        </div>
        <div className="my-6">
          <TableWithSkeleton columns={columns} data={data} loading={isLoading} />
          <Pagination total={totalRecord} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
        </div>

        {/* ---- add Account-request ---- */}
        <ModalComponent isOpen={isOpenPlanModal} setIsOpen={setIsOpenPlanModal} title={isEdit ? 'Update Plan' : 'Add Plan'} width={1300}>
          <Form className='w-full' autoComplete="off" form={form} initialValues={initialValues} onFinish={handleSubmit} onFieldsChange={handleFieldsChange}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Plan Name</label>
                <Form.Item name="planName" rules={[{ required: true, message: 'Please enter Plan name.' }]}>
                  <Input placeholder="Plan name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Group Name</label>
                <Form.Item name="groupId" rules={[{ required: true, message: 'Please select group name.' }]}>
                  <Select placeholder="Select a group name" className="w-full mt-1" options={plan} />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Minimum Deposit</label>
                <Form.Item name="minimumDeposit" rules={[{ required: true, message: 'Please enter minimum deposit.' }]}>
                  <Input type="number" placeholder="Minimum deposit" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Instruments</label>
                <Form.Item name="instruments" rules={[{ required: true, message: 'Please enter instruments.' }]}>
                  <Input placeholder="Instruments" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Spread</label>
                <Form.Item name="spread" rules={[{ required: true, message: 'Please enter Spread.' }]}>
                  <Input placeholder="Spread" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Commission</label>
                <Form.Item name="commission" rules={[{ required: true, message: 'Please enter commission.' }]}>
                  <Input type="number" placeholder="Commission" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Leverage</label>
                <Form.Item name="leverage" rules={[{ required: true, message: 'Please Select leverage.' }]}>
                  <Select placeholder="Select leverage" className="w-full mt-1" options={[{ value: "100", label: "100" }, { value: "200", label: "200" }, { value: "300", label: "300" }, { value: "400", label: "400" }, { value: "500", label: "500" }]} />
                </Form.Item>
              </div>
              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Swap Free</label>
                <Form.Item name="swapFree" rules={[{ required: true, message: 'Please Select swap free.' }]}>
                  <Select placeholder="Select swap free" className="w-full mt-1" options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]} />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Margin Call</label>
                <Form.Item name="marginCall" rules={[{ required: true, message: 'Please enter margin call.' }]}>
                  <Input type="number" placeholder="Margin call" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Account Type</label>
                <Form.Item name="accType" rules={[{ required: true, message: 'Please Select account type.' }]}>
                  <Select placeholder="Account type" className="w-full mt-1" options={[{ value: true, label: "Live" }, { value: false, label: "Demo" }]} />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Stop Out</label>
                <Form.Item name="stopOut" rules={[{ required: true, message: 'Please enter Stop out.' }]}>
                  <Input placeholder="Stop out" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-between items-center mt-7 gap-5">
              <button type="button" onClick={() => setIsOpenPlanModal(false)} className="bg-primary text-sm text-white font-medium uppercase px-10 py-2 rounded-lg hover:bg-primary duration-500">Back</button>
              <LoadableButton type='submit' className='bg-primary text-sm text-white font-medium uppercase px-10 py-2 rounded-lg hover:bg-primary duration-500' lable='Submit' disabled={!isFormChanged || isSubmitLoading} isLoading={isSubmitLoading} loadingLable='Submitting...' />
            </div>
          </Form>
        </ModalComponent>

        {/* ---- Account Information ---- */}
        <ModalComponent
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          onCancel={() => setIsOpenModal(false)}
          width={400}
        >

          <div className="border border-primary rounded-lg px-4 py-3">
            <p className="uppercase text-center text-[#413079] font-semibold text-4xl">
              {activePlanDetails?.planName}
            </p>
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center">
                <img
                  src="assets/icons/checkmark-green.svg"
                  width={22}
                  alt="icon"
                />
                <p className="text-xl	font-medium text-[#413079] ml-2">
                  Minimum Deposit
                </p>
              </div>
              <p className="text-xl	font-medium text-[#413079] ml-2">$ {activePlanDetails?.minimumDeposit}</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <img
                  src="assets/icons/checkmark-green.svg"
                  width={22}
                  alt="icon"
                />
                <p className="text-xl	font-medium text-[#413079] ml-2">
                  Instruments
                </p>
              </div>
              <p className="text-xl	font-medium text-[#413079] ml-2">{activePlanDetails?.instruments} +</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <img
                  src="assets/icons/checkmark-green.svg"
                  width={22}
                  alt="icon"
                />
                <p className="text-xl	font-medium text-[#413079] ml-2">
                  Spread From
                </p>
              </div>
              <p className="text-xl	font-medium text-[#413079] ml-2">{activePlanDetails?.spread} Pips</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <img
                  src="assets/icons/checkmark-green.svg"
                  width={22}
                  alt="icon"
                />
                <p className="text-xl	font-medium text-[#413079] ml-2">
                  Commission
                </p>
              </div>
              <p className="text-xl	font-medium text-[#413079] ml-2">{activePlanDetails?.commission} $</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <img
                  src="assets/icons/checkmark-green.svg"
                  width={22}
                  alt="icon"
                />
                <p className="text-xl	font-medium text-[#413079] ml-2">
                  Swap free/Islamic
                </p>
              </div>
              <p className="text-xl	font-medium text-[#413079] ml-2 uppercase">
                {activePlanDetails?.swapFree === true ? "Yes" : "NO"}
              </p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <img
                  src="assets/icons/checkmark-green.svg"
                  width={22}
                  alt="icon"
                />
                <p className="text-xl	font-medium text-[#413079] ml-2">
                  Margin Call
                </p>
              </div>
              <p className="text-xl	font-medium text-[#413079] ml-2">{activePlanDetails?.marginCall} %</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <img
                  src="assets/icons/checkmark-green.svg"
                  width={22}
                  alt="icon"
                />
                <p className="text-xl	font-medium text-[#413079] ml-2">
                  Stop Out
                </p>
              </div>
              <p className="text-xl	font-medium text-[#413079] ml-2">{activePlanDetails?.stopOut} %</p>
            </div>
           
          </div>

        </ModalComponent>
      </div>
    </div>
  );
}
