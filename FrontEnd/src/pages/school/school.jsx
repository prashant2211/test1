import React, { useState, useEffect } from "react";
import { Select, Input, Form, Spin, Switch } from "antd";
import columns from "../../columns/School.js";
import Pagination from "../../components/global/pagination/Pagination.jsx";
import LoadableButton from "../../components/buttons/LoadableButton.jsx";
import ModalComponent from "../../components/global/modal/ModalComponent.jsx";
import TableWithSkeleton from "../../components/global/table/TableWithSkeleton.jsx";
import { GetAllinstudionApi, GetAllinstudionByIdApi, AddinstudionApi, UpdateinstudionApi, UpdateUserStatusApi } from "../../api/request/instudion.js";
import moment from "moment";
import toast from "react-hot-toast";
import Edit from "../../assets/Edit.jsx";
import Eye from "../../assets/Eye.jsx";
import stateDistricts from '../../assets/data/stateDistricts.jsx';
import instudion from "../../assets/data/instutionType.jsx";
import ConfirmationModal from "../../components/global/modal/ConfirmationModal.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Segmented from "../../components/segmented/Segmented.jsx";

const { TextArea } = Input;
const { Option } = Select;

export default function Instudion() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [value, setValue] = useState("Active Instudion");
  console.log(value, "value");

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPlanModal, setIsOpenPlanModal] = useState(false);
  const [selectedinstudionId, setSelectedinstudion] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [activeinstudionDetails, setActiveinstudionDetails] = useState({});
  const [initialValues, setInitialValues] = useState({ Instution_Name: '', ChairMan_Name: '', Contact_Number: '', Registar_Name: '', Director_Name: '', Class: '', Affiliation: '', State: '', District: '', Secondary_Contact: '', });
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);
  const [isinstudionDetailsLoading, setisinstudionDetailsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);
  const [isStatusConfirmLoading, setIsStatusConfirmLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleFieldsChange = (_, allFields) => {
    const isChanged = allFields.some(field => field.touched);
    setIsFormChanged(isChanged);
  };

  const filterOption = (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const handleStateChange = (value) => {
    setSelectedState(value);
    setDistrictOptions(stateDistricts[value] || []);
  };
  

  const statusHandler = async (user) => {
    setSelectedUser(user);
    setIsStatusConfirmOpen(true);
  }

  const getAllinstudion = async () => {
    try {
      let params = {
        PageNumber: page,
        PageSize: pageSize,
        status: value === "Inactive Instudion"
          ? "Inactive"
          : value === "Active Instudion"
            ? "Active"
            : value === "All Instudion"
              ? " "
              : value,
        SearchText: searchText
      }
      setIsLoading(true);
      const { data } = await GetAllinstudionApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setData(
          data?.data?.map((item) => {
            return {
              ...item,
              name: `${item?.Instution_Name}`,
              actions: (
                <div className="flex">
                  <button onClick={() => { setSelectedinstudion(item?._id); updatePlanHandler(item) }}><Edit /></button>
                  <button type="button" onClick={() => navigate(`/instution_details/${item?._id}`)} className="mx-3"><Eye /></button>
                </div>
              ),
              Affiliation: (item?.Affiliation ? (<p>Yes</p>) : (<p>No</p>)),
              createdAt: item?.createdAt ? moment(item?.createdAt).format('DD-MM-YYYY, hh:mm A') : null,
              status: (<Switch onChange={() => statusHandler(item)} checkedChildren="On" unCheckedChildren="Off" checked={item?.Status} />),

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

  const getActiveinstudion = async () => {
    try {
      setisinstudionDetailsLoading(true);
      const { data } = await GetAllinstudionByIdApi(selectedinstudionId);
      setActiveinstudionDetails(data?.data);
      setisinstudionDetailsLoading(false);
    } catch (error) {
      setisinstudionDetailsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedinstudionId) {
      getActiveinstudion();
    }
  }, [selectedinstudionId]);

  useEffect(() => {
    getAllinstudion();
  }, [page, pageSize, value, searchText]);

  useEffect(() => {
    if (searchParams?.get("filter")?.trim()) {
      setValue(searchParams?.get("filter")?.trim());
    }
  }, []);

  useEffect(() => {
    setSearchParams(`filter=${value?.toString()}`);
  }, [value]);

  useEffect(() => {
    if (!isOpenPlanModal) {
      form.resetFields();
      setInitialValues({ Instution_Name: '', ChairMan_Name: '', Contact_Number: '', Registar_Name: '', Director_Name: '', Class: '', Affiliation: '', State: '', District: '', Secondary_Contact: '', });
      setIsEdit(false);
    }
  }, [isOpenPlanModal]);

  const updatePlanHandler = (plan) => {
    form.setFieldsValue({
      Instution_Name: plan?.Instution_Name,
      Class: plan?.Class,
      Director_Name: plan?.Director_Name,
      Contact_Number: plan?.Contact_Number,
      State: plan?.State,
      ChairMan_Name: plan?.ChairMan_Name,
      Registar_Name: plan?.Registar_Name,
      District: plan?.District,
      Address: plan?.Address,
      groupId: plan?.groupId,
      Affiliation: plan?.Affiliation,
      Secondary_Contact: plan?.Secondary_Contact,
      Registration_Number: plan?.Registration_Number,
      Password: plan.Password,
      DOB: plan.DOB && moment(moment(data?.data?.dob).format('MM/DD/YYYY'), 'MM/DD/YYYY'),
      Adhar: plan.Adhar

    });
    setIsEdit(true);
    setIsFormChanged(false);
    setIsOpenPlanModal(true);
  }

  const handleSubmit = async (values) => {
    setIsSubmitLoading(true);
    let params = {
      ...values,
    };
    try {
      if (isEdit) {
        const { data } = await UpdateinstudionApi({ instudionId: selectedinstudionId, ...params });
        if (data?.success) {
          toast.success(data?.message);
          setIsOpenPlanModal(false);
          getAllinstudion();
          setIsEdit(false);
          form.resetFields();
        }
      } else {
        const { data } = await AddinstudionApi(params);
        if (data?.success) {
          toast.success(data?.message);
          setIsOpenPlanModal(false);
          getAllinstudion();
          form.resetFields();
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || 'An error occurred');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const statusChangeConfirm = async () => {
    try {
      setIsStatusConfirmLoading(true);
      let params = {
        InstutionId: selectedUser?._id,
        status: !selectedUser?.Status,
      }

      const { data } = await UpdateUserStatusApi(params);
      if (data?.success) {
        getAllinstudion();
        toast.success(data?.message);
      }

      setIsStatusConfirmLoading(false);
      setIsStatusConfirmOpen(false);
    } catch (error) {
      setIsStatusConfirmLoading(false);
    }
  }

  const openAddPlanModal = () => {
    form.resetFields();
    setInitialValues({ Instution_Name: '', ChairMan_Name: '', Contact_Number: '', Registar_Name: '', Director_Name: '', Class: '', Affiliation: '', State: '', District: '', Secondary_Contact: '', });
    setIsFormChanged(true);
    setIsOpenPlanModal(true);
    setIsEdit(false);
  }


  return (
    <div className="max-w-full">
      <div className="flex justify-between flex-wrap gap-5">
        <div className="ant-select-selector-white ant-multi-select-selector">
          <Segmented
            options={[
              "Active Instudion",
              "Inactive Instudion",
              "All Instudion",
            ]}
            value={value}
            setValue={setValue}
          />
        </div>

        <div className="flex items-center flex-wrap gap-4">
          <Input
            size="large"
            style={{ width: 220 }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => setSearchText(search)}
            prefix={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            }
            suffix={
              search && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setSearchText("");
                    setSearch("");
                  }}
                  viewBox="0 0 24 24"
                  fill="#bebebe"
                  className="size-5 cursor-pointer duration-300 hover:fill-[#969595]"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clip-rule="evenodd"
                  />
                </svg>
              )
            }
          />
          <button onClick={openAddPlanModal} className="flex items-center bg-primary text-sm text-white font-semibold px-6 py-2 rounded-lg themeHover  duration-500">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85714 9.14286H0V6.85714H6.85714V0H9.14286V6.85714H16V9.14286H9.14286V16H6.85714V9.14286Z" fill="white" />
            </svg>
            Add Instution
          </button>
        </div>
      </div>

      <div className="border-[2px] border-[var(--theme-light)] rounded-xl pt-4 lg:pt-6 w-full mt-5">
        <div className="px-4 lg:px-6">
          <p className="text-[#2F2B3D] text-xl font-semibold">All Instudion</p>
        </div>
        <div className="my-6">
          <TableWithSkeleton columns={columns} data={data} loading={isLoading} />
          <Pagination total={totalRecord} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
        </div>

        {/* ---- add Account-request ---- */}
        <ModalComponent isOpen={isOpenPlanModal} setIsOpen={setIsOpenPlanModal} title={isEdit ? 'Update Instudion' : 'Add Instudion'} width={1300}>
          <Form className='w-full' autoComplete="off" form={form} initialValues={initialValues} onFinish={handleSubmit} onFieldsChange={handleFieldsChange}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Instution Name</label>
                <Form.Item name="InstutionName" rules={[{ required: true, message: 'Please enter Instution Name.' }]}>
                  <Input placeholder="Instution Name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">ChairMan Name</label>
                <Form.Item name="ChairManName" rules={[{ required: true, message: 'Please enter ChairMan Name.' }]}>
                  <Input placeholder="ChairMan Name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Phone No</label>
                <Form.Item name="ContactNumber" rules={[{ required: true, message: 'Please enter phone number.' }]}>
                  <Input type="number" placeholder="Phone no" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>

              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Director Name</label>
                <Form.Item name="DirectorName" rules={[{ required: true, message: 'Please enter Director name' }]}>
                  <Input placeholder="Director Name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>

              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Registar Name</label>
                <Form.Item name="RegistarName" rules={[{ required: true, message: 'Please enter Registar name.' }]}>
                  <Input placeholder="Registar Name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>

              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Registration Number</label>
                <Form.Item name="RegistrationId" rules={[{ required: true, message: 'Please enter Registration no.' }]}>
                  <Input placeholder="Registration Number" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>

              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Affiliation Name</label>
                <Form.Item name="Affiliation" rules={[{ required: true, message: 'Please enter affiliation name.' }]}>
                  <Input placeholder="affiliation name" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>

              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">
                  State
                </label>
                <Form.Item
                  name="State"
                  rules={[
                    { required: true, message: "Please select a state." },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a state"
                    className="w-full mt-1"
                    filterOption={filterOption}
                    onChange={handleStateChange}
                  >
                    {Object.keys(stateDistricts).map((state) => (
                      <Option key={state} value={state}>
                        {state}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">
                  District
                </label>
                <Form.Item
                  name="District"
                  rules={[
                    { required: true, message: "Please select a district." },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a district"
                    className="w-full mt-1"
                    filterOption={filterOption}
                    disabled={!selectedState}
                  >
                    {districtOptions.map((district) => (
                      <Option key={district} value={district}>
                        {district}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="input-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">Other Phone No(option)</label>
                <Form.Item name="SecondaryContact">
                  <Input type="number" placeholder="Phone no" className="mt-1 w-full ps-4 py-2" />
                </Form.Item>
              </div>
              <div className="ant-select-selector-white">
                <label className="text-base text-[#2F2B3DCC] font-medium">
                  Instution Type
                </label>
                <Form.Item
                  name="instutionType"
                  rules={[
                    { required: true, message: "Please select a instution type." },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a instution Type"
                    className="w-full mt-1"
                    onChange={handleStateChange}
                  >
                    {instudion.map((state) => (
                      <Option key={state} value={state?.value}>
                        {state?.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className='input-white mt-3'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Address</label>
              <Form.Item name="Address" rules={[{ required: true, message: 'Please enter address.' }]}>
                <TextArea className="mt-1" placeholder="address" autoSize={{ minRows: 4, maxRows: 100 }} value={initialValues.BannerCaption} />
              </Form.Item>
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
          title="instudion Information"
          width={1200}
        >

          {
            isinstudionDetailsLoading ? (
              <div className="flex justify-center flex-col my-[10%]">
                <Spin size="large" />
                <p className="primary text-center mt-2">Loading...</p>
              </div>
            ) : (
              <div className='p-5'>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 '>
                  <div>
                    <p className='text-base font-normal '>First Name</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.Instution_Name || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Last Name</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.ChairMan_Name || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Mother Name </p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.Registar_Name || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Father Name</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.Director_Name || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>DOB</p>
                    <p className='text-xl primary font-semibold  mt-2'> {activeinstudionDetails?.DOB ? moment(activeinstudionDetails?.requestDate).format("DD-MM-YYYY")
                      : "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Mobile No.</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.Contact_Number || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Class Name</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.Class || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Adhar Number</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.Adhar || '--'}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Registration Number</p>
                    <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.Registration_Number || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>State</p>
                    <p className='text-xl primary font-semibold  mt-2'> {activeinstudionDetails?.State || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>District</p>
                    <p className='text-xl primary font-semibold  mt-2'> {activeinstudionDetails?.District || "--"}</p>
                  </div>
                  <div>
                    <p className='text-base font-normal '>Secondary Contact</p>
                    <p className='text-xl primary font-semibold  mt-2'> {activeinstudionDetails?.Secondary_Contact || "--"}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className='text-base font-normal '>Address</p>
                  <p className='text-xl primary font-semibold  mt-2'>{activeinstudionDetails?.Address || "--"}</p>
                </div>
              </div>
            )
          }

        </ModalComponent>

        <ConfirmationModal
          isOpen={isStatusConfirmOpen}
          setIsOpen={setIsStatusConfirmOpen}
          message='Are you sure to change the Instudion status?'
          onConfirm={statusChangeConfirm}
          isLoading={isStatusConfirmLoading}
          loadingLabel='Changing status...'
        />
      </div>

    </div>
  );
}
