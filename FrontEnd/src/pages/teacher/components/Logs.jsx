import React, { useEffect, useState } from 'react';
import columns from '../../../columns/UserLogs.js';
import TableWithSkeleton from '../../../components/global/table/TableWithSkeleton';
import Pagination from '../../../components/global/pagination/Pagination.jsx';
import { GetAlllogsApi} from "../../../api/request/teacher.js";
import moment from "moment";
import { useParams } from 'react-router-dom';



export default function Logs() {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalRecord, setTotalRecord] = useState(0);
    const [data, setData] = useState([]);
    const { id } = useParams();

    const getAllIB = async () => {
        try {
            let params = {
                PageNumber: page,
                PageSize: pageSize,
            }
            setIsLoading(true);
            const { data } = await GetAlllogsApi(id, new URLSearchParams(params).toString());
            if (data?.success) {
                setData(
                    data?.data?.map((item) => {
                        return {
                            ...item,
                            createdDate: moment(item?.dateTime).format('DD-MM-YYYY, hh:mm A'),
                        };
                    })
                );
                setTotalRecord(data?.totalItems);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllIB();
    }, [page, pageSize,]);

  
    return (
        <>
            <div className="border-[2px] border-[var(--theme-light)] rounded-xl pt-4 lg:pt-6 w-full mt-5">
                <div className="px-4 lg:px-6">
                    <p className="text-[#2F2B3D] text-xl font-semibold">User Logs</p>
                </div>
                <div className="my-6">
                    <TableWithSkeleton columns={columns} data={data} loading={isLoading} />
                    <Pagination total={totalRecord} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} />
                </div>
            </div>
        </>
    )
}

