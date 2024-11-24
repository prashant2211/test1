import React, { useState, useEffect } from "react";
import { Select, Input } from "antd";
import columns from "../../../columns/support/Ticket.js";
import Pagination from "../../../components/global/pagination/Pagination.jsx";
import TableWithSkeleton from "../../../components/global/table/TableWithSkeleton.jsx";
import { GetAllTicketApi } from "../../../api/request/ticket.js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Eye from "../../../assets/Eye.jsx";
import StatisticsCard from "../../../components/global/cards/StatisticsCardCard.jsx";

export default function Ticket() {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [userTypeSelectorOptions, setUserTypeSelectorOptions] = useState([{ value: "all", label: "All", }, { value: "IB", label: "IB", }, { value: "User", label: "User", }]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All Tickets');
  const [totalRecord, setTotalRecord] = useState(0);
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [ticketFilter, setTicketFilter] = useState([
    { title: 'All Tickets', count: '180', value: '' },
    { title: 'Open Tickets', count: '150', value: 'open' },
    { title: 'High Priority Tickets', count: '120', value: 'high' },
    { title: 'This Month Tickets', count: '90', value: 'thismonth' },
    { title: 'Unassigned Tickets', count: '30', value: 'unassigned' },
    { title: 'Closed Tickets', count: '30', value: 'close' },
  ]);

  useEffect(() => {
    if (searchParams?.get("filter")?.trim()) {
      setFilter(searchParams?.get("filter")?.trim());
    }
  }, []);

  useEffect(() => {
    setSearchParams(`filter=${filter?.toString()}`);
  }, [filter]);


  const handleChange = (selectedOption) => {
    setSelectedUserType(selectedOption);
  }

  const getColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#ef6464';
      case 'Medium':
        return '#e7c553';
      case 'Low':
        return '#2d9b63';
    }
  }

  const getAllTicket = async () => {
    try {
      let params = {
        PageNumber: page,
        PageSize: pageSize,
        filterByCategory: filter,
        searchKeyword: searchText,
        ticketUserType: selectedUserType
      }
      setIsLoading(true);
      const { data } = await GetAllTicketApi(new URLSearchParams(params).toString());
      if (data?.success) {
        setData(
          data?.data?.map((item) => {
            return {
              ...item,
              name: `${item?.firstName} ${item?.lastName}`,
              status: (item?.status == 'open' ? (<p className='uppercase font-bold text-[#ef6464] text-sm'>{item?.status}</p>) : (<p className='uppercase font-bold text-[#2D9B63] text-sm'>{item?.status}</p>)),
              actions: (<button type="button" onClick={() => navigate(`/view_ticket/${item?.ticketId}`)}><Eye /></button>),
              priority: (<p className='uppercase font-bold text-sm' style={{ color: getColor(item?.priority) }}>{item?.priority}</p>),
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

  useEffect(() => {
    getAllTicket();
  }, [page, pageSize, searchText, filter, selectedUserType]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {
          ticketFilter?.map((item, index) => (
            <div key={index} onClick={() => setFilter(item?.title)}>
              <StatisticsCard title={item?.title} value={item?.count} secondary={index % 2 != 0} active={filter == item?.title} />
            </div>
          ))
        }
      </div>
      <div className="flex justify-end mt-5">
        <div className="flex items-center flex-wrap gap-5">
          <div>
            <Input
              size="large"
              style={{ width: 220 }}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={() => setSearchText(search)}
              prefix={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                </svg>
              }
              suffix={search &&
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setSearchText(''); setSearch('') }} viewBox="0 0 24 24" fill="#bebebe" className="size-5 cursor-pointer duration-300 hover:fill-[#969595]">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                </svg>
              }

            />
          </div>
          <div className='ant-select-selector-white'>
            <Select
              className="w-[180px] -mt-2"
              placeholder="Select user type"
              options={userTypeSelectorOptions}
              onChange={handleChange}
              value={selectedUserType}
            />
          </div>
        </div>
      </div>

      <div className="border-[2px] border-light rounded-xl pt-4 lg:pt-6 w-full mt-7">
        <div className="px-4 lg:px-6">
          <p className="text-[#2F2B3D] text-xl font-semibold">
            Ticket
          </p>
        </div>
        <div className="my-6">
          <TableWithSkeleton columns={columns} data={data} loading={isLoading} />
          <Pagination total={totalRecord} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
        </div>

      </div>
    </div>
  );
}
