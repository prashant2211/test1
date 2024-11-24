const defaultRender = (value) => (value ? value : '--');

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: defaultRender,
        sorter: (a, b) => {
            const nameA = `${a?.First_Name ?? ''} ${a?.Last_Name ?? ''}`.trim();
            const nameB = `${b?.First_Name ?? ''} ${b?.Last_Name ?? ''}`.trim();
            return nameA.localeCompare(nameB);
        },
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        render: defaultRender,
        sorter: (a, b) => a?.Email?.localeCompare(b?.Email),
    },
    {
        title: 'Mobile No',
        dataIndex: 'Contact_Number',
        render: defaultRender,
        sorter: (a, b) => a?.Contact_Number?.localeCompare(b?.Contact_Number),
    },
    {
        title: 'Qualification',
        dataIndex: 'Qualification',
        render: defaultRender,
    },

    {
        title: 'Joining Date',
        dataIndex: 'joining_Date',
        render: defaultRender,
        sorter: (a, b) => new Date(a.joining_Date) - new Date(b.joining_Date),
    },
    {
        title: 'Experience',
        dataIndex: 'Experience',
        render: defaultRender,
        sorter: (a, b) => a?.Experience?.localeCompare(b?.Experience),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: defaultRender,
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        fixed: "right"
    }
];

export default columns;