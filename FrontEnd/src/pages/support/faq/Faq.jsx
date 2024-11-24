import React, { useState, useEffect } from "react";
import { Select, Input, Switch, Form } from "antd";
import columns from "../../../columns/support/Faq.js";
import TableWithSkeleton from "../../../components/global/table/TableWithSkeleton.jsx";
import Pagination from '../../../components/global/pagination/Pagination.jsx';
import ModalComponent from "../../../components/global/modal/ModalComponent";
import Segmented from '../../../components/segmented/Segmented.jsx';
import { GetAllfaqApi, FaqStatusApi, GetAllfaqByIdApi, DeleteFaqApi, AddFaqApi, GetAllContriensApi,UpdateFaqApi } from "../../../api/request/faq.js";
import ConfirmationModal from "../../../components/global/modal/ConfirmationModal.jsx";
import moment from "moment";
import toast from "react-hot-toast";
import Eye from "../../../assets/Eye.jsx";
import Edit from "../../../assets/Edit.jsx";
const { TextArea } = Input;

export default function Faq() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('Account');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalnew, setIsOpenModalnew] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isStatusConfirmationModal, setIsStatusConfirmationModal] = useState(false);
  const [isBannerStatusLoading, setIsBannerStatusLoading] = useState(false);
  const [isFaqLoading, setIsFaqLoading] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState({});
  const [faqDetails, setFaqDetails] = useState({});
  console.log(faqDetails,"faqDetails");
  const [selectedFaqId, setSelectedFaqId] = useState('');
  console.log(selectedFaqId,"selectedFaqId");
  const [deleteBannerModal, setDeleteFaqModal] = useState(false);
  const [isDelFaqLoading, setIsDelFaqLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({ question: '', answer: '', answer: '' })
  console.log(initialValues,"initialValues");
  const [formData, setFormData] = useState({ faQsCategoryId: '', faQsQuestionAnswers: '', answer: '' });
  const [bannerId, setBannerId] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [category, setCategory] = useState([]);


  const getAllFaq = async () => {
    try {
      let params = {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: value === "Meta teacher" ? "Metateacher" : value,

      }
      setIsLoading(true);
      const { data } = await GetAllfaqApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setData(
          data?.data[0]?.questions?.map((item) => {
            return {
              ...item,
              actions: (
                <div className="flex">
                  <button onClick={() =>{setSelectedFaqId(item?.questionId);updateFaqHandler(item)} }><Edit/></button>
                  <button type="button" onClick={() => { setSelectedFaqId(item?.questionId); setIsOpenModalnew(true) }} className="mx-3"><Eye/></button>
                  <button onClick={() => { setSelectedFaqId(item?.questionId); setDeleteFaqModal(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#D91819" className="w-6 h-6 cursor-pointer hover:stroke-[#aa0001] duration-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              ),
              createdDate: item?.createdDate ? moment(item?.createdDate).format('DD-MM-YYYY, hh:mm A') : null,
              status: (<Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                checked={item?.isActive}
                onChange={(checked) => {
                  setSelectedFaq(item);
                  handleStatusChange(checked);
                }}
              />
              ),
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

  const getContriens = async () => {
    try {
      const { data } = await GetAllContriensApi();
      if (data?.success) {
        setCategory(data?.data?.map((item) => ({ ...item, value: item?.id, label: item?.categoryName })));
      }
    } catch (error) { }
  }

  


  const bannerStatusHandler = async () => {
    try {
      setIsBannerStatusLoading(true);

      let params = {
        questionId: selectedFaq?.questionId,
        status: !selectedFaq?.isActive,
      };
      const { data } = await FaqStatusApi(params);
      if (data?.success) {
        toast.success(data?.message);
        setIsStatusConfirmationModal(false);
        getAllFaq();
      }
      setIsBannerStatusLoading(false);
    } catch (err) {
      setIsBannerStatusLoading(false);
    }
  }

  const updateFaqHandler = (banner) => {
    console.log(banner, "banner");
    setBannerId(banner?.bannerId)
    setSwitchValue(banner?.isActive)
    setIsOpenModal(true);
    setInitialValues({
      faQsCategoryId: banner?.categoryName,
      faQsQuestionName: banner?.question,
      faQsQuestionAnswers: banner?.answer,
      questionId:banner?.questionId,

    });
    form.setFieldsValue({
      faQsCategoryId: banner?.categoryName,
      faQsQuestionName: banner?.question,
      faQsQuestionAnswers: banner?.answer,
      questionId:banner?.questionId,
    });
  }


  const handleStatusChange = (checked) => {
    setIsStatusConfirmationModal(true);
  };

  const getFaqById = async () => {
    try {
      const { data } = await GetAllfaqByIdApi(selectedFaqId);
      setFaqDetails(data?.data);
    } catch (error) { }
  }

  useEffect(() => {
    if (selectedFaqId) {
      getFaqById();
    }
  }, [selectedFaqId]);

  const deleteFaqHandler = async () => {
    try {
      setIsDelFaqLoading(true);
      const { data } = await DeleteFaqApi(selectedFaqId);
      if (data?.success) {
        toast.success(data?.message);
        setDeleteFaqModal(false);
        getAllFaq();
      }
      setIsDelFaqLoading(false);
    } catch (err) {
      setIsDelFaqLoading(false);
    }
  }




  useEffect(() => {
    getAllFaq()
  }, [page, pageSize, filter, value]);

  useEffect(() => {
    getContriens()
  }, []);

  const handleChange = () => { }



  const handleSubmit = async (values) => {
    setIsFaqLoading(true);

    let params = {
      ...values,
      isActive: switchValue,
    };

    try {
      if (!initialValues?.questionId) {
        const { data } = await AddFaqApi(params);
        if (data?.success) {
          setFormData({ faQsQuestionName: '', faQsQuestionAnswers: '', faQsCategoryId: '' });
          toast.success(data?.message);
          setIsOpenModal(false);
          getAllFaq();
        }
      } else {
        params.faQsCategoryId = initialValues?.questionId;
        const { data } = await UpdateFaqApi(params);
        if (data?.success) {
          setFormData({ faQsQuestionName: '', faQsQuestionAnswers: '', faQsCategoryId: '' });
          toast.success(data?.message);
          setIsOpenModal(false);
          getAllFaq();
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || 'An error occurred');
    } finally {
      setIsFaqLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="ant-select-selector-white">
          <Segmented options={['Account', 'Deposit', 'Client', 'Meta teacher', 'Withdrawal']} value={value} setValue={setValue} />
        </div>


        <div>
          <button onClick={() => setIsOpenModal(true)} className="flex items-center bg-primary text-sm text-white font-semibold px-6 py-2 rounded-lg themeHover  duration-500">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.85714 9.14286H0V6.85714H6.85714V0H9.14286V6.85714H16V9.14286H9.14286V16H6.85714V9.14286Z" fill="white" />
            </svg>
            Add FAQ
          </button>
        </div>
      </div>

      <div className="border-[2px] border-[var(--theme-light)] rounded-xl pt-4 lg:pt-6 w-full mt-5">
        <div className="px-4 lg:px-6">
          <p className="text-[#2F2B3D] text-xl font-semibold">{value}</p>
        </div>
        <div className="my-6">
          <TableWithSkeleton columns={columns} data={data} loading={isLoading} />
          <Pagination total={totalRecord} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
        </div>
      </div>

      {/* ---- Status confirmation modal ---- */}
      <ConfirmationModal
        isOpen={isStatusConfirmationModal}
        setIsOpen={setIsStatusConfirmationModal}
        message={`Are you sure you want to ${selectedFaq?.isActive ? 'inactive' : 'active'} this Faq?`}
        onConfirm={bannerStatusHandler}
        isLoading={isBannerStatusLoading}
        loadingLabel='Changing status...'
      />

      {/* ---- Delete Faq modal ---- */}
      <ConfirmationModal
        isOpen={deleteBannerModal}
        setIsOpen={setDeleteFaqModal}
        message='Are you sure you want to remove this Faq?'
        onConfirm={deleteFaqHandler}
        isLoading={isDelFaqLoading}
        loadingLabel='Deleting banner...'
      />

      {/* ---- faq Information ---- */}
      <ModalComponent isOpen={isOpenModalnew} setIsOpen={setIsOpenModalnew} title='Faq Information' width={1300}>
        <div className="lg:px-4 lg:pt-4">
          <div className="border border-primary rounded-lg md:py-8 p-4">
            <div className='grid grid-cols-1'>
              <div className='grid '>
                <p className='text-xl primary font-semibold  mt-2'>1 Question:-</p>
                <p className='text-xl primary font-semibold mt-2'>{faqDetails?.question || '--'}</p>
              </div>
              <div className='grid '>
                <p className='text-xl primary font-semibold  mt-2'>Answer:-</p>

                <p
                  className="text-base font-normal pb-2 border-b-2 border-primary"
                  dangerouslySetInnerHTML={{
                    __html:
                      faqDetails.answer,
                  }}>

                </p>

              </div>

            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-[#8D5AE2] mt-5 sm:mt-8'>
              <div className='grid sm:grid-cols-2 sm:divide-x divide-[#8D5AE2] mt-8 lg:mt-0'>
                <div>
                  <div className='flex justify-center'>
                    <p className='text-base font-normal text-center pb-2 border-b-2 border-primary'>Category Name</p>
                  </div>
                  <p className='text-xl primary font-semibold text-center mt-2'>{faqDetails?.categoryName || '--'}</p>
                </div>
                <div className="mt-8 sm:mt-0">
                  <div className='flex justify-center'>
                    <p className='text-base font-normal text-center pb-2 border-b-2 border-primary'>Created Time</p>
                  </div>
                  <p className='text-xl primary font-semibold text-center mt-2'>{faqDetails?.createdDate ? moment(faqDetails?.createdDate).format('DD-MM-YYYY, hh:mm A') : '--'}</p>
                </div>
              </div>
              <div className='grid sm:grid-cols-2 sm:divide-x divide-[#8D5AE2]'>
                <div>
                  <div className='flex justify-center'>
                    <p className='text-base font-normal text-center pb-2 border-b-2 border-primary'>Is Active</p>
                  </div>
                  <p className='text-xl primary font-semibold text-center mt-2'>{faqDetails?.isActive === true ? 'Yes' : 'NO'}</p>
                </div>

              </div>
            </div>



          </div>
        </div>
      </ModalComponent>

      {/* ---- Add Faq modal ---- */}
      <ModalComponent isOpen={isOpenModal} setIsOpen={setIsOpenModal} title="Add Faq" width={1200}>
        <Form className='w-full' autoComplete="off" form={form} initialValues={initialValues} onFinish={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <div className='ant-select-selector-white'>
                <label className='text-base text-[#2F2B3DCC] font-medium'>Category</label>
                <Form.Item name="faQsCategoryId" rules={[{ required: true, message: 'Please select category.' }]}>
                  <Select
                    placeholder='Select category'
                    className='w-full mt-1'
                    onChange={handleChange}
                    options={category}
                    value={initialValues.faQsCategoryId}
                  />
                </Form.Item>
              </div>
              <div className='input-white mt-5'>
                <label className='text-base text-[#2F2B3DCC] font-medium'>Question</label>
                <Form.Item name="faQsQuestionName" rules={[{ required: true, message: 'Please enter question.' }]}>
                  <Input
                    placeholder="Question"
                    className="border mt-1 border-primary w-full ps-4 py-2"
                    onChange={handleChange}
                    value={initialValues.question}
                  />
                </Form.Item>
              </div>
            </div>
            <div className='input-white sm:row-span-2'>
              <label className='text-base text-[#2F2B3DCC] font-medium'>Answer</label>
              <Form.Item name="faQsQuestionAnswers" rules={[{ required: true, message: 'Please enter answer.' }]}>
                <TextArea
                  className="mt-1"
                  onChange={handleChange}
                  placeholder="Answer..."
                  autoSize={{ minRows: 5, maxRows: 8 }}
                  value={initialValues.faQsQuestionAnswers}
                />
              </Form.Item>
            </div>
          </div>
          <div className='flex justify-between items-center gap-5 flex-wrap mt-6'>
            <div className="flex items-center gap-3">
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                onChange={setSwitchValue}
                checked={switchValue}
              />
            </div>
            <div className="flex gap-5">
              <button type='button' onClick={() => setIsOpenModal(false)} className='bg-primary text-sm text-white font-semibold rounded-lg px-6 py-2 uppercase themeHover duration-500'>Cancel</button>
              <button type='submit' className='bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover duration-500'>Submit</button>
            </div>
          </div>
        </Form>
      </ModalComponent>
    </div>
  )
}