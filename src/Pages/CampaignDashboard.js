import { useState } from "react";
import DefaultHeader  from "../Component/Header";
import SideNavbar from "../Component/SideNavbar";
import Footer from "../Component/Footer";
import styles from "./CampaignDashboard.module.css";
import {
  Layout,
  Row,
  Col,
  Pagination,
  Input,
  Select,
  Typography,
  Button,
  Table,
  Tag,
  Menu,
  Divider,
} from "antd";

import {
  SearchOutlined,
  MailOutlined,
  DeleteFilled,
  EyeOutlined,
} from "@ant-design/icons";
// const { Title } = Typography;

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    "View By Status",
    "g1",
    null,
    [
      getItem("All", "1", <MailOutlined />),
      getItem("Ongoing", "2", <MailOutlined />),
      getItem("Draft", "3", <MailOutlined />),
      getItem("Completed", "4", <MailOutlined />),
    ],
    "group"
  ),
  {
    type: "divider",
  },
  getItem(
    "View by Types",
    "g2",
    null,
    [
      getItem("All", "5", <MailOutlined />),
      getItem("Emails", "6", <MailOutlined />),
      getItem("Surveys", "7", <MailOutlined />),
    ],
    "group"
  ),
];

//Table Column Structure
const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Created Date",
    dataIndex: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) =>
      text ? <Tag color="green">Proceed</Tag> : <Tag color="red">Hold</Tag>,
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "center",
    key: "action",
    width: 100,
    render: (_, record) => (
      <div>
        <EyeOutlined
          type="primary"
          style={{
            marginRight: "9px",
            color: "gray",
            textAlign: "center",
          }}
          // onClick={() => handleEdit(record)}
        />

        <DeleteFilled
          type="primary"
          style={{ color: "gray" }}
          // onClick={() => handleDelete(record)}
        />
      </div>
    ),
  },
];
const data = [
  {
    key: "1",
    id: "12345",
    email: "test123@gmail.com",
    name: "John Brown",
    age: 32,
    status: 1,
    product: "Application",
    createdAt: "11/04/2024",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    id: "12346",
    name: "Jim Green",
    product: "Application",
    createdAt: "11/04/2024",
    email: "test123@gmail.com",
    status: 0,
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    id: "12347",
    name: "Joe Black",
    product: "Software",
    createdAt: "11/04/2024",
    status: 1,
    email: "test123@gmail.com",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];
const CampaignDashboard = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [loading, setLoading] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    pageSize: 10,
    totalPages: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  });
  //Pagination
  const handlePageChange = (page) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const pageSizeChange = (current, pageSize) => {
    setPagination((prevState) => ({
      ...prevState,
      pageSize: pageSize,
    }));
  };
  const handleSortChange = () => {
    // Toggle sorting order when the button is clicked
    setSortOrder((prevOrder) => {
      if (prevOrder === "ASC") {
        return "DESC";
      } else {
        return "ASC";
      }
    });
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      // Disallow selection of specific rows if needed
      disabled: record.name === "Disabled User",
    }),
  };
  return (
    <>
      <DefaultHeader />
      <SideNavbar />
      <div className="content-wrapper bg-light">
        <div className="content">
          <div className="container-fluid">
            <div className={styles.headline}>
              <div className={styles.buttonHeading}>
                <h1>Header</h1>
                <div>
                  <Button style={{ borderRadius: 5, marginRight: "1rem" }}>
                    View Analitics
                  </Button>
                  <Button type="primary" style={{ borderRadius: 5 }}>
                    Create New
                  </Button>
                </div>
              </div>
              <p>Comapny Name here....</p>
              <p>You have 1 contact in list</p>
              <div className={styles.spanView}>
                <p style={{ color: "blue" }}>List View</p>
                <p>Calandar View</p>
              </div>
            </div>
            <Divider styles={{ padding: 0, margin: 0 }} />
            <div>
              <Layout style={{ minHeight: "100vh", marginTop: "2rem" }}>
                <Layout>
                  <Sider width={220} style={{ background: "#fff" }}>
                    <Menu
                      defaultSelectedKeys={["1"]}
                      defaultOpenKeys={["sub1"]}
                      mode="inline"
                      theme="light"
                      items={items}
                    />
                  </Sider>
                  <Layout style={{ padding: "0" }}>
                    <Header
                      style={{
                        background: "#fff",
                        textAlign: "center",
                        padding: 0,
                      }}
                    >
                      <Row justify="end" align="middle" gutter={16}>
                        <Col span={5}>
                          <Input
                            placeholder="Search Campaign"
                            prefix={<SearchOutlined />}
                          />
                        </Col>
                        <Col span={6    }>
                          <Row align="middle">
                            <Typography.Text style={{ marginRight: "0.6rem" }}>
                              Sort by
                            </Typography.Text>

                            <Select
                              defaultValue="Last edited"
                              style={{
                                width: 120,
                              }}
                              // onChange={handleChange}
                              options={[
                                {
                                  value: "Last edited",
                                  label: "Last edited",
                                },
                                {
                                  value: "Last added",
                                  label: "Last added",
                                },
                              ]}
                            />
                          </Row>
                        </Col>
                        <Col span={12} styles={{ margin: 0, padding: 0,marginRight:1 }}>
                          <Pagination
                            current={pagination.currentPage}
                            // total={pagination.totalRecords}
                            total={1000}
                            pageSize={pagination.pageSize}
                            onChange={handlePageChange}
                            showLessItems={true}
                            onShowSizeChange={pageSizeChange}
                            showQuickJumper={false}
                            showPrevNextJumpers={true}
                            showSizeChanger={true}
                            responsive={true}
                            onPrev={() => handlePageChange(pagination.prevPage)}
                            onNext={() => handlePageChange(pagination.nextPage)}
                            style={
                              {
                                // marginBottom: "2rem",
                              }
                            }
                          />
                        </Col>
                      </Row>
                    </Header>
                    <Content
                      style={{
                        background: "#fff",
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                      }}
                    >
                      <Table
                        columns={columns}
                        dataSource={data}
                        bordered={true}
                        pagination={false}
                        rowSelection={{
                          type: "checkbox",
                          ...rowSelection,
                        }}
                      />
                    </Content>
                  </Layout>
                </Layout>
              </Layout>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CampaignDashboard;
