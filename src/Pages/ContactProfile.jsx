import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Dropdown, Select } from 'antd';
const onFinish = (values) => {
  console.log('Received values of form:', values);
};

const options = [];
for (let i = 0; i < 10; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    label: value,
    value,

  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const App = () => {

  const [dropdownitems, setDropdownitems] = useState([]);

  return (
    <>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'first']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing first name',
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Dropdown
                  menu={{
                    items: dropdownitems.map(item => ({
                      value: item.label,
                      onClick: () => {
                        add(); // Call the add function
                        // Handle any other click event logic here
                      },
                      children: (
                        <div>
                          {item.label}
                          {item.required && <span style={{ color: "red" }}> *</span>}
                        </div>
                      )
                    }))
                  }}
                  trigger={["click"]}
                >
                  <a onClick={e => e.preventDefault()}>
                    <Space>
                      Click me
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>

                {/* <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button> */}
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Select
        mode="multiple"
        allowClear
        style={{
          width: '20%',
        }}
        placeholder="Add more Fields"
        // defaultValue={['a10', 'c12']}
        onChange={handleChange}
        options={options}
      />
    </>
  )

};
export default App;