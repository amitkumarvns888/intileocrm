import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import Header from "../Component/Header";
import SideNavbar from "../Component/SideNavbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { UserbaseUrl, API_HEADER,API_HEADER_FILE } from "../Config";
import {
  ProfileOutlined,
  RobotOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import EmailPreview from "../Component/EmailPreview";
// import Header from "../Component/Header"
import Footer from "../Component/Footer";
// import SideNavbar from "../Component/SideNavbar";
import {
  Divider,
  Button as AntButton,
  Select,
  Form,
  Row,
  Col,
  Upload,
  Modal,
  DatePicker,
  TimePicker,
  Input,
  Radio,
  Space,
  Layout as AntLayout,
  Flex,
  Breadcrumb as AntBreadcrumb,
} from "antd";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
const { Option } = Select;

const { TextArea } = Input;
const {
  Footer: AntFooter,
  Sider: AntSider,
  Content: AntContent,
  Header: AntHeader,
} = AntLayout;
const headerStyle = {
  //   textAlign: "center",

  color: "#fff",

  backgroundColor: "black",
};
const contentStyle = {
  //   textAlign: "center",
  //   minHeight: "100vh",
  //   lineHeight: "120px",

  color: "#fff",
  //   backgroundColor: "blue",
};
const siderStyle = {
  //   textAlign: "center",
  //   lineHeight: "120px",
  padding: "1rem",
  color: "#fff",
  backgroundColor: "white",
};

const layoutStyle = {
  //   borderRadius: 8,
  //   overflow: "hidden",
  //   width: "calc(50% - 8px)",
  //   maxWidth: "calc(50% - 8px)",
};
const CreateEmailTemplating = () => {
  const [form] = Form.useForm();
  const [templateOptions, setTemplateOptions] = useState([]);
  const [scheduleLater, setScheduleLater] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(moment());
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [selectedTemplateData, setSelectedTemplateData] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    // Set the initial value to current date and time
    setCurrentDateTime(moment());
    const fetch = async () => {
      const response = await axios.get(
        `${UserbaseUrl}/email-template/template`,
        API_HEADER_FILE
      );
      //   console.log("response", response.data.data);
      setTemplateOptions(response.data.data);
    };
    // fetch();
  }, []);
  //   console.log("template options*****", templateOptions);
  const onFinish = async (values) => {
    // Process the submitted values
    try {
      await axios.post(
        "http:/https://intileo-tech.info/crm/api/user/email-template/add",
        values,
        API_HEADER
      );
    } catch (error) {
      console.log("error while uploading email templates", error);
    }
    console.log("Submitted values:", values);
  };
  const onFinishFailed = () => {
    console.log("Submit failed!");
  };

  const handleTemplateChange = (value) => {
    setSelectedTemplateId(value);
    // console.log("selected id ", value, typeof value);
    const temp = templateOptions.find((option) => option.id === value);
    setSelectedTemplateData(temp);
    // console.log("************selected template**************", temp);
  };
  const handleFormValuesChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };
  const handlePreview = () => {
    form
      .validateFields()
      .then((values) => {
        setFormValues(values);
        setPreviewVisible(true);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  return (
    <>
      <Header />
      <SideNavbar />
      <div className="content-wrapper">
        <div className="content">
          <div>
            <Row
              align="middle"
              justify="space-between"
              style={{ padding: " 0.5rem 2rem" }}
            >
              <Col>
                <AntBreadcrumb
                  style={{
                    margin: "16px 0",
                  }}
                >
                  <AntBreadcrumb.Item>Home</AntBreadcrumb.Item>
                  <AntBreadcrumb.Item>Create</AntBreadcrumb.Item>
                  <AntBreadcrumb.Item>Email Template</AntBreadcrumb.Item>
                </AntBreadcrumb>
                <h5>Email Name</h5>
                <p style={{ color: "blue" }}>Edit Name</p>
              </Col>
              <Col>
                <AntButton>Finish Later</AntButton>
                <AntButton
                  type="primary"
                  form="form"
                  htmlType="submit"
                  style={{ marginLeft: "1rem" }}
                >
                  Send
                </AntButton>
              </Col>
            </Row>
            <Divider />
            <AntLayout style={layoutStyle}>
              {/* <AntHeader style={headerStyle}>
       
        </AntHeader> */}
              <AntLayout>
                <AntSider width="60%" style={siderStyle}>
                  <div
                    style={{
                      minWidth: "100%",
                      padding: "1rem 2rem 0rem 2rem",
                      margin: "0",
                    }}
                  >
                    <Form
                      name="email-template-form"
                      id="form"
                      onFinish={onFinish}
                      form={form}
                      onFinishFailed={onFinishFailed}
                      onValuesChange={handleFormValuesChange}
                      layout="vertical"
                      // style={{ minWidth: "100%" }}
                    >
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            name="template_name"
                            label="Template Name"
                            rules={[
                              {
                                required: false,
                                message: "Please enter template name!",
                              },
                            ]}
                          >
                            <Input placeholder="Template Name" m />
                          </Form.Item>
                        </Col>
                      </Row>
                      <p>To whom you are sending this email?</p>
                      <Divider />
                      <Row>
                        <Col span={24}>
                          <Form.Item
                            name="template_subject"
                            label="Subject"
                            rules={[
                              {
                                required: false,
                                message: "Please enter subject!",
                              },
                            ]}
                          >
                            {/* <TextArea
                              showCount
                              maxLength={80}
                              placeholder="subject"
                              style={{
                                height: 80,
                                resize: "none",
                              }}
                            /> */}
                            <ReactQuill
                              //   theme="snow"
                              // value={editorRemarks}
                              // onChange={handleEditorChange}
                              style={{
                                height: "6rem",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <p className="mt-4">
                        What is the sunbect line for this email?
                      </p>

                      <Divider />

                      <Row gutter={0}>
                        <Col span={24}>
                          <Form.Item
                            name="template_body"
                            label="Content"
                            rules={[
                              {
                                required: false,
                                message: "Please enter a content!",
                              },
                            ]}
                          >
                            <ReactQuill
                              //   theme="snow"
                              // value={editorRemarks}
                              // onChange={handleEditorChange}
                              style={{
                                height: "16rem",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <p className="mt-5">
                        Whats's the content for this email?
                      </p>
                      <Divider />
                      {/* <Row gutter={20}>
                            <Col span={12}>
                            <Form.Item
                                name="logo_image"
                                label="Logo Image"
                                rules={[
                                {
                                    required: false,
                                    message: "Please add logo image!",
                                },
                                ]}
                            >
                                <Upload>
                                <AntButton
                                    type="primary"
                                    icon={<UploadOutlined />}
                                >
                                    Click to Upload Logo
                                </AntButton>
                                </Upload>
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item
                                name="body_image"
                                label="Banner Image"
                                rules={[
                                {
                                    required: false,
                                    message: "Please add body image!",
                                },
                                ]}
                            >
                                <Upload>
                                <AntButton
                                    type="primary"
                                    icon={<UploadOutlined />}
                                >
                                    Upload Banner Image
                                </AntButton>
                                </Upload>
                            </Form.Item>
                            </Col>
                        </Row> */}
                      <Divider />
                      {/* <Row gutter={0}>
                      
                      </Row> */}

                      <Row gutter={0}>
                        <Col span={24}>
                          <Form.Item
                            name="template_sign"
                            label="Signature"
                            rules={[
                              {
                                required: false,
                                message: "Please enter signature!",
                              },
                            ]}
                          >
                            <ReactQuill
                              //   theme="snow"
                              // value={editorRemarks}
                              // onChange={handleEditorChange}
                              style={{
                                height: "8rem",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <p className="mt-5">
                        Whats's the signature for this email?
                      </p>
                      <Form.Item>
                        <AntButton
                          primary
                          htmlType="button"
                          onClick={handlePreview}
                        >
                          Preview
                        </AntButton>
                        <AntButton
                          type="primary"
                          htmlType="submit"
                          style={{ marginLeft: "1rem" }}
                        >
                          Submit
                        </AntButton>
                      </Form.Item>
                    </Form>
                    <Modal
                      title={`${form.getFieldValue("template_name")} Preview`}
                      open={previewVisible}
                      onCancel={() => setPreviewVisible(false)}
                      width={800}
                      style={{ zIndex: 9999 }}
                      headerStyle={{
                        padding: "12px 24px",
                        fontSize: "2rem",
                        textAlign: "center",
                      }}
                      // onOk={() => {
                      //   form.submit();
                      //   setPreviewVisible(false);
                      // }}
                    >
                      <EmailPreview formValues={formValues} />
                    </Modal>
                  </div>
                </AntSider>
                <AntContent width="40%" style={contentStyle}>
                  <EmailPreview formValues={formValues} />
                </AntContent>
              </AntLayout>
            </AntLayout>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateEmailTemplating;
