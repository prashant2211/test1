import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Select, Input, Switch, DatePicker } from "antd";
import columns from "../../columns/Teacher.js";
import TableWithSkeleton from "../../components/global/table/TableWithSkeleton.jsx";
import ModalComponent from "../../components/global/modal/ModalComponent.jsx";
import LoadableButton from "../../components/buttons/LoadableButton.jsx";
import Pagination from "../../components/global/pagination/Pagination.jsx";
import { exportData } from "../../services/ExportHandler.js";
import { AddTeacherApi, GetAllteacherApi, UpdateUserStatusApi } from "../../api/request/teacher.js";
import Segmented from "../../components/segmented/Segmented.jsx";
import toast from "react-hot-toast";
import moment from "moment";
import Eye from "../../assets/Eye.jsx";
import ConfirmationModal from "../../components/global/modal/ConfirmationModal.jsx";
import stateDistricts from '../../assets/data/stateDistricts.jsx';
import subjects from "../../assets/data/subjects.jsx"
import experience from "../../assets/data/experience.jsx"

const { TextArea } = Input;
const { Option } = Select;

export default function Client() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [value, setValue] = useState("Active Teacher");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAddteacherLoading, setIsAddteacherLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [kycFilter, setKycFilter] = useState('');
  const [ftdFilter, setFtdFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);
  const [isStatusConfirmLoading, setIsStatusConfirmLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);


  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    countryId: null,
    role: null,
    referralCode: "",
    autoKyc: "",
  });


  const handleFilterChange = (pagination, filters, sorter) => {
    setKycFilter(filters.isKyc ? filters.isKyc[0] : null);
    setFtdFilter(filters.isDeposit ? filters.isDeposit[0] : null);
  };

  const statusChangeConfirm = async () => {
    try {
      setIsStatusConfirmLoading(true);
      let params = {
        teacherId: selectedUser?._id,
        status: !selectedUser?.Status,
      }

      const { data } = await UpdateUserStatusApi(params);
      if (data?.success) {
        getAllteacher();
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

  const joinStrings = (array) => {
    return array.filter(item => item).join(', ');
  }

  const getAllteacher = async () => {
    try {
      setIsLoading(true);
      let params = {
        PageNumber: page,
        PageSize: pageSize,
        status: value === "Inactive Teacher"
        ? "Inactive"
        : value === "Active Teacher"
          ? "Active"
          : value === "All Teacher"
            ? " "
            : value,
        SearchText: searchText
      };
      const { data } = await GetAllteacherApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setData(
          data?.data?.map((item) => {
            return {
              ...item,
              name: `${item?.First_Name} ${item?.Last_Name}`,
              joining_Date: (item?.joining_Date ? moment(item?.joining_Date).format("DD-MM-YYYY, hh:mm A") : null),
              actions: (<div className="flex justify-center"><button type="button" onClick={() => navigate(`/teacher/${item?._id}`)}><Eye /></button></div>),
              status: (<Switch onChange={() => statusHandler(item)} checkedChildren="Active" unCheckedChildren="Inactive" checked={item?.Status} />),
            };
          })
        );
        setTotalRecord(data?.totalRecords);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getAllteacher();
  }, [page, pageSize, searchText, ftdFilter, kycFilter, value]);

  useEffect(() => {
    setPage(1);
  }, [searchText, ftdFilter, kycFilter, value])

  useEffect(() => {
    if (searchParams?.get("filter")?.trim()) {
      setValue(searchParams?.get("filter")?.trim());
    }
  }, []);

  useEffect(() => {
    setSearchParams(`filter=${value?.toString()}`);
  }, [value]);

  useEffect(() => {
    form.resetFields();
  }, [isOpenModal]);

  const handleSubmit = async (value) => {
    try {
      setIsAddteacherLoading(true);
      const { data } = await AddTeacherApi(value);
      if (data?.success) {
        toast.success(data?.message);
        form.resetFields();
        getAllteacher();
        setIsAddteacherLoading(false);
        setIsOpenModal(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      setIsAddteacherLoading(false);
    }
  };

  const filterOption = (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const handleStateChange = (value) => {
    setSelectedState(value);
    setDistrictOptions(stateDistricts[value] || []);
  };

  const disabledDate = (current) => {
    return current && current > moment().startOf('day');
  };

  const exportHandler = async () => {
    try {
      setIsExportLoading(true);
      let params = {
        ApplyPagination: false,
      };
      const { data } = await GetAllteacherApi(
        new URLSearchParams(params).toString()
      );
      if (data?.success) {
        exportData(data?.data, "teachers");
      }
      setIsExportLoading(false);
    } catch (error) { }
  };

  return (
    <div className="max-w-full">
      <div className="flex justify-between flex-wrap gap-5">
        <div className="ant-select-selector-white ant-multi-select-selector">
          <Segmented
            options={[
              "Active Teacher",
              "Inactive Teacher",
              "All Teacher",
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
          <div className="flex items-center gap-4">
            <button
              className="flex items-center bg-primary text-sm text-white font-semibold px-4 py-2 rounded-lg themeHover  duration-500"
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Teacher
            </button>
            <LoadableButton
              className="bg-primary text-sm text-white font-semibold px-4 py-2 rounded-lg themeHover  duration-500"
              onClick={exportHandler}
              img={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
              disabled={isExportLoading}
              lable="Export"
              isLoading={isExportLoading}
              loadingLable="Exporting..."
            />
          </div>
        </div>
      </div>

      <div className="border-[2px] border-[var(--theme-light)] rounded-xl pt-4 lg:pt-6 w-full mt-5">
        <div className="px-4 lg:px-6">
          <p className="text-[#2F2B3D] text-xl font-semibold">{value}</p>
        </div>
        <div className="my-6">
          <TableWithSkeleton columns={[...columns]} data={data} loading={isLoading} onChange={handleFilterChange} />
          <Pagination total={totalRecord} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} />
        </div>
      </div>

      {/* ---- Add user modal ---- */}
      <ModalComponent
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        title="Add Teacher"
        width={1200}
      >
        <Form
          className="w-full"
          autoComplete="off"
          form={form}
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">
                First Name
              </label>
              <Form.Item
                name="First_Name"
                rules={[
                  { required: true, message: "Please enter first name." },
                ]}
              >
                <Input placeholder="First name" className="mt-1 w-full py-2" />
              </Form.Item>
            </div>
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">
                Last Name
              </label>
              <Form.Item
                name="Last_Name"
                rules={[{ required: true, message: "Please enter last name." }]}
              >
                <Input placeholder="Last name" className="mt-1 w-full py-2" />
              </Form.Item>
            </div>
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">
                Primary Email
              </label>
              <Form.Item
                name="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter valid email.",
                  },
                ]}
              >
                <Input
                  placeholder="Primary email"
                  className="mt-1 w-full py-2"
                />
              </Form.Item>
            </div>
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">
                Phone No.
              </label>
              <Form.Item
                name="Contact_Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter valid phone number.",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Phone no."
                  className="mt-1 w-full py-2"
                />
              </Form.Item>
            </div>
            <div className="ant-select-selector-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">
                Specialised Subject
              </label>
              <Form.Item
                name="Specialised_Subject"
                rules={[{ required: true, message: "Please select a Subject." }]}
              >
                <Select
                  placeholder="Select a Subject"
                  className="w-full mt-1"
                  options={subjects}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </div>

            <div className="ant-select-selector-white ant-multi-select-selector">
              <label className="text-base text-[#2F2B3DCC] font-medium">
                Comfortable Subjects
              </label>
              <Form.Item
                name="List_of_comfortable_Subject"
                rules={[{ required: true, message: "Please select at least one subject." }]}
              >
                <Select
                  placeholder="Select subjects"
                  className="w-full mt-1 custom-select"
                  options={subjects}
                  mode="multiple"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }

                />
              </Form.Item>
            </div>
            <div className="input-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">
                Qualification
              </label>
              <Form.Item
                name="Qualification"
                rules={[{ required: true, message: "Please enter Qualification." }]}
              >
                <Input placeholder="Qualification" className="mt-1 w-full py-2" />
              </Form.Item>
            </div>
            <div className='date-picker-white'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>DOB</label>
              <Form.Item name="DOB" rules={[{ required: true, message: 'Please select a DOB.' }]}>
                <DatePicker
                  className='w-full mt-1 py-2'
                  disabledDate={disabledDate}
                  placeholder='DD-MM-YYYY'
                  format='DD-MM-YYYY'
                />
              </Form.Item>
            </div>
            <div className='date-picker-white'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Date of joining</label>
              <Form.Item name="joining_Date" rules={[{ required: true, message: 'Please select a joining_Date.' }]}>
                <DatePicker
                  className='w-full mt-1 py-2'
                  disabledDate={disabledDate}
                  placeholder='DD-MM-YYYY'
                  format='DD-MM-YYYY'
                />
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


            <div className="ant-select-selector-white">
              <label className="text-base text-[#2F2B3DCC] font-medium">
                Number of experience
              </label>
              <Form.Item
                name="Experience"
                rules={[{ required: true, message: "Please enter experience." }]}
              >
                <Select
                  placeholder="Select a Experience"
                  className="w-full mt-1"
                  options={experience}
                />
              </Form.Item>
            </div>
          </div>
          <div className='input-white mt-3'>
            <label className='text-base text-[#2F2B3DCC] font-medium'>Address</label>
            <Form.Item name="Address" rules={[{ required: true, message: 'Please enter address.' }]}>
              <TextArea className="mt-1" placeholder="address" autoSize={{ minRows: 4, maxRows: 100 }} value={initialValues.BannerCaption} />
            </Form.Item>
          </div>

          <div className="flex justify-end mt-8">
            <LoadableButton
              className="bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover  duration-500"
              disabled={isAddteacherLoading}
              type="Submit"
              lable="Submit"
              isLoading={isAddteacherLoading}
              loadingLable="Adding teacher..."
            />
          </div>
        </Form>
      </ModalComponent>

      <ConfirmationModal
        isOpen={isStatusConfirmOpen}
        setIsOpen={setIsStatusConfirmOpen}
        message='Are you sure to change the teacher status?'
        onConfirm={statusChangeConfirm}
        isLoading={isStatusConfirmLoading}
        loadingLabel='Changing status...'
      />
    </div>
  );
}
