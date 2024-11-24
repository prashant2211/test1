
const defaultRender = (value) => (value ? value : '--');const columns = [
  {
    swapFreeIslamic: "YES",

    title: 'Name',
    dataIndex: 'name',

  },
  {
    title: 'Phone No',
    dataIndex: 'Contact_Number',

  },
  {
    title: 'Registration No',
    dataIndex: 'Registration_Number',

  },
  {
    title: 'Class',
    dataIndex: 'Class',
  },
  {
    title: 'Class Code',
    dataIndex: 'Class_Code',
  },
  {
    title: 'State',
    dataIndex: 'State',
  },
  {
    title: 'District',
    dataIndex: 'District',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: defaultRender,
},
  {
    title: 'Actions',
    dataIndex: 'actions',
  }

];

export default columns;


