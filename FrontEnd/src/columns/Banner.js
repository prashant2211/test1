import { Image } from "antd";
const defaultRender = (value) => (value  ? value : '--');
const columns = [
  {
    title: "Image",
    dataIndex: "bannerUrl",
    key: "bannerUrl",
    reder: defaultRender,    
    width: 100
  },
  {
    title: "Banner Caption",
    dataIndex: "bannerCaption",
    sorter: (a, b) => a?.bannerCaption?.localeCompare(b?.bannerCaption),
    width: 100
  },
  {
    title: "Banner Type",
    dataIndex: "bannerType",
    sorter: (a, b) => a?.bannerType?.localeCompare(b?.bannerType),
    width: 100
  },
  {
    title: "Banner View Type",
    dataIndex: "category",
    sorter: (a, b) => a?.category?.localeCompare(b?.category),
    width: 100
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    sorter: (a, b) => ((new Date(a.createdDate)) - (new Date(b.createdDate))),
    width: 100
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 100
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 100
  },
];

export default columns;
