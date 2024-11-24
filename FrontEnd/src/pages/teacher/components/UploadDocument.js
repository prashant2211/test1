
import React, { useState } from 'react'
import { Form, Upload, Image } from "antd";
import ModalComponent from "../../../components/global/modal/ModalComponent";
import toast from "react-hot-toast";
import { UplodeDocumentApi } from "../../../api/request/teacher.js";
import LoadableButton from "../../../components/buttons/LoadableButton.jsx";

function UploadDocument({ isDocuments, setIsDocuments, id }) {
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({ UploadBanner: [] });
    const [isBannerLoading, setIsBannerLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const getBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        if (newFileList.length > 5) {
            toast.error("You can only upload up to 5 documents.");
            return;
        }
        setFileList(newFileList);
        form.setFieldsValue({ UploadDocuments: newFileList });
    };

    const beforeUpload = (file) => {
        if (fileList.length + 1 > 5) {
            toast.error("You can only upload up to 5 documents.");
            return false; // Prevent upload
        }
        return true; // Allow upload
    };

    const UploadButton = (
        <button type="button">
          <div className="flex justify-center"><img src="../assets/icons/Upload_Document_icon.svg" alt="icon" /></div>
          Upload
        </button>
    );

    const handleSubmit = async (values) => {
        console.log(values,"values");

        const extractOriginFileObjs = (fileArray) => {
          return fileArray.map(file => file.originFileObj);
        };
        try {
          setIsBannerLoading(true);
          let formData = new FormData();

          extractOriginFileObjs(values?.UploadDocuments)?.forEach((file) => {
            formData.append("UploadDocuments", file);
          });
         
          let apiHeader = { headers: { Accept: "application/json", "Content-Type": "multipart/form-data" } };
          const { data } = await UplodeDocumentApi(formData, apiHeader);
          if (data?.success) {
            setFileList([]);
            toast.success(data?.message);
          }
          setIsBannerLoading(false);
        } catch (error) {
          toast.error(error?.response?.data?.error?.message);
          setIsBannerLoading(false);
        }
    };

    return (
        <div>
            <ModalComponent isOpen={isDocuments} setIsOpen={setIsDocuments} title="Upload Documents" width={800}>
                <Form className='w-full' autoComplete="off" form={form} initialValues={initialValues} onFinish={handleSubmit}>
                    <div className="mt-4">
                        <label className='text-base text-[#2F2B3DCC] font-medium'>Upload teacher documents</label>
                        <Form.Item name="UploadDocuments" rules={[{ required: true, message: 'Please upload documents.' }]}>
                            <Upload
                                className="mt-1"
                                beforeUpload={beforeUpload}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                multiple // Enable multiple document selection
                            >
                                {fileList.length >= 5 ? null : UploadButton}
                            </Upload>
                        </Form.Item>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </div>
                    <div className='flex justify-end items-center gap-5 mt-8'>
                        <div className="flex gap-5">
                            <button type='button' disabled={isBannerLoading} onClick={() => setIsDocuments(false)} className='bg-primary text-sm text-white font-semibold rounded-lg px-6 py-2 uppercase themeHover duration-500'>Cancel</button>
                            <LoadableButton
                                className='bg-primary text-sm text-white font-semibold rounded-lg px-12 py-2 uppercase themeHover duration-500'
                                disabled={isBannerLoading}
                                type="Submit"
                                lable={'Submit'}
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

export default UploadDocument;

