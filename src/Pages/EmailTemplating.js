import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import Header from "../Component/Header";
import SideNavbar from "../Component/SideNavbar";
import { UserbaseUrl, API_HEADER } from "../Config";
import { ProfileOutlined, RobotOutlined } from "@ant-design/icons";
import EmailPreview from "../Component/EmailPreview";
// import Header from "../Component/Header"
import Footer from "../Component/Footer"
// import SideNavbar from "../Component/SideNavbar";
import {
  Divider,
  Button as AntButton,
  Select,
  Form,
  Row,
  Col,
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
const EmailTemplating = () => {
  const [form] = Form.useForm();
  const [templateOptions, setTemplateOptions] = useState([]);
  const [scheduleLater, setScheduleLater] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(moment());
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [selectedTemplateData, setSelectedTemplateData] = useState(null);

  useEffect(() => {
    // Set the initial value to current date and time
    setCurrentDateTime(moment());
    const fetch = async () => {
      const response = await axios.get(
        `${UserbaseUrl}/email-template/template`,
        API_HEADER
      );
      console.log("response", response.data.data);
      setTemplateOptions(response.data.data);
    };
    fetch();
  }, []);
  console.log("template options*****", templateOptions);
  const onFinish = (values) => {
    // Process the submitted values
    console.log("Submitted values:", values);
  };
  const onFinishFailed = () => {
    console.log("Submit failed!");
  };
  const handleScheduleChange = (e) => {
    setScheduleLater(e.target.value === "later");
    // If "Schedule Now" is selected, set the current date and time
    if (e.target.value === "now") {
      setCurrentDateTime(moment());
    }
  };

  const validateEmails = (rule, value, callback) => {
    if (!value) {
      callback(); // If no value provided, don't validate
      return;
    }
    const emails = value.split(",").map((email) => email.trim()); // Split by comma and remove whitespace
    const invalidEmails = emails.filter((email) => !validateEmail(email)); // Filter invalid emails
    if (invalidEmails.length === 0) {
      callback(); // All emails are valid
    } else {
      callback("Please enter valid email addresses separated by commas");
    }
  };
  const handleTemplateChange = (value) => {
    setSelectedTemplateId(value);
    console.log("selected id ", value, typeof value);
    const temp = templateOptions.find((option) => option.id === value);
    setSelectedTemplateData(temp);
    console.log("************selected template**************", temp);
  };

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < moment().startOf("day");
  };
  const disabledTime = (current) => {
    if (!current) {
      // Allow all times if current is not defined
      return false;
    }
    const now = moment();
    const currentDate = moment().startOf("day");
    if (current.isSame(currentDate, "day")) {
      // Disable times before the current time if the selected date is today
      return {
        disabled: () => current < now,
      };
    }
    return false;
  };
  return (
    <>
    
    <Header/>
    <SideNavbar/>
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
            <AntBreadcrumb.Item>Email Schedule</AntBreadcrumb.Item>
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
          <AntSider width="30%" style={siderStyle}>
            <div
              style={{ minWidth: "100%", padding: "0rem 1rem", margin: "0" }}
            >
              <Form
                name="email-template-form"
                id="form"
                onFinish={onFinish}
                form={form}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                // style={{ minWidth: "100%" }}
              >
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="to"
                      label="To"
                      rules={[
                        {
                          required: true,
                          message: "Please enter valid email!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" m />
                    </Form.Item>
                  </Col>
                </Row>
                <p>To whom you are sending this email?</p>

                <Divider />

                <Row gutter={0} align="bottom">
                  <Col span={6}>
                    <Form.Item
                      //    name={['from', 'name']}
                      name="fromName"
                      label="From"
                      rules={[
                        {
                          required: true,
                          message: "Please enter name!",
                        },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <Form.Item
                      name="fromEmail"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input
                        // style={{
                        //   width: "80%",
                        // }}
                        placeholder="Email"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <p>Who is sending this email?</p>
                <Divider />
                <Row gutter={0}>
                  <Col span={24}>
                    <Form.Item
                      name="subject"
                      label="Subject"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a subject!",
                        },
                      ]}
                    >
                      {/* <Input placeholder="Subject" /> */}
                      <TextArea
                        showCount
                        maxLength={100}
                        placeholder="Subject"
                        style={{
                          height: 120,
                          resize: "none",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <p>Whats's the subject line for this email?</p>

                <Divider />
                <Row gutter={0}>
                  <Col span={24}>
                    <Form.Item
                      name="schedule"
                      label="Schedule"
                      rules={[
                        {
                          required: true,
                          message: "Please select a schedule option!",
                        },
                      ]}
                    >
                      <Radio.Group onChange={handleScheduleChange}>
                        <Radio value="schedule_now">Schedule Now</Radio>
                        <Radio value="schedule_later">Schedule Later</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                {scheduleLater && (
                  <Row gutter={0} align="bottom">
                    <Col span={12}>
                      <Form.Item
                        name="scheduleDate"
                        //   label="Schedule Date"
                        rules={[
                          {
                            required: true,
                            message: "Please select a date!",
                          },
                        ]}
                      >
                        <DatePicker
                          disabledDate={disabledDate}
                          format="DD/MM/YY"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="scheduleTime"
                        rules={[
                          {
                            required: true,
                            message: "Please select a time!",
                          },
                        ]}
                      >
                        <TimePicker
                          disabledTime={disabledTime}
                          format="HH:mm"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                <Divider />
                <Row gutter={0}>
                  <Col span={24}>
                    <Form.Item
                      name="content"
                      label="Content"
                      rules={[
                        {
                          required: false,
                          message: "Please email body!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Template"
                        onChange={handleTemplateChange}
                        value={selectedTemplateId}
                      >
                        {/* Render options based on the fetched data */}
                        {templateOptions.map((option) => (
                          <Option key={option.id} value={option.id}>
                            {option.template_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                {/* <Form.Item>
                  <AntButton type="primary" htmlType="submit">
                    Submit
                  </AntButton>
                </Form.Item> */}
              </Form>
            </div>
          </AntSider>
          <AntContent style={contentStyle}>
            <EmailPreview data={selectedTemplateData} />
          </AntContent>
        </AntLayout>
      </AntLayout>
    </div>
      </div>
    </div>
   
    <Footer/>
    </>
  );
};

export default EmailTemplating;
