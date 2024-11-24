const defaultRender = (value) => (value ? value : '--');
const columns = [
  {
    title: 'Roles Name',
    dataIndex: 'name',
    render: defaultRender,
    sorter: (a, b) => a?.name?.localeCompare(b?.name),

  },
  {
    title: 'Created At',
    dataIndex: 'createdDate',
    render: defaultRender,
    sorter: (a, b) => ((new Date(a.createdDate)) - (new Date(b.createdDate))),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: defaultRender,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: defaultRender,
  }
];

export default columns;