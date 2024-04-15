import React from "react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Form, Input, Button, Divider, Row, Col, TimePicker } from "antd";
import { Select, Space, DatePicker, Radio } from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const MultiEmailForm = () => {
  const [form] = Form.useForm();
  const [scheduleLater, setScheduleLater] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(moment());

  useEffect(() => {
    // Set the initial value to current date and time
    setCurrentDateTime(moment());
  }, []);
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
    <Form
      name="email-template-form"
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Divider />
      <Row gutter={0}>
        <Col span={7}>
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
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>
      <p>To whom you are sending this email?</p>

      <Divider />

      <Row gutter={0} align="bottom">
        <Col span={3}>
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
        <Col span={5}>
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
              style={{
                width: "80%",
              }}
              placeholder="Email"
            />
          </Form.Item>
        </Col>
      </Row>
      <p>Who is sending this email?</p>
      <Divider />
      <Row gutter={0}>
        <Col span={7}>
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
            <Input placeholder="Subject" />
          </Form.Item>
        </Col>
      </Row>
      <p>Whats's the subject line for this email?</p>

      <Divider />
      <Row gutter={0}>
        <Col span={7}>
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
              <Radio value="now">Schedule Now</Radio>
              <Radio value="later">Schedule Later</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      {scheduleLater && (
        <Row gutter={0} align="bottom">
          <Col span={4}>
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
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
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
                // disabledDate={disabledDate}
                disabledTime={disabledTime}
                // showTime={{ format: "HH:mm A" }}
                format="HH:mm"
                width="100"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Divider />
      <Row gutter={0}>
        <Col span={7}>
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
              options={[
                {
                  value: "1",
                  label: "Template 1",
                },
                {
                  value: "2",
                  label: "Template 2",
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MultiEmailForm;
