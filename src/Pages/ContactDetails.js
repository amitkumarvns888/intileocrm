import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Form, Input, } from 'antd';
import { Button, Col, DatePicker, Drawer, Row, Select, Space, Dropdown, Menu, Checkbox } from 'antd';
import { CloseCircleOutlined, DownOutlined } from "@ant-design/icons";
import eyeicon from '../crmimage/Eye.png'
import editicon from '../crmimage/Edit.png'
import importicon from '../crmimage/import.png';
import uploadicon from '../crmimage/upload.png';
import copypasteicon from '../crmimage/copypaste.png';
import next from '../crmimage/navigate.png';
import { Link } from 'react-router-dom';
import { API_HEADER, fetchContactDataUrl, createContactFields } from '../Config';
import Header from '../Component/Header';
import SideNavbar from '../Component/SideNavbar';
import Footer from '../Component/Footer';
const { Option } = Select;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        sorter: (a, b) => a.age - b.age,
        onFilter: (value, record) => record.name.startsWith(value),
        //   width: '30%',
    },
    {
        title: 'Contact Name',
        dataIndex: 'first_name',
        render: (text, record) => (
            <span className="text-capitalize font16px">{record.first_name} {record.last_name}</span>
        ),
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Email Address',
        dataIndex: 'email',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        sorter: (a, b) => a.age - b.age,
        //   width: '40%',
    },
    {
        title: 'mobile number',
        dataIndex: 'mobile_no',
        // sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Company Name',
        dataIndex: 'company_name',
        // sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Created Date',
        render: (text, record) => (
            <span className="text-capitalize font16px">{record.created_at.slice(8, 10)}-{record.created_at.slice(5, 7)}-{record.created_at.slice(0, 4)}</span>
        ),
        // sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        // sorter: (a, b) => a.age - b.age,
    },
    {
        title: (
            <span className="text-capitalize textcolumntitle font16px fw-bold">
                Action
            </span>
        ),
        dataIndex: "",
        key: "x",
        fixed: "right",
        width: 100,
        render: (text, record) => (
            <a className="d-flex gap-4">

                <img src={eyeicon} alt="eye icon" />
                <img src={editicon} alt="edit icon" />
            </a>
        ),
    },
];

const ContactDetails = () => {

    // for table
    const [alldata, setAlldata] = useState([]);
    // const [loader, setLoader] = useState(true);
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 10,
        total: 0,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    // const hasSelected = selectedRowKeys.length > 0;

    // function for drawer
    const [opencreate, setOpencreate] = useState(false);
    const [openimport, setOpenimport] = useState(false);
    const showDrawerCreateContact = () => {
        setOpencreate(true);
    };
    const showDrawerImportContact = () => {
        setOpenimport(true);
    }
    const onCloseCreateContact = () => {
        setOpencreate(false);
    };
    const onCloseImportContact = () => {
        setOpenimport(false);
    }
    // fetching create contact dropdown data

    const [dropdownitems, setDropdownitems] = useState([]);
    // const [dropdownitems, setDropdownitems] = useState([
    //     { label: "address_label", value: "Value 1" },
    //     { label: "assistant_label", value: "Value 2" },
    //     { label: "company_name_label", value: "Value 3" },
    //     // Add more items as needed
    // ]);
    const fetchdropdowndata = async () => {
        try {
            const response = await axios.get(`${createContactFields}`, API_HEADER);
            setDropdownitems(response.data.data);
            console.log("dropdown data", response.data);
        } catch (error) {
            console.log("dropdown error", error)
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        fetchdropdowndata();
    }, []);
    // table data fetching
    const allData = async () => {
        try {
            let payload = {

                page: pagination.current,
                limit: pagination.per_page,

            };
            const response = await axios.get(
                `${fetchContactDataUrl}`,
                // payload,
                API_HEADER
            );
            setAlldata(response.data.data.data);
            console.log("table data", response.data)
            setPagination((prevPagination) => ({
                ...prevPagination,
                total: response.data.data.total,
            }));
            if (response.status === 200) {
                toast.success(response.data.data.message)
            }
            else {
                // toast.error(response.data.data.message)
            }
            // Setloader(false);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        allData();
    }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
        // Setloader(true);
    };
    const [selectedOptions, setSelectedOptions] = useState([]);
    // const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };
    const [mandatory, setMandatory] = useState(false);
    const [unique, setUnique] = useState(false);

    const handleCheckboxChange = (e, type) => {
        if (type === "mandatory") {
            setMandatory(e.target.checked);
        } else if (type === "unique") {
            setUnique(e.target.checked);
        }
    };

    return (
        <>
            <Header />
            <SideNavbar />
            <div className='content-wrapper'>
                <div className='content'>
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-9 mt-5">
                                <p className='font30px textblackfigma'>Contacts</p>
                            </div>
                            <div className="col-3 mt-5">
                                <button type='button' className='btn btn-outline-secondary me-2 text-capitalize' onClick={showDrawerCreateContact} >create contact</button>
                                <button type='button' className='btn btn-primary ms-2 text-capitalize' onClick={showDrawerImportContact}>import contact</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className='textgrey'>This is your database. From here you can view, organise and manage your contacts, individually or as a group.</p>
                                <hr className='bg-secondary' />
                            </div>
                        </div>
                        {/* drawer of create contact */}
                        <Drawer
                            title={<span className='text-white font16px mx-0'>Create Contact</span>}
                            width={481}

                            onClose={onCloseCreateContact}
                            open={opencreate}
                            headerStyle={{ backgroundColor: '#1890FF' }}
                            closeIcon={<CloseCircleOutlined style={{ fontSize: '20px', color: '#fff', position: 'absolute', right: '16px' }} />}
                            style={{
                                marginTop: "6vh", height: "94vh"
                            }}

                            footer={
                                <Row gutter={16} className='d-flex justify-content-between bg-light p-2'>
                                    <Col span={12} className=' '>
                                        <Button onClick={onCloseCreateContact} block>Cancel</Button>
                                    </Col>
                                    <Col span={12} className=' '>
                                        <Button span={24} onClick={onCloseCreateContact} type="primary" block>
                                            Continue
                                        </Button>
                                    </Col>
                                </Row>


                            }
                        >
                            <div
                            // style={{ overflowX: 'auto'}}
                            >
                                <Form layout="vertical" >
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item name="firstname" label={<span style={{ color: '#006D75', fontWeight: 'lighter' }}>First Name</span>}

                                                rules={[
                                                    { required: true, message: 'First Name is required' },
                                                    {
                                                        pattern: /^[&,.\-_\w\s]{1,25}$/,
                                                        message: 'Please enter a valid First Name (up to 25 characters, only &, , ., -, _ special characters are allowed)'
                                                    }
                                                ]}
                                            >
                                                <Input className="placeholderColor" placeholder="First Name" />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                name="lastname"
                                                label={<span style={{ color: '#006D75', fontWeight: 'lighter' }}>Last Name</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Last Name is required',
                                                    },
                                                    {
                                                        pattern: /^[&,.\-_\w\s]{1,25}$/,
                                                        message: 'Please enter a valid Last Name (up to 25 characters, only &, , ., -, _ special characters are allowed)'
                                                    }
                                                ]}
                                            >
                                                <Input
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    className="placeholderColor" placeholder="Last Name"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item name="email" label={<span style={{ color: '#006D75', fontWeight: 'lighter' }}>Email Address (Username)</span>}
                                                rules={[
                                                    { required: true, message: 'Email is required' },
                                                    { type: 'email', message: 'Invalid email' },
                                                    {
                                                        pattern: /^[&,.\-_\w\s@]{1,50}$/,
                                                        message: 'Please enter a valid email (up to 50 characters, only @, &, , ., -, _ special characters are allowed)'
                                                    }
                                                ]}>
                                                <Input type="email" placeholder="name@example.com" className="placeholderColor" />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={16}>
                                        <Col span={24} >
                                            <Form.Item name="phone_number" label={<span style={{ color: '#006D75', fontWeight: 'lighter' }}>Phone Number</span>}
                                                rules={[
                                                    { required: true, message: 'Mobile is required' },
                                                    { pattern: /^[0-9]+$/, message: 'Phone Number must contain only digits' },
                                                    { len: 10, message: 'Phone Number must be exactly 10 digits' },
                                                ]}

                                            >
                                                <Input maxLength={10} className="placeholderColor" placeholder="Phone Number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item name="name" label={<span style={{ color: '#006D75', fontWeight: 'lighter' }}>Company Name</span>}
                                                // style={{color:'#07b6af'}}
                                                rules={[
                                                    { required: true, message: 'Company Name is required' },
                                                    {
                                                        pattern: /^[&,.\-_\w\s]{1,50}$/,
                                                        message: 'Please enter a valid company name (up to 50 characters, only &, , ., -, _ special characters are allowed)'
                                                    }
                                                ]}
                                            >
                                                <Input className="placeholderColor" placeholder="Company Name" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            {selectedOptions.map(option => (
                                                <div key={option}>
                                                    <div className="mb-3 d-grid">
                                                        <label className="text-capitalize fw-light" style={{ color: '#006D75', }} >
                                                            {mandatory ? <span className="text-danger"> * </span> : null}
                                                            {option}</label> {/* Render the label with option name */}
                                                        <Input style={{
                                                            // margin: '0 1rem',
                                                            width: '100%'
                                                        }} placeholder={`${option}`}
                                                            className="placeholderColor"
                                                            required={mandatory}
                                                            />
                                                       
                                                        {/* Render different inputs based on selected options */}
                                                    </div>
                                                </div>
                                            ))}
                                            {/* <br /> */}
                                            <div className="d-grid">
                                                <label className="text-capitalize textblue" >select to add more Fields</label>
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    style={{
                                                        width: '100%',
                                                        // margin: '0 1rem',
                                                    }}
                                                    placeholder="Add more Fields"
                                                    onChange={handleChange}
                                                >
                                                    {/* options={filteredOptions.map((item) => ({
                        value: item,
                        label: item,
                    }))} */}
                                                    {/* <Option key="first_name">First Name</Option> */}
                                                    {/* <Option key="last_name">Last Name</Option> */}
                                                    <Option key="first_name">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span>First Name</span>
                                                            <div>
                                                                <Checkbox onChange={(e) => handleCheckboxChange(e, "mandatory")}><span className="text-xs">Mandatory</span></Checkbox>
                                                                {/* <Checkbox onChange={(e) => handleCheckboxChange(e, "unique")}>Unique</Checkbox> */}
                                                            </div>
                                                        </div>
                                                    </Option>
                                                    <Option key="last_name" className="">
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span>Last Name</span>
                                                            <div>
                                                                <Checkbox onChange={(e) => handleCheckboxChange(e, "mandatory")}><span className="text-xs">Mandatory</span></Checkbox>
                                                                {/* <Checkbox onChange={(e) => handleCheckboxChange(e, "unique")}>Unique</Checkbox> */}
                                                            </div>
                                                        </div>
                                                    </Option>
                                                    {/* Add more options as needed */}
                                                </Select>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>

                        </Drawer>
                        {/* end of drawer of create contact */}

                        {/* drawer of import contact */}
                        <Drawer
                            title={<span className='text-white font16px mx-0'>Import Contact</span>}
                            width={481}

                            onClose={onCloseImportContact}
                            open={openimport}
                            headerStyle={{ backgroundColor: '#1890FF' }}
                            closeIcon={<CloseCircleOutlined style={{ fontSize: '20px', color: '#fff', position: 'absolute', right: '16px' }} />}
                            style={{
                                marginTop: "6vh", height: "94vh"
                            }}

                            footer={
                                <Row gutter={16} className='d-flex justify-content-between bg-light p-2'>
                                    <Col span={12} className=' '>
                                        <Button onClick={onCloseImportContact} block>Cancel</Button>
                                    </Col>
                                    <Col span={12} className=' '>
                                        <Button span={24} onClick={onCloseImportContact} type="primary" block>
                                            Continue
                                        </Button>
                                    </Col>
                                </Row>


                            }
                        >
                            <Form layout="vertical" >
                                <Row gutter={16}>
                                    <Col span={24} className='d-flex align-items-start gap-2 justify-content-evenly'>
                                        <img src={importicon} alt="import icon" className='bgActiveLightblue p-2 rounded-1' />
                                        <div className='lh-1'>
                                            <p className='textfigmablack font14px fontweight500' >Import from another services</p>
                                            <p className='textgrey font12px text-wrap'>Import contacts automatically from tools
                                                you already use.</p>
                                        </div>
                                        <Link to='/importexisting'>
                                            <img src={next} alt="next icon" className='justify-content-end' />
                                        </Link>

                                    </Col>
                                </Row>
                                <hr />
                                <Row gutter={16} className=''>
                                    <Col span={24} className='d-flex align-items-start gap-2 justify-content-evenly'>
                                        <img src={uploadicon} alt="upload icon" className='bgActiveLightblue p-2 rounded-1' />
                                        <div className='lh-1'>
                                            <p className='textfigmablack font14px fontweight500'>Upload a file</p>
                                            <p className='textgrey font12px text-wrap'>Import contacts from a CSV or tab-delimited
                                                TXT file.</p>
                                        </div>
                                        <Link to='/uploadfile'>
                                            <img src={next} alt="next icon" />
                                        </Link>

                                    </Col>
                                </Row>
                                <hr />
                                {/* <Row gutter={16}>
                                    <Col span={24} className='d-flex  align-items-start gap-2 justify-content-around'>
                                        <img src={copypasteicon} alt=" copy paste icon" className='bgActiveLightblue p-2 rounded-1' />
                                        <div className='lh-1'>
                                            <p className='textfigmablack font14px fontweight500'>Copy and paste</p>
                                            <p className='textgrey font12px text-wrap'>Directly paste in new contacts from a
                                                spreadsheet or similar list.</p>
                                        </div>
                                        <Link to="/copy&paste">
                                            <img src={next} alt="next icon" />
                                        </Link>

                                    </Col>
                                </Row> */}
                                <hr />
                            </Form>
                        </Drawer>
                        {/* end of drawer of import contact */}

                        {/* table of page */}
                        <div className="row">
                            <div className="col-12 border-0 rounded-2">
                                <Table rowSelection={rowSelection} columns={columns} dataSource={alldata} pagination={pagination}
                                    onChange={handleTableChange}
                                    // pagination={{
                                    //     position: 'topRight', // Set pagination position to top right
                                    // }}
                                    scroll={{ x: 1000, }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactDetails