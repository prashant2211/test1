const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a?.name?.localeCompare(b?.name),
  },
  {
    title: "Rule Type",
    dataIndex: "ruleTypeName",
    sorter: (a, b) => a?.ruleTypeName?.localeCompare(b?.ruleTypeName),
  },
  {
    title: "Level",
    dataIndex: "level",
    sorter: (a, b) => a?.level?.localeCompare(b?.level),
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a?.description?.localeCompare(b?.description),
  },
  {
    title: 'Maximum',
    dataIndex: 'condition1',
    sorter: (a, b) => a.condition1 - b.condition1,
  },
  {
    title: 'Minimum',
    dataIndex: 'condition2',
    sorter: (a, b) => a.condition2 - b.condition2,
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

export default columns;
