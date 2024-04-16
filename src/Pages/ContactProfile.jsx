// import React from 'react';
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, Form, Input, Space } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
// import { Dropdown, Space } from 'antd';
// const onFinish = (values) => {
//     console.log('Received values of form:', values);
// };

// const items = [
//     {
//         label: <a href="https://www.antgroup.com">1st menu item</a>,
//         key: '0',
//     },
//     {
//         label: <a href="https://www.aliyun.com">2nd menu item</a>,
//         key: '1',
//     },
//     {
//         type: 'divider',
//     },
//     {
//         label: '3rd menu item',
//         key: '3',
//     },
// ];
// const App = () => (
//     <Form
//         name="dynamic_form_nest_item"
//         onFinish={onFinish}
//         style={{
//             maxWidth: 600,
//         }}
//         autoComplete="off"
//     >
//         <Form.List name="users">
//             {(fields, { add, remove }) => (
//                 <>
//                     {fields.map(({ key, name, ...restField }) => (
//                         <Space
//                             key={key}
//                             style={{
//                                 display: 'flex',
//                                 marginBottom: 8,
//                             }}
//                             align="baseline"
//                         >
//                             <Form.Item
//                                 {...restField}
//                                 name={[name, 'first']}
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Missing first name',
//                                     },
//                                 ]}
//                             >
//                                 <Input placeholder="First Name" />
//                             </Form.Item>

//                             <MinusCircleOutlined onClick={() => remove(name)} />
//                         </Space>
//                     ))}
//                     <Form.Item>
//                         <Dropdown
//                             menu={{
//                                 items,
//                             }}
//                             trigger={['click']}
//                         >
//                             <a onClick={(e) => e.preventDefault()}>
//                                 <Space>
//                                     Click me
//                                     <DownOutlined />
//                                 </Space>
//                             </a>
//                         </Dropdown>
//                         <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                             Add field
//                         </Button>
//                     </Form.Item>
//                 </>
//             )}
//         </Form.List>
//         <Form.Item>
//             <Button type="primary" htmlType="submit">
//                 Submit
//             </Button>
//         </Form.Item>
//     </Form>
// );
// export default App;


import React, { useState, useEffect } from "react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_HEADER,createContactFields } from '../Config';


const YourComponent = () => {
  const [dropdownItems, setDropdownItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${createContactFields}`,
          API_HEADER
        );
        // Assuming response.data is an array of objects
        const filteredData = response.data.filter(item => item.first_name_status === 1);
        const dropdownData = filteredData.map(item => ({
          label: item.first_name_label,
          value: item.address_label,
          required: item.first_name_require === 1
        }));
        setDropdownItems(dropdownData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dropdown
      menu={{
        items: dropdownItems.map(item => ({
          value: item.label,
          onClick: () => {
            // Handle click event
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
  );
};

export default YourComponent;
