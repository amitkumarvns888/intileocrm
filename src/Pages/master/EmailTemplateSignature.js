import { useEffect, useState, useMemo } from "react";
import styles from "./EmailTemplateSignature.module.css";
import axios from "axios";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserbaseUrl, API_HEADER, API_HEADER_FILE } from "../../Config";
import {
  EditFilled,
  InfoCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  Card,
  Row,
  Col,
  Input,
  Pagination,
  Button,
  Table,
  Form,
  Tooltip,
  notification,
  Modal,
} from "antd";
import { toast } from "react-toastify";
import Header from "../../Component/Header";
import SideNavbar from "../../Component/SideNavbar";
import Footer from "../../Component/Footer";
const { Search } = Input;

const EmailTemplateSignature = () => {
  const [emailSignaturedata, setEmailSignatureData] = useState([]);

  const [editSignatureId, setEditSignatureId] = useState(null); // State to track the zone being edited
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  const [pagination, setPagination] = useState({
    totalRecords: 0,
    pageSize: 10,
    totalPages: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  });

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [pagination.currentPage, pagination.pageSize, sortOrder]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      onSearch();
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  //fetch all data/read
  const fetchAll = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://intileo-tech.info/api/user/email-sign/get-list",
        API_HEADER
      );
      console.log(response.data.data.data);
      setEmailSignatureData(response.data.data.data);
      setLoading(false);
      //   const {
      //     totalRecords,
      //     totalPages,
      //     currentPage,
      //     nextPage,
      //     prevPage,
      //     pageSize,
      //   } = response.data.pagination;

      //   setPagination((prevState) => ({
      //     ...prevState,
      //     totalRecords: totalRecords,
      //     totalPages: totalPages,
      //     pageSize: pageSize,
      //     currentPage: currentPage,
      //     nextPage: nextPage,
      //     prevPage: prevPage,
      //   }));
    } catch (error) {
      console.log(error);
    }
  };

  //extracting id for edit
  const handleEdit = (record) => {
    console.log("record to edit", record);
    const template_sign = record.template_sign; // Assuming initialValues contains the template_sign
    const textContent = template_sign.replace(/<[^>]+>/g, ""); // Extract text content without HTML tags
    form.setFieldsValue({ template_sign: textContent });
    form.setFieldsValue({
      template_name: record.template_name,
    });
    setEditSignatureId(record.id); // Set the zone id being edited
    setIsEditing(true);
    setIsAdding(false);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleDelete = (record) => {
    console.log("record to delete", record);
    setIsAdding(false);
    setIsEditing(false);
    Modal.confirm({
      title: "Are you sure you want to delete the record?",
      // icon: "",
      centered: true,
      async onOk() {
        try {
          await axios.delete(
            `https://intileo-tech.info/api/user/email-sign/delete/${record.id}`,

            API_HEADER
          );
          toast.success("Signature Deleted!");
          fetchAll();
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete sign!");
        }
      },
      onCancel() {},
    });
  };

  // search functionality
  const onSearch = async () => {
    if (search === null || search === undefined) return;
    setLoading(true);
    fetchAll();
  };

  //form management
  const onFinish = async (values) => {
    console.log("Success:", values);

    if (isAdding && !isEditing) {
      try {
        await axios.post(
          "https://intileo-tech.info/api/user/email-sign/add",
          values,
          API_HEADER
        );
        toast.success("Signature Added!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add sign!");
      }
    }
    if (isEditing && !isAdding) {
      try {
        await axios.post(
          "https://intileo-tech.info/api/user/email-sign/update",
          { ...values, user_email_sign_id: editSignatureId },
          API_HEADER
        );
        toast.success("Signature Edited!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to edit sign!");
      }
    }
    fetchAll();
    handleReset();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleReset = () => {
    form.resetFields();
    setEditSignatureId(null);
    setSearch("");
    setIsAdding(false);
    setIsEditing(false); // Reset the form fields
  };

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
  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
      width: "10%",
      align: "center",
      // className: styles.customHeader,
      render: (_, record, index) => {
        // Calculate the serial number based on the current page and the index of the item
        return (pagination.currentPage - 1) * pagination.pageSize + index + 1;
      },
      // render: (_, __, index) => index + 1,
    },

    {
      title: (
        <div>
          Signature Name
          {
            <ArrowUpOutlined
              style={{ marginLeft: 12, fontSize: "1rem" }}
              onClick={handleSortChange}
              rotate={sortOrder === "ASC" ? 0 : 180}
            />
          }
        </div>
      ),
      dataIndex: "template_name",
      key: "template_name",
      // className: styles.customHeader,
      width: "20%",
      align: "center",
    },
    {
      title: "Content",

      dataIndex: "template_sign",
      key: "template_sign",
      // className: styles.customHeader,
      // width: "0%",
      align: "left",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      key: "action",
      width: "10%",
      // className: styles.customHeader,
      render: (_, record) => (
        <>
          <EditFilled
            type="primary"
            style={{
              marginRight: "15px",
              color: "green",
              textAlign: "center",
            }}
            onClick={() => {
              handleEdit(record);
            }}
          />
          <DeleteOutlined
            type="primary"
            style={{ color: "red" }}
            onClick={() => handleDelete(record)}
          />
        </>
      ),
    },
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [false, 6, 5, 4, 3, 2] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
  ];

  return (
    <>
      <Header />
      <SideNavbar />
      <div className="content-wrapper">
        <div className="content p-0 m-0">
          <div className="container-fluid p-0 m-0">
            <Card className={styles.mainCard}>
              <h3>Email Signature</h3>
              <Card>
                <Row justify="end">
                  <Col>
                    {!isAdding && !isEditing && (
                      <Button
                        onClick={() => setIsAdding(true)}
                        type="primary"
                        style={{ marginBottom: "1rem" }}
                        //   className={styles.buttonStyle}
                      >
                        <div>
                          <PlusOutlined
                            style={{
                              marginRight: "0.5rem",
                            }}
                          />
                          Add Signature
                        </div>
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row justify="end">
                  <Col>
                    <Search
                      placeholder="Search Signature"
                      onSearch={onSearch}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      enterButton
                      style={{ marginBottom: "16px" }}
                      className={styles.searchStyle}
                    />
                  </Col>
                </Row>

                <Table
                  bordered
                  rowKey={(record) => record.id}
                  columns={columns}
                  dataSource={emailSignaturedata}
                  size="small"
                  loading={loading}
                  pagination={false}
                  style={{
                    marginBottom: "3%",
                  }}
                />
                <Row justify="center">
                  <Col>
                    <Pagination
                      current={pagination.currentPage}
                      total={pagination.totalRecords}
                      pageSize={pagination.pageSize}
                      onChange={handlePageChange}
                      showLessItems={true}
                      onShowSizeChange={pageSizeChange}
                      showQuickJumper={false}
                      showPrevNextJumpers={true}
                      showSizeChanger={true}
                      onPrev={() => handlePageChange(pagination.prevPage)}
                      onNext={() => handlePageChange(pagination.nextPage)}
                      style={{
                        marginBottom: "2rem",
                      }}
                    />
                  </Col>
                </Row>
              </Card>
              <Row justify="center" align="middle">
                <Col align="center" style={{ minWidth: "100%" }}>
                  {(isAdding || isEditing) && (
                    <Card
                      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
                      className={`${styles.card} `}
                    >
                      {isAdding ? (
                        <h5>Add Signature</h5>
                      ) : (
                        <h5>Edit Signature</h5>
                      )}
                      <Form
                        colon={false}
                        layout="vertical"
                        labelAlign="left"
                        form={form}
                        name="basic"
                        className="login-form"
                        // initialValues={{
                        //   zone_name: isEditing ? newZoneDesc : "",
                        // }}
                        // labelCol={{
                        //   span: 6,
                        // }}
                        // wrapperCol={{
                        //   span: 18,
                        // }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"
                        style={{ paddingTop: "2rem" }}
                      >
                        <Form.Item
                          label="Template name"
                          name="template_name"
                          rules={[
                            {
                              required: true,
                              message: "Please input Signature template name !",
                            },
                          ]}
                          //   style={{ maxWidth: "50%" }}
                        >
                          <Input
                            suffix={
                              <Tooltip title="Please input a valid signature name">
                                <InfoCircleOutlined
                                  style={{
                                    color: "rgba(0,0,0,.45)",
                                  }}
                                />
                              </Tooltip>
                            }
                            placeholder="Enter Signature name"
                            style={{ marginLeft: "4" }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Content"
                          name="template_sign"
                          rules={[
                            {
                              required: true,
                              message: "Please input Signature content !",
                            },
                          ]}
                          //   style={{ maxWidth: "50%" }}
                        >
                          <QuillEditor
                            className={styles.editor}
                            // theme="snow"
                            formats={formats}
                            modules={modules}
                          />
                        </Form.Item>
                        <Form.Item>
                          <div className={styles.buttonStyle2}>
                            <Button
                              //   type="primary"
                              danger
                              htmlType="button"
                              onClick={handleReset}
                              className={styles["login-form-button"]}
                              style={{ maxWidth: "7rem", marginRight: "1rem" }}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className={styles["login-form-button"]}
                              style={{ maxWidth: "7rem" }}
                            >
                              {isAdding ? "Add" : "Edit"}
                            </Button>
                          </div>
                        </Form.Item>
                      </Form>
                    </Card>
                  )}
                </Col>
                <Col></Col>
              </Row>
            </Card>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplateSignature;
