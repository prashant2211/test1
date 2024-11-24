import React, { useState, useEffect } from "react";
import { Form, Select, Input, Upload, Image } from "antd";
import columns from "../../columns/Banner.js";
import Pagination from "../../components/global/pagination/Pagination.jsx";
import ModalComponent from "../../components/global/modal/ModalComponent.jsx";
import ConfirmationModal from "../../components/global/modal/ConfirmationModal.jsx";
import TableWithSkeleton from "../../components/global/table/TableWithSkeleton.jsx";
import toast from "react-hot-toast";
import { AddUpdateBannerApi, BannerStatusApi, DeleteBannerApi, GetAllBannersApi, UpdateBannerApi } from "../../api/request/banner.js";
import LoadableButton from "../../components/buttons/LoadableButton.jsx";
import moment from "moment/moment.js";
import { useSearchParams } from "react-router-dom";
import { Switch } from 'antd';
import Edit from "../../assets/Edit.jsx";
const { TextArea } = Input;
const { Dragger } = Upload;

export default function Kyc() {

  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState([]);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Banner');
  const [isLoading, setIsLoading] = useState(false);
  const [isBannerLoading, setIsBannerLoading] = useState(false);
  const [isDelBannerLoading, setIsDelBannerLoading] = useState(false);
  const [isBannerStatusLoading, setIsBannerStatusLoading] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({});
  const [deleteBannerModal, setDeleteBannerModal] = useState(false);
  const [isStatusConfirmationModal, setIsStatusConfirmationModal] = useState(false);
  const [bannerOptions, setBannerOption] = useState([{ value: 'user', label: 'User' }, { value: 'ibuser', label: 'IB User' }, { value: 'promotionkit', label: 'Promotion Kit' }]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ bannertype: '', BannerCaption: '', BannerViewType: '' });
  const [initialValues, setInitialValues] = useState({ bannertype: null, BannerCaption: '', BannerViewType: null })
  const [isUpdate, setIsUpdate] = useState(false);
  const [bannerId, setBannerId] = useState('');
  const [Activebanner, setIsActive] = useState('');

  const props = {
    name: "file",
    multiple: false,
    action: "",
    fileList,
    onChange(info) {
      const { status } = info?.file;
      setFileList(info.fileList);
      if (status !== "uploading") {
        if (info?.fileList[0]) {
          setFile(URL.createObjectURL(info?.file));
          setUploadedFile(info.file);
        } else {
          setFile("")
          setUploadedFile("");
        }
      }
      if (status === "done") {
        toast.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
      }
      console.log("Uploaded File:", info.file);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload: () => false,
    accept: ".jpg,.jpeg,.png,.pdf"
  };

  const filterHandler = (value) => {
    setFilter(value);
    setSearchParams(`filter=${value.toString()}`);
  }

  const statusHandler = (item) => {
    setSelectedBanner(item);
    setIsStatusConfirmationModal(true);
  }

  const getAllBanners = async () => {
    try {
      let params = {
        PageNumber: page,
        PageSize: pageSize,
        SearchText: searchText,
        FilterText: filter
      }
      setIsLoading(true);
      const { data } = await GetAllBannersApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setData(
          data?.data?.map((item) => {
            return {

              ...item,

              bannerUrl: (<div className="h-[60px] w-[60px]">
                <Image src={item?.bannerUrl} fallback='assets/images/banner-placeholder.png' className="object-cover w-full h-full" alt="img" />
              </div>),

              actions: (
                <div className="flex">
                  <button onClick={() => updateBannerHandler(item)} className="mr-3 ml-3" button><Edit /></button>
                  <button onClick={() => { setSelectedBanner(item); setDeleteBannerModal(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#D91819" className="w-6 h-6 cursor-pointer hover:stroke-[#aa0001] duration-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              ),
              createdDate: item?.createdDate ? moment(item?.createdDate).format('DD-MM-YYYY, hh:mm A') : null,
              status: <Switch onChange={() => statusHandler(item)} checkedChildren="Active" unCheckedChildren="Inactive" checked={item?.status == 'Active' ? true : false} />,
            };
          })
        );
        setTotalRecord(data?.totalRecords);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllBanners();
  }, [page, pageSize, searchText, filter]);

  useEffect(() => {
    const trimmedCsv = (searchParams?.get('filter'))?.trim();
    if (trimmedCsv) {
      const newArray = trimmedCsv.split(',').map(item => item.trim());
      setFilter(newArray);
    }
  }, []);


  const updateBannerHandler = (banner) => {
    setModalTitle('Update Banner');
    setBannerId(banner?.bannerId);
    setIsActive(banner?.isActive);
    setIsUpdate(true);
    setSelectedBanner(banner);
    setIsBannerModalOpen(true);
    form.setFieldsValue({
      bannertype: banner?.bannerType,
      BannerCaption: banner?.bannerCaption,
      BannerViewType: banner?.bannerViewType,
      UploadBanner: banner?.bannerUrl
    });
    setFile(banner?.bannerUrl);
  };

  const addBannereHandler = () => {
    setModalTitle('Add Modal');
    setIsUpdate(false);
    setIsBannerModalOpen(true);
  }

  const handleSubmit = async (values) => {
    if (uploadedFile === null && !isUpdate) {
      toast.error('Please add banner.')
      return;
    }
    if (!bannerId) {
      try {
        setIsBannerLoading(true);
        let params = {
          id: selectedBanner?.id,
          ...values,
          PlatformId: '1',
          UploadBanner: uploadedFile,
        };
        if (!isUpdate) {
          delete params.id;
        }
        if (!uploadedFile) {
          delete params.BannerFile;
        }
        let apiHeader = { headers: { Accept: "application/json", "Content-Type": "multipart/form-data" } };
        const { data } = await AddUpdateBannerApi(params, apiHeader);
        if (data?.success) {
          setFile(null);
          setUploadedFile(null);
          setFileList([]);
          setFormData({ bannertype: '', BannerCaption: '', BannerViewType: '', UploadBanner: '' });
          toast.success(data?.message);
        }
        setIsBannerLoading(false);
        setIsBannerModalOpen(false);
        getAllBanners();
      } catch (error) {
        toast.error(error?.response?.data?.error?.message);
        setIsBannerLoading(false);
      }
    } else {
      if (uploadedFile === null) {
        toast.error('Please add banner.')
        return;
      }
      try {
        setIsBannerLoading(true);
        let params = {
          BannerId: bannerId,
          ...values,
          UploadBanner: uploadedFile,
          isActive: Activebanner
        };
        if (!isUpdate) {
          delete params.id;
        }
        if (!uploadedFile) {
          delete params.BannerFile;
        }
        let apiHeader = { headers: { Accept: "application/json", "Content-Type": "multipart/form-data" } };
        const { data } = await UpdateBannerApi(params, apiHeader);
        if (data?.success) {
          setFile(null);
          setUploadedFile(null);
          setFileList([]);
          setBannerId("")
          setFormData({ bannertype: '', BannerCaption: '', BannerViewType: '' });
          toast.success(data?.message);
        }
        setIsBannerLoading(false);
        setIsBannerModalOpen(false);
        getAllBanners();
      } catch (error) {
        toast.error(error?.response?.data?.error?.message);
        setIsBannerLoading(false);
      }
    }
  }

  useEffect(() => {
    if (!isBannerModalOpen) {
      setFile(null);
      setUploadedFile(null);
      setFileList([]);
      form.setFieldValue();
    }
  }, [isBannerModalOpen])



  const bannerStatusHandler = async () => {
    try {
      setIsBannerStatusLoading(true);

      let params = {
        bannerId: selectedBanner?.bannerId,
        status: selectedBanner?.status == 'Active' ? false : true
      };
      const { data } = await BannerStatusApi(params);
      if (data?.success) {
        toast.success(data?.message);
        setIsStatusConfirmationModal(false);
        getAllBanners();
      }
      setIsBannerStatusLoading(false);
    } catch (err) {
      setIsBannerStatusLoading(false);
    }
  }

  const deleteBannerHandler = async () => {
    try {
      setIsDelBannerLoading(true);
      const { data } = await DeleteBannerApi(selectedBanner?.bannerId);
      if (data?.success) {
        toast.success(data?.message);
        setDeleteBannerModal(false);
        getAllBanners();
      }
      setIsDelBannerLoading(false);
    } catch (err) {
      setIsDelBannerLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between item-center flex-wrap gap-5">
        <div className="ant-select-selector-white ant-multi-select-selector">
          <Select
            mode="multiple"
            className="w-[320px]"
            placeholder="Select options"
            value={filter}
            options={bannerOptions}
            onChange={(value) => filterHandler(value)}
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
              </svg>
            }
            suffix={search &&
              <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setSearchText(''); setSearch('') }} viewBox="0 0 24 24" fill="#bebebe" className="size-5 cursor-pointer duration-300 hover:fill-[#969595]">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
              </svg>
            }
          />
          <button onClick={addBannereHandler} className="flex items-center bg-primary text-sm text-white font-semibold px-4 py-2 rounded-lg themeHover  duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
            </svg>
            Add Banner
          </button>
        </div>
      </div>

      <div className="border-[2px] border-[var(--theme-light)] rounded-xl pt-4 lg:pt-6 w-full mt-5">
        <div className="px-4 lg:px-6">
          <p className="text-[#2F2B3D] text-xl font-semibold">Banners</p>
        </div>
        <div className="my-6">
          <TableWithSkeleton columns={columns} data={data} loading={isLoading} />
          <Pagination total={totalRecord} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} />
        </div>
      </div>

      {/* ---- Status confirmation modal ---- */}
      <ConfirmationModal
        isOpen={isStatusConfirmationModal}
        setIsOpen={setIsStatusConfirmationModal}
        message={`Are you sure you want to ${selectedBanner?.status == 'Active' ? 'inactive' : 'active'} this banner?`}
        onConfirm={bannerStatusHandler}
        isLoading={isBannerStatusLoading}
        loadingLabel='Changing status...'
      />

      {/* ---- Delete banner modal ---- */}
      <ConfirmationModal
        isOpen={deleteBannerModal}
        setIsOpen={setDeleteBannerModal}
        message='Are you sure you want to remove this banner?'
        onConfirm={deleteBannerHandler}
        isLoading={isDelBannerLoading}
        loadingLabel='Deleting banner...'
      />

      {/* ---- Add Banner Modal ---- */}
      <ModalComponent isOpen={isBannerModalOpen} setIsOpen={setIsBannerModalOpen} title={modalTitle} width={1200}>
        <Form className='w-full' autoComplete="off" form={form} initialValues={initialValues} onFinish={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className='ant-select-selector-white'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Banner Type</label>
              <Form.Item name="bannertype" rules={[{ required: true, message: 'Please select banner type.' }]}>
                <Select placeholder='Select banner type' value={initialValues.bannertype} className='w-full mt-1' options={[{ value: 'user', label: 'User' }, { value: 'ibuser', label: 'IB User' }, { value: 'promotionkit', label: 'Promotion Kit' }]} />
              </Form.Item>
            </div>
            <div className='ant-select-selector-white'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Banner View Type</label>
              <Form.Item name="BannerViewType" rules={[{ required: true, message: 'Please select banner view type.' }]}>
                <Select placeholder='Select banner view type' className='w-full mt-1' options={[{ value: 'web', label: 'Web' }, { value: 'mobile', label: 'Mobile' }]} value={initialValues.BannerViewType} />
              </Form.Item>
            </div>
          </div>
          <div className="md:flex gap-5 mt-5">
            <div className='input-white md:w-1/3'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Banner Caption</label>
              <Form.Item name="BannerCaption" rules={[{ required: true, message: 'Please enter banner caption.' }]}>
                <TextArea className="mt-1" placeholder="Banner caption..." autoSize={{ minRows: 8, maxRows: 100 }} value={initialValues.BannerCaption} />
              </Form.Item>
            </div>
            <div className="mb-8 white-ant-upload-drag md:w-1/3 md:mt-0 mt-4">
              <label className="text-base text-[#2F2B3DCC] font-medium">Upload Banner</label>
              <Dragger name="file" {...props}>
                <div className="flex justify-center"><img src="assets/icons/Upload_Document_icon.svg" alt="icon" /></div>
                <p className="text-[#2F2B3DCC] text-lg font-medium mt-2">Upload Or Drop Here</p>
                <p className="text-[#2F2B3D99] text-base font-medium">JPEG,PNG,JPG Or PDF (Min Size. 100kb To Max Size. 5MB)</p>
              </Dragger>
            </div>
            <div className="md:w-1/3 my-auto mx-auto">
              {file && <Image height={200} src={file} />}
            </div>
          </div>
          <div className='flex justify-end items-center gap-5 mt-8'>
            <div className="flex gap-5">
              <button type='button' disabled={isBannerLoading} onClick={() => setIsBannerModalOpen(false)} className='bg-primary text-sm text-white font-semibold rounded-lg px-6 py-2 uppercase themeHover  duration-500'>Cancel</button>
              <LoadableButton
                className='bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover  duration-500'
                disabled={isBannerLoading}
                type="Submit"
                lable='Submit'
                isLoading={isBannerLoading}
                loadingLable='Adding banner...'
              />
            </div>
          </div>
        </Form>
      </ModalComponent>
    </div>
  );
}
