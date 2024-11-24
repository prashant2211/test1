const columns = [
    {
        title: 'Account No.',
        dataIndex: 'login',
        sorter: (a, b) => a.login - b.login,
    },
    {
        title: 'Account Type',
        dataIndex: 'acType',
        sorter: (a, b) => a?.acType?.localeCompare(b?.acType),
    },
    {
        title: 'Platform Type',
        dataIndex: 'groupName',
        sorter: (a, b) => a?.groupName?.localeCompare(b?.groupName),
    },
    {
        title: 'Create Date',
        dataIndex: 'createdDate',
        sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
    },
];

export default columns;