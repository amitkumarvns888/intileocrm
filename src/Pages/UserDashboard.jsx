import React, { useState } from 'react'
import SideNavbar from '../Component/SideNavbar'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import increaselogo from '../crmimage/trendUp.png'
import decreaselogo from '../crmimage/trendDown.png'
import threedot from '../crmimage/threedot.png'
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { LineChart } from '../Component/Charts';
import { CurveChart } from '../Component/Charts'
import { Tabs, Select, Table } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;

// columns for table
const columns = [
    {
        title: "S.No",
        dataIndex: "id",
        fixed: "left",
        width: 70,
        // render: (id, record, index) => {
        //   const pageIndex = (pagination.current - 1) * pagination.pageSize;
        //   return pageIndex + index + 1;
        // },
    },
    {
        title: 'Emails',
        dataIndex: 'first_name',
        render: (text, record) => (
            <span className="text-capitalize font16px">{record.first_name} {record.last_name}</span>
        ),
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Subjects',
        dataIndex: 'email',

        sorter: (a, b) => a.age - b.age,
        //   width: '40%',
    },

    {
        title: 'Date',
        render: (text, record) => (
            <span className="text-capitalize font16px">{record.created_at.slice(8, 10)}-{record.created_at.slice(5, 7)}-{record.created_at.slice(0, 4)}</span>
        ),
        sorter: (a, b) => a.age - b.age,
    },


];



const UserDashboard = () => {
    // for tab
    const [activeTab, setActiveTab] = useState('1');

    const handleTabChange = key => {
        setActiveTab(key);
    };

    // functions for table
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
    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
        // Setloader(true);
    };
    return (
        <>
            <Header />
            <SideNavbar />
            <div className="content-wrapper bg-light">
                <div className="content">
                    <div className="container-fluid">
                        {/* 1st row */}
                        <div className="row mx-2">
                            <div className="col-lg-12">
                                <p className="mt-4 mb-3 font16px textblackfigma">Dashboard</p>
                            </div>
                        </div>
                        {/* 2nd row */}
                        <div className="row mx-2">

                            {/* box 1 */}
                            <div className=" border border-1 border-secondary-subtle rounded-1 bg-white p-3 boxwidth mx-2">
                                <p className='textgrey font14px'>Total Contacts</p>
                                <div className='d-flex gap-2 align-items-center justify-content-start' style={{ lineHeight: '0.1' }}>
                                    <p className='textblackfigma font30px'>2,000</p>
                                    <p className='textblue font12px bgActiveLightblue rounded-1 p-1'><img src={increaselogo} alt="increment" /> 55.5%</p>
                                </div>
                                <p className='textgrey font12px '>You made an extra <span className='textblue'>35,000</span> this year</p>
                            </div>

                            {/* box 2 */}
                            <div className=" border border-1 border-secondary-subtle rounded-1 bg-white p-3 boxwidth mx-2">
                                <p className='textgrey font14px'>Total Campaign Launched</p>
                                <div className='d-flex gap-2 align-items-center justify-content-start' style={{ lineHeight: '0.1' }}>
                                    <p className='textblackfigma font30px'>2,000</p>
                                    <p className='textblue font12px bgActiveLightblue rounded-1 p-1'><img src={increaselogo} alt="increment" /> 55.5%</p>
                                </div>
                                <p className='textgrey font12px '>You made an extra <span className='textblue'>35,000</span> this year</p>
                            </div>

                            {/* box 3 */}
                            <div className=" border border-1 border-secondary-subtle rounded-1 bg-white p-3 boxwidth mx-2">
                                <p className='textgrey font14px'>Total Generated Leads</p>
                                <div className='d-flex gap-2 align-items-center justify-content-start' style={{ lineHeight: '0.1' }}>
                                    <p className='textblackfigma font30px'>2,000</p>
                                    <p className='textblue font12px bgActiveLightblue rounded-1 p-1'><img src={increaselogo} alt="increment" /> 55.5%</p>
                                </div>
                                <p className='textgrey font12px '>You made an extra <span className='textblue'>35,000</span> this year</p>
                            </div>

                            {/* box 4 */}
                            <div className="border border-1 border-secondary-subtle rounded-1 bg-white p-3 boxwidth mx-2">
                                <p className='textgrey font14px'>Total Campaign Templates</p>
                                <div className='d-flex gap-2 align-items-center justify-content-start' style={{ lineHeight: '0.1' }}>
                                    <p className='textblackfigma font30px'>2,000</p>
                                    <p className='textblue font12px bgActiveLightblue rounded-1 p-1'><img src={increaselogo} alt="increment" /> 55.5%</p>
                                </div>
                                <p className='textgrey font12px '>You made an extra <span className='textblue'>35,000</span> this year</p>
                            </div>
                        </div>
                        {/* 3rd row */}
                        <div className="row my-4">
                            <div className="col-lg-7 mx-3">
                                <div className="d-flex justify-content-between">
                                    <div className="">
                                        <p className='text-capitalize textblackfigma'> Campaign Reports</p>
                                    </div>
                                    <div className=" d-flex gap-2">
                                        <p>Month</p>
                                        <p>Week</p>
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-12"> */}
                                <CurveChart />
                                {/* </div>
                                </div> */}

                            </div>
                            <div className="col-lg-4 mx-3">
                                {/* <div className="row">
                                    <div className="col-12"> */}
                                <p className='text-capitalize textblackfigma'>income overview</p>
                                <LineChart />

                                {/* </div>
                                </div> */}
                            </div>
                        </div>
                        {/* 4th row */}
                        <div className="row my-4 mx-2">
                            <div className="col-lg-7 mx-3">
                                <div className="row d-flex justify-content-between align-items-center">
                                    <div className="col-5">
                                        <p className='text-capitalize textblackfigma'> mailbox</p>
                                    </div>
                                    <div className="col-1">
                                        <img src={threedot} alt="more" />
                                    </div>
                                </div>
                                <div className="row">
                                    {/* tabs of mail */}
                                    <Tabs activeKey={activeTab} onChange={handleTabChange}>


                                        <TabPane tab="Inbox" key="1">
                                            {/* before every table search and sorting */}
                                            <div className='row d-flex align-items-center'>
                                                <Input addonBefore={<SearchOutlined />} variant="borderless" placeholder="Search" className='bg-white col-4 rounded-1' />
                                                <div className="col-8 d-flex gap-2 justify-content-end">
                                                    <p>Sender's Email</p>
                                                    <Select
                                                        showSearch
                                                        allowClear
                                                        placeholder="Select by email"
                                                        optionFilterProp="children"
                                                    // filterOption={filterOption}
                                                    // onChange={handleEmailSearch}
                                                    // style={{ width: "100%", boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2)" }}
                                                    // className="rounded-2"
                                                    >
                                                        <Option value="">Select</Option>
                                                        {/* {emails.map((email, index) => (
                                                          <Option
                                                         key={index}
                                                         value={email.id}
                                                         label={email.name}
                                                         >
                                                         {email.name}
                                                           </Option>
                                                         ))} */}
                                                    </Select>
                                                </div>
                                            </div>
                                            {/* table */}
                                            <div className="row">
                                                <div className="col-12 border-0 rounded-2">
                                                    <Table rowSelection={rowSelection} columns={columns} dataSource={alldata} pagination={pagination}
                                                        onChange={handleTableChange}
                                                    // pagination={{
                                                    //     position: 'topRight', // Set pagination position to top right
                                                    // }}
                                                    // scroll={{ x: 1000, }}
                                                    />
                                                </div>

                                            </div>
                                        </TabPane>


                                        <TabPane tab="Sent" key="2">
                                            Content of Tab Pane 2
                                        </TabPane>


                                        <TabPane tab="Spam" key="3">
                                            Content of Tab Pane 3
                                        </TabPane>


                                        <TabPane tab="Deleted" key="4">
                                            Content of Tab Pane 4
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </div>
                            <div className="col-lg-4 mx-3">
                                <div className="row d-flex justify-content-between align-items-center">
                                    <div className="col-5">
                                        <p className='text-capitalize textblackfigma'>email status</p>
                                    </div>
                                    <div className="col-1">
                                        <img src={threedot} alt="more" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserDashboard