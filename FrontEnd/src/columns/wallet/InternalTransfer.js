import moment from "moment";
const defaultRender = (value) => (value ? value : '--');
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: defaultRender,
        sorter: (a, b) => {
            const nameA = `${a?.firstName ?? ''} ${a?.lastName ?? ''}`.trim();
            const nameB = `${b?.firstName ?? ''} ${b?.lastName ?? ''}`.trim();
            return nameA.localeCompare(nameB);
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email - b.email,
    },
    {
        title: 'Phone No.',
        dataIndex: 'phoneNo',
    },
    {
        title: 'From',
        dataIndex: 'paymentFrom',
        sorter: (a, b) => a.paymentFrom - b.paymentFrom,
    },
    {
        title: 'To',
        dataIndex: 'paymentTo',
        sorter: (a, b) => a.paymentTo - b.paymentTo,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Transaction Date',
        dataIndex: 'transactionDate',
        render: defaultRender,
        sorter: (a, b) => a.transactionDate - b.transactionDate,
    },
    {
        title: 'Status',
        dataIndex: 'status',
    }

];

export default columns;