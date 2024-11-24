import React, { useState, useEffect } from "react";
import { Switch, Input, Form, Spin, Select, Drawer, Avatar, Tabs, Menu } from "antd";
import columns from "../../../columns/AccountDetails.js";
import TableWithSkeleton from "../../../components/global/table/TableWithSkeleton.jsx";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../components/global/modal/ModalComponent.jsx";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { GetteacherByIdApi, GetteacherAccountsByIdApi, GetuserpasswordApi, UpdateteacherApi, UnassignUserRuleApi, AssignUserRuleApi, GetIBUserDetailsApi } from '../../../api/request/teacher.js';
import { GetAllKycByIdApi, } from '../../../api/request/kyc.js'
import moment from "moment/moment.js";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import Eye from "../../../assets/Eye.jsx";
import { useParams } from 'react-router-dom';
import { GetAllCountryApi } from "../../../api/request/common.js";
import { UpdateIBStatusApi } from "../../../api/request/teacher.js";
import LoadableButton from "../../../components/buttons/LoadableButton.jsx";
import Lock from "../../../assets/auth/Lock";
import ConfirmationModal from "../../../components/global/modal/ConfirmationModal.jsx";
import Redirect from "../../../assets/Redirect.jsx";
import { Button, Dropdown, Space } from 'antd';
import SendCredentials from "../components/SendCredentials"
import SendNotification from "../components/SendNotification"
import ChangePassword from "../components/ChangePassword"
import UploadDocument from "./UploadDocument.js";


export default function ClientDetails() {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { userDetails } = useSelector(state => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { id } = useParams();
  const [isAccTableLoading, setIsAccTableLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isKycLoading, setIsKycLoading] = useState(false);
  const [teacher, setteacher] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isEditteacherLoading, setIsEditteacherLoading] = useState(false);
  const [data, setData] = useState([]);
  const [kycDetails, setKycDetails] = useState({})
  const [formData, setFormData] = useState({ password: '' });
  const [newpassword, setNewpassword] = useState('');
  const [countries, setCountries] = useState([]);
  const [initialValues, setInitialValues] = useState({ firstName: "", lastName: "", email: "", phoneNo: "", countryId: null, roleId: '', });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [ruleData, setRuleData] = useState([]);
  const [selectedRule, setSelectedRule] = useState();
  const [isLoadingPassModal, setIsLoadingPassModal] = useState(false);
  const [isOpenUnassignModal, setIsOpenUnassignModal] = useState(false);
  const [isRuleUnassignLoading, setIsRuleUnassignLoading] = useState(false);
  const [isOpenRuleListModal, setIsOpenRuleListModal] = useState(false);
  const [isLoadingRuleListModal, setIsLoadingRuleListModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isRuleAssignLoading, setIsRuleAssignLoading] = useState(false);
  const [filter, setFilter] = useState('Live Account');
  const [accounts, setAccounts] = useState([]);
  const [isLoadingIbDetails, setIsLoadingIbDetails] = useState(false);
  const [ibDetails, setIbDetails] = useState(null);
  const [isOpenModalnew, setIsOpenModalnew] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [mT5LoginDetails, setmT5LoginDetails] = useState(false);
  const [documents, setDocuments] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);
  const [isStatusConfirmLoading, setIsStatusConfirmLoading] = useState(false);

  const items = [
   
    {
      key: '1',
      label: <button
        onClick={() => {
          setmT5LoginDetails(true);
        }}
      > Payment</button>
    },
    {
      key: '2',
      label: <button
        onClick={() => {
          setDocuments(true);
        }}
      > Upload Documents</button>
    },
    {
      key: '3',
      label: <button
        onClick={() => {
          setIsOpenModalnew(true);
        }}
      > Send Credentials</button>
    },
    {
      key: '4',
      label: <button
        onClick={() => {
          setIsNotification(true);
        }}
      > Send Notification </button>
    },
    {
      key: '5',
      label: <button
        onClick={() => {
          setChangePassword(true);
        }}>Change Password</button>
    },

  ];



  let action = { title: 'Actions', dataIndex: 'actions' };

  const openUnassignModal = async (rule) => {
    setSelectedRule(rule);
    setIsOpenUnassignModal(true);
  }

  const unassignUserRule = async () => {
    try {
      setIsRuleUnassignLoading(true);
      const { data } = await UnassignUserRuleApi([selectedRule?.ruleAssignId]);
      if (data?.success) {
        toast.success(data?.message);
        setIsOpenUnassignModal(false);
        setRuleData((prevRecords) =>
          prevRecords.filter((record) => record.ruleAssignId !== selectedRule?.ruleAssignId)
        );
      }
      setIsRuleUnassignLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      setIsRuleUnassignLoading(false);
    }
  }


  const assignUserRule = async () => {
    try {
      setIsRuleAssignLoading(true);
      let params = selectedRowKeys.map((rule) => ({ userId: id, ...(JSON.parse(rule)), }))
      const { data } = await AssignUserRuleApi(params);
      if (data?.success) {
        getteacherById();
        toast.success(data?.message);
        setIsOpenRuleListModal(false);
      }
      setIsRuleAssignLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      setIsRuleAssignLoading(false);
    }
  }

  const handleFieldsChange = (_, allFields) => {
    const isChanged = allFields.some(field => field.touched);
    setIsFormChanged(isChanged);
  };

  const getteacherById = async () => {
    try {
      setIsLoading(true);
      const { data } = await GetteacherByIdApi(id);
     
      if (data?.success) {
        setInitialValues({ firstName: data?.data?.firstName, lastName: data?.data?.lastName, email: data?.data?.email, phoneNo: data?.data?.phoneNo, countryId: data?.data?.countryName, roleId: data?.data?.isIBUser == 'Yes' ? 'IB' : 'teacher' });
        setteacher(data?.data);
        setRuleData(
          data?.data?.assignRuleList?.map((item) => {
            return {
              ...item,
              actions: (<button className="font-bold text-red-500" onClick={() => openUnassignModal(item)}>Unassign</button>),
            };
          })
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  const getteacherAccounts = async () => {
    try {
      setIsAccTableLoading(true);
      const { data } = await GetteacherAccountsByIdApi(id);
      if (data?.success) {
        setData(
          data?.data?.map((item) => {
            return {
              ...item,
              createdDate: item?.createdDate ? moment(item?.createdDate).format('DD-MM-YYYY LT') : null,
              actions: (<button type="button" onClick={() => navigate(`/account_details/${item?.login}/${id}`)}><Eye /></button>),
            };
          })
        );
      }
      setIsAccTableLoading(false);
    } catch (error) {
      setIsAccTableLoading(false);
    }
  }

  const filterAccounts = (type) => {
    const isDemo = type === 'Demo Account';
    setAccounts(data.filter(account => account.isDemo === isDemo));
  };

  useEffect(() => {
    filterAccounts(filter);
  }, [data]);

  useEffect(() => {
    filterAccounts(filter);
  }, [filter]);

  const getContries = async () => {
    try {
      const { data } = await GetAllCountryApi();
      if (data?.success) {
        setCountries(data?.data?.map((item) => ({ ...item, value: item?.id, label: item?.countryName, })));
      }
    } catch (error) { }
  };

  useEffect(() => {
    getContries();
    getteacherById();
    getKycById();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoadingPassModal(true);
      let params = {
        LoginUserId: userDetails._id,
        UserId: id,
        Paasword: values.password,
      };
      const { data } = await GetuserpasswordApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setNewpassword(data.data)
        setIsOpenModal(false);
      }
      setIsLoadingPassModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      setIsLoadingPassModal(false);
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const getKycById = async () => {
    try {
      setIsKycLoading(true);
      const { data } = await GetAllKycByIdApi(id);
      setKycDetails(data?.data);
      setIsKycLoading(false);
    } catch (error) {
      setIsKycLoading(false);
    }
  }

  const handleEditSubmit = async (value) => {
    try {
      delete value.email;
      delete value.countryId;
      let apiParams = {
        userId: id,
        ...value,
        roleId: value?.roleId == 'IB' ? '4' : '2'
      };
      setIsEditteacherLoading(true);
      const { data } = await UpdateteacherApi(apiParams);
      if (data?.success) {
        toast.success(data?.message);
        setIsFormChanged(false);
        setIsDrawerOpen(false);
        setIsEditteacherLoading(false);
        setIsOpenEditModal(false);
        getteacherById();
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      setIsEditteacherLoading(false);
    }
  };

  const filterOption = (input, option) => {
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [isOpenRuleListModal]);

  const getIBDetails = async () => {
    if (!teacher?.isIBUser == 'Yes') {
      return;
    }
    try {
      setIsLoadingIbDetails(true);
      const { data } = await GetIBUserDetailsApi(id);
      if (data?.data) {
        setIbDetails(data?.data);
      }
      setIsLoadingIbDetails(false);
    } catch (error) {
      setIsLoadingIbDetails(false);
    }
  }

  const statusChangeConfirm = async () => {
    try {
      setIsStatusConfirmLoading(true);
      let params = {
        Status: !selectedUser?.isActive
      }

      const { data } = await UpdateIBStatusApi(id, new URLSearchParams(params).toString());
      if (data?.success) {
        toast.success(data?.message);
      }

      setIsStatusConfirmLoading(false);
      setIsStatusConfirmOpen(false);
    } catch (error) {
      setIsStatusConfirmLoading(false);
    }
  }

  const statusHandler = async (user) => {
    setSelectedUser(user);
    setIsStatusConfirmOpen(true);
  }

  const RenderKYCDetails = () => {
    return (
      <div>
        {(isKycLoading) ? (
          <div className="flex justify-center flex-col my-[8%]">
            <Spin size="large" />
            <p className="primary text-center mt-2">Loading...</p>
          </div>
        ) : (
          <div className="m-6 flex items-center justify-center h-full">
            {
              kycDetails?.isKyc ? (
                <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4">
                  <div>
                    <p className="text-[#1E232CC7] text-lg">KYC</p>
                    <p className="primary text-lg font-semibold mt-2">{kycDetails?.isKyc ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-[#1E232CC7] text-lg">KYC Type</p>
                    <p className="primary text-lg font-semibold mt-2">{kycDetails?.kycStatus}</p>
                  </div>
               
                  {
                    kycDetails?.kycType == 'manual' &&
                    <div>
                      <p className="text-[#1E232CC7] text-lg">Document</p>
                      <div className="flex items-center cursor-pointer" onClick={() => openInNewTab(kycDetails?.fileUrlPath)}>
                        <p className="primary text-lg font-semibold mt-2 underline mr-2">View Document</p>
                        <Redirect />
                      </div>
                    </div>
                  }
                </div>
              ) : (
                <p className="text-lg text-gray-500">KYC is pending...</p>
              )
            }
          </div >
        )}
      </div>
    )
  }

  const RenderIBDetails = () => {
    return (
      <div className="m-6">
        {isLoadingIbDetails ? (
          <div className="flex justify-center flex-col my-[8%]">
            <Spin size="large" />
            <p className="primary text-center mt-2">Loading...</p>
          </div>
        ) : (
          <div>
            {
              ibDetails != null ? (
                <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  <div className="my-2">
                    <p className="text-[#1E232CC7] text-lg">IB User</p>
                    <p className="primary text-lg font-semibold mt-2">{ibDetails?.ibRequestStatus}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-[#1E232CC7] text-lg">Platform Type</p>
                    <p className="primary text-lg font-semibold mt-2">{ibDetails.platformType}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-[#1E232CC7] text-lg">Account Type & Commission Amount</p>
                    <p className="primary text-lg font-semibold mt-2">{ibDetails?.StudentCommissionAmount}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-[#1E232CC7] text-lg">IB Active / Inactive</p>
                    <Switch onChange={() => statusHandler(ibDetails)} checkedChildren="On" unCheckedChildren="Off" checked={ibDetails?.isActive} />
                  </div>
                  <div className="my-2">
                    
                    <p className="text-[#1E232CC7] text-lg">
                      Total Generate Commission
                    </p>
                    <p className="primary text-lg font-semibold mt-2">$ {ibDetails?.totalGenerateCommission}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-[#1E232CC7] text-lg">
                      Total Withdraw Commission
                    </p>
                    <p className="primary text-lg font-semibold mt-2">$ {ibDetails?.totalWithdrawCommission}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-[#1E232CC7] text-lg">
                      Total Available Commission
                    </p>
                    <p className="primary text-lg font-semibold mt-2">$ {ibDetails?.totalAvailableCommission}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-[#1E232CC7] text-lg">Create Date</p>
                    <p className="primary text-lg font-semibold mt-2">{moment(ibDetails?.ibCreatedDate).format('LLL')}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-[#1E232CC7] text-lg">
                      Stop Generate Commission
                    </p>
                    <Switch defaultChecked />
                  </div>
                </div>
              ) : (
                <p className="text-lg text-gray-500">Current user is not a ib user.</p>
              )
            }
          </div>
        )}
      </div>
    )
  }

  const RenderAccounts = () => {
    return (
      <div className="m-6">
        <div className="border border-b-0">
          <TableWithSkeleton columns={columns} data={accounts} loading={isAccTableLoading} length={3} />
        </div>
      </div>
    )
  }

  let tabsItem = [
    { label: 'Salary Details', key: 1, children: RenderKYCDetails() },
    { label: 'Pament Details', key: 2, children: RenderAccounts() }
  ];

  const onTabsChange = (key) => {
    if (key == 2) {
      // getIBDetails();
    } else if (key == 2) {
      // getteacherAccounts();
    }
  };

  const menu = (
    <Menu>
      {items.map(item => (
        <Menu.Item key={item.key}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );




  return (
    <div>
      <div className="border-2 border-light rounded-xl p-4 lg:p-6">
        {(isLoading) ? (
          <div className="flex justify-center flex-col my-[5%]">
            <Spin size="large" />
            <p className="primary text-center mt-2">Loading...</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap justify-between items-center gap-5 ps-3">
              <div className="flex items-center gap-3">
                <Avatar size={50} className="uppercase bg-primary">{teacher?.First_Name?.charAt(0)}{teacher?.Last_Name?.charAt(0)}</Avatar>
                <p className="font-bold text-lg">{teacher?.First_Name} {teacher?.Last_Name}</p>
                {teacher?.isIBUser == 'Yes' &&
                  <div className="bg-primary-light rounded-md px-2"><p className="primary text-sm font-semibold">IB User</p></div>
                }
              </div>

              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    placement="bottom"
                    arrow
                  >
                    <Button>Actions</Button>
                  </Dropdown>
                </Space>
              </Space>
              {/* <button type="button" className="primary font-semibold">Actions</button> */}
            </div>
            <div className="w-full grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-5 px-4">
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">Email</p>
                <p className="primary text-lg font-semibold mt-2">{teacher?.Email}</p>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">Mobile No.</p>
                <p className="primary text-lg font-semibold mt-2">{teacher?.Contact_Number}</p>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">State</p>
                <p className="primary text-lg font-semibold mt-2">{teacher?.State}</p>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">Joining Date</p>
                <p className="primary text-lg font-semibold mt-2">{moment(teacher?.joining_Date).format('DD-MM-YYYY, hh:mm A')}</p>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">Qualification</p>
              <p className="primary text-lg font-semibold mt-2">{teacher?.Qualification}</p>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">Specialised Subject</p>
                <p className="primary text-lg font-semibold mt-2"> {teacher?.Specialised_Subject}</p>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">Experience</p>
                <p className="primary text-lg font-semibold mt-2">{teacher?.Experience || '-'}</p>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">DOB</p>
                <div className="flex items-center cursor-pointer mt-2">
                <p className="primary text-lg font-semibold mt-2">{moment(teacher?.DOB).format('DD-MM-YYYY, hh:mm A')}</p>
                </div>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">Comfortable Subject</p>
                {teacher?.List_of_comfortable_Subject?.map(item => (<p className="primary text-lg font-semibold mt-2">{item || '-'}</p>))}
              </div>
              <div>
                <p className="text-[#1E232CC7] text-lg">Password</p>
                <div className="flex">
                  <p className="primary text-lg font-semibold mt-2">{!newpassword ? teacher?.password : newpassword}</p>
                  {!newpassword && <button type="button" className="ml-2" onClick={() => setIsOpenModal(true)}><Eye /></button>}
                </div>
              </div>
              <div className="my-2">
                <p className="text-[#1E232CC7] text-lg">Address</p>
                <p className="primary text-lg font-semibold mt-2">{teacher.Address || '-'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-2 border-light rounded-xl mt-5">
        <Tabs
          tabPosition='left'
          onChange={onTabsChange}
          items={tabsItem}
        />
      </div>


      {/* User rule unassign confirmation modal */}
      <ConfirmationModal
        isOpen={isOpenUnassignModal}
        setIsOpen={setIsOpenUnassignModal}
        message='Are you sure you want to unassign this rule?'
        onConfirm={unassignUserRule}
        isLoading={isRuleUnassignLoading}
        loadingLabel='Unassigning rule...'
      />

      <ConfirmationModal
        isOpen={isStatusConfirmOpen}
        setIsOpen={setIsStatusConfirmOpen}
        message='Are you sure to change the IB status?'
        onConfirm={statusChangeConfirm}
        isLoading={isStatusConfirmLoading}
        loadingLabel='Changing status...'
      />

      {/* Update password modal */}
      <ModalComponent isOpen={isOpenModal} setIsOpen={setIsOpenModal} title="Password" width={600}>
        <Form className="w-full" autoComplete="off" initialValues={{ password: '' }} onFinish={handleSubmit}>
          <div className="input-white">
            <label className="text-base text-[#2F2B3DCC] font-medium">Password</label>
            <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password.' }]}>
              <Input.Password
                placeholder="Enter your password"
                className="border rounded-lg w-full ps-4 py-2"
                prefix={<Lock />}
                iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </Form.Item>
          </div>
          <div className="flex justify-center mt-8">
            <LoadableButton
              className="bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover  duration-500"
              type="Submit"
              lable="Submit"
              isLoading={isLoadingPassModal}
              loadingLable="Submitting..."
            />
          </div>
        </Form>
      </ModalComponent>

      {/* Update user modal */}
      <ModalComponent isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} title="Update User" width={1200}>
        <Form className="w-full" autoComplete="off" form={form} initialValues={initialValues} onFinish={handleEditSubmit} onFieldsChange={handleFieldsChange}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">First Name</label>
              <Form.Item name="firstName" rules={[{ required: true, message: "Please enter first name." }]}>
                <Input placeholder="First name" className="mt-1 w-full py-2" />
              </Form.Item>
            </div>
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">Last Name</label>
              <Form.Item name="lastName" rules={[{ required: true, message: "Please enter last name." }]}>
                <Input placeholder="Last name" className="mt-1 w-full py-2" />
              </Form.Item>
            </div>
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">Primary Email</label>
              <Form.Item name="email" rules={[{ required: true, type: "email", message: "Please enter valid email.", },]}>
                <Input disabled placeholder="Primary email" className="mt-1 w-full py-2" />
              </Form.Item>
            </div>
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">Phone No.</label>
              <Form.Item name="phoneNo" rules={[{ required: true, message: "Please enter valid phone number.", }]}>
                <Input type="number" placeholder="Phone no." className="mt-1 w-full py-2" />
              </Form.Item>
            </div>
            <div className="ant-select-selector-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">Country</label>
              <Form.Item name="countryId">
                <Select disabled showSearch placeholder="Select a country" className="w-full mt-1" filterOption={filterOption} options={countries} />
              </Form.Item>
            </div>
            <div className="ant-select-selector-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">Role</label>
              <Form.Item name="roleId" rules={[{ required: true, message: "Please select a role." }]}>
                <Select placeholder="Select a role" className="w-full mt-1" options={[{ value: "2", label: "teacher" }, { value: "4", label: "IB" },]} />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <LoadableButton
              className="bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover  duration-500"
              disabled={!isFormChanged || isEditteacherLoading}
              type="Submit"
              lable="Update"
              isLoading={isEditteacherLoading}
              loadingLable="Updating teacher..."
            />
          </div>
        </Form>
      </ModalComponent>

      {/* Assign rules modal */}
      <ModalComponent isOpen={isOpenRuleListModal} setIsOpen={setIsOpenRuleListModal} title="Assign new rules" width={1200}>
        {
          isLoadingRuleListModal ? (
            <div className="flex justify-center flex-col my-[10%]">
              <Spin size="large" />
              <p className="primary text-center mt-2">Loading...</p>
            </div>
          ) : (
            <div>
             
              <div className="mt-5 flex justify-end">
                <LoadableButton type='button' onClick={assignUserRule} className='bg-primary text-sm text-white font-medium rounded-lg px-8 py-2 themeHover duration-500' lable='Assign' disabled={selectedRowKeys.length == 0} isLoading={isRuleAssignLoading} loadingLable='Assigning rule...' />
              </div>
            </div>
          )
        }
      </ModalComponent>


      <SendCredentials isOpenModal={isOpenModalnew} setIsOpenModal={setIsOpenModalnew} id={id} />
      <SendNotification isNotification={isNotification} setIsNotification={setIsNotification} id={id} />
      <ChangePassword changePasswor={changePassword} setChangePassword={setChangePassword} id={id} />
      <UploadDocument isDocuments={documents} setIsDocuments={setDocuments} id={id} /> 
    </div >
  );
}
