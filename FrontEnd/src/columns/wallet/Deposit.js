import moment from "moment";
const defaultRender = (value) => (value  ? value : '--');

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name - b.name,
    },
    {
        title: 'From',
        dataIndex: 'from',
        sorter: (a, b) => a.from - b.from,
    },
    {
        title: '	To',
        dataIndex: 'to',
        sorter: (a, b) => a.to - b.to,
    },
    {
        title: 'Transaction Type',
        dataIndex: 'type',
        sorter: (a, b) => a.type - b.type,
    },
    // {
    //     title: 'Account',
    //     dataIndex: 'account',
    //     sorter: (a, b) => a.account - b.account,
    // },
    {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Transaction Fee',
        dataIndex: 'commission',
        sorter: (a, b) => a.commission - b.commission,
    },
    {
        title: 'Transaction Date',
        dataIndex: 'createdDate',
        render: defaultRender,
        sorter: (a, b) => a.createdDate - b.createdDate,
    },
    {
        title: 'Status',
        dataIndex: 'status',
    }

];

export default columns;