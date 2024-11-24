const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name - b.name,
    },
    {
        title: 'Wallet Account No.',
        dataIndex: 'walletAccountNo',
        sorter: (a, b) => a.walletAccountNo - b. walletAccountNo,
    },
    {
        title: 'Wallet Balance',
        dataIndex: 'balance',
        sorter: (a, b) => a.balance - b.balance,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Wallet Address',
        dataIndex: 'address',
        sorter: (a, b) => a.address - b.address,
    },
    {
        title: 'Request Date',
        dataIndex: 'requestDate',
        sorter: (a, b) => a.requestDate - b.requestDate,
    },
    {
        title: 'Accepted Date',
        dataIndex: 'actionDate',
        sorter: (a, b) => a.actionDate - b.actionDate,
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
    }

];

export default columns;