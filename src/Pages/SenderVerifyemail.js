import React, { useState } from 'react'
import Header from '../Component/Header'
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import SideNavbar from '../Component/SideNavbar'
import Footer from '../Component/Footer'
import cardimage from '../crmimage/cardimage.png'
// import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_HEADER,verifyEmailConfig,configureModal } from '../Config';
import Bootstpcard from '../Component/Bootstpcard';
import { useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const SenderVerifyemail = () => {

   const [otp, setOtp] = useState('');
const navigate = useNavigate();
const location = useLocation();
// const { email } = useParams();
   const verifyEmailhandler = async() => {
   try {
    if (!location.state || !location.state.email) {
        // Handle the case where location.state or location.state.email is undefined
        console.error("Email is undefined in location state");
        return;
    }
    const payload={
        email:location.state.email,
        verify_code:otp,
    }
 const response = await axios.post(`${verifyEmailConfig}`, payload, API_HEADER);
if (response.status === 200) {
    toast.success(response.data.message);
    // navigate('/dashboard');
    openVerifyModal();
}
   } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
   }    
   }


//    modal page
let [modalVisible, SetModalVisible] = useState(false);
let [formdisable, SetFormDisabled] = useState(false);
const [editorRemarks, setEditorRemarks] = useState('');
const [configureform] = Form.useForm();
const handleEditorChange = (content) => {
    setEditorRemarks(content);
};

const SenderData = {
    
}
const openVerifyModal = () => {
   
    SetModalVisible(true);
    configureform.setFieldsValue({
        email: location.state.email, // Fill email field with location state email
        sender_name: location.state.sendername // Fill sender's name field with location state senderName
    });

}
const configureFormSubmit = (values) => {
    configureform.validateFields()
        .then((values) => {

            // const payload = {

            //     email: email,
            //     sender_name: sendername,
            //     host:host,
            //     port:port,
            //     imap_host:imap_host,
            //     imap_port:imap_port,
            //     sign:sign,
            // }
            const requestData = {
                ...values,
            //   payload
            }

            axios.post(`${configureModal}`, requestData,
                 API_HEADER
            )
                .then((result) => {
                    if (result.status === 200 && result.data.success === true) {

                        // if (client_id === null) {
                            toast.success(result.data.message);
                        // } else {
                        //     toast.success('Client Details Updated Successfully!');
                        // }

                        configureform.resetFields();
                        SetModalVisible(false);
                        //   SetCallApi(true);
                        navigate('/dashboard')
                    }
                }).catch((error) => {
                    console.log(error);
                    toast.error(error.result.data.message);
                })

        })
        .catch((errorInfo) => {
            console.log('Validation failed:', errorInfo);
        });
}

    return (
        <div>
            <Header />
            <SideNavbar />
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">

                            <div className="col-sm-6">
                                <ol className="breadcrumb ">
                                    <li className="breadcrumb-item">Home</li>
                                    <li className="breadcrumb-item active">Dashboard v1</li>
                                    <li className="breadcrumb-item active">Analytics</li>
                                    <li className="breadcrumb-item active">Sender</li>
                                    <li className="breadcrumb-item active"><b>Verify Email</b></li>

                                </ol>
                                <h2 className='font30'>New Sender </h2>
                                

                                <hr className='dashbhrline' />
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </div>

                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className='lineheightclass'>
                            <p>To use this sender email, your email address must be verified.</p>
                            <p>We have sent a verification code by email.</p>
                            <span>If you haven't received the verification code, click on</span> <span> <a href='#'> Resend Verification Code</a> </span>
                        </div>
                    <br />
                        <label className='verifyinputsender'><a href='#'>Enter the code sent on “mentioned mail address here” to verify your sender email</a> </label><br />
                        <input type='text' className='inputcls' placeholder='0000' value={otp} onChange={(e) => { setOtp(e.target.value) }} />

                        

                    </div>
                    <div className='btnverify'>
                        <button variant="primary" type="submit" className="me-2" onClick={verifyEmailhandler}>Verify</button>
                        <button variant="btn btn-outline-dark" onClick={() => navigate('/addsender')}>Cancel</button>
                    </div>
                </section>


                <Modal visible={modalVisible}
                onOk={configureFormSubmit}
                onCancel={() => {
                    SetModalVisible(false);
                }}

                okText="Save & Next"
                okButtonProps={{ style: { marginTop: '2rem' } }}
                width={800}
                centered
            >



                <Form form={configureform} onFinish={configureFormSubmit} layout="vertical" disabled={formdisable}>

                    <p className='textcolorblue fw-bold' style={{ fontSize: '30px', color: '#002329' }}>Configure Sender’s</p>

                    <Row gutter={[8, 4]}>
                        <Col span={12}>
                            <Form.Item name="host" label={<span style={{ color: '#006D75' }}>Host Name</span>}

                                rules={[
                                    { required: true, message: 'Host Name is required' },
                                    {
                                        pattern: /^[&,.\-_\w\s]{1,50}$/,
                                        message: 'Please enter a valid Host Name (up to 50 characters, only &, , ., -, _ special characters are allowed)'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item name="port" label={<span style={{ color: '#006D75' }}>Port Number</span>}
                                rules={[
                                    { required: true, message: 'Port Number is required' },
                                    { pattern: /^[0-9]+$/, message: 'Port Number must contain only digits' },

                                ]}>
                                <Input maxLength={10} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="imap_host" label={<span style={{ color: '#006D75' }}>Imap Host</span>}

                                rules={[
                                    { required: true, message: 'Imap Host is required' },
                                    {
                                        pattern: /^[&,.\-_\w\s]{1,50}$/,
                                        message: 'Please enter a valid Imap Host (up to 50 characters, only &, , ., -, _ special characters are allowed)'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item name="imap_port" label={<span style={{ color: '#006D75' }}>Imap Port</span>}
                                rules={[
                                    { required: true, message: 'Imap Port is required' },
                                    { pattern: /^[0-9]+$/, message: 'Imap Port Number must contain only digits' },

                                ]}>
                                <Input maxLength={10} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="email" label={<span style={{ color: '#006D75' }}>Email Address (Username)</span>}
                                rules={[
                                    { required: true, message: 'Email is required' },
                                    { type: 'email', message: 'Invalid email' },
                                    {
                                        pattern: /^[&,.\-_\w\s@]{1,50}$/,
                                        message: 'Please enter a valid email (up to 50 characters, only @, &, , ., -, _ special characters are allowed)'
                                    }
                                ]}>
                                <Input type="email" placeholder="name@example.com" value ={location.state.email} readOnly/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="sender_name" label={<span style={{ color: '#006D75' }}>Sender’s Name</span>}

                                rules={[
                                    { required: true, message: 'Sender’s Name is required' },
                                    {
                                        pattern: /^[&,.\-_\w\s]{1,50}$/,
                                        message: 'Please enter a valid Sender’s Name (up to 50 characters, only &, , ., -, _ special characters are allowed)'
                                    }
                                ]}
                            >
                                <Input  readOnly/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="password" label={<span style={{ color: '#006D75' }}>Password</span>}

                                rules={[
                                    { required: true, message: 'Password is required' },
                                    {
                                        pattern: /^[&,.\-_\w\s]{1,50}$/,
                                        message: 'Please enter a valid Password (up to 50 characters, only &, , ., -, _ special characters are allowed)'
                                    }
                                ]}
                            >
                                <Input type="password" placeholder="Password"/>
                            </Form.Item>
                        </Col>


                    </Row>


                    <Row gutter={[8, 4]}>
                        <Col span={20}>
                         
                            <Form.Item name="sign" label={<span style={{ color: '#006D75' }}>Signature</span>}
                            //   rules={[
                            //     { required: true, message: 'Signature is required' },
                              
                            // ]}
                            >
                               {/* <div className=" d-grid">  */}
                                <ReactQuill
                                    placeholder='Image and Text Based Signature can be added here..'
                                    theme="snow"
                                    value={editorRemarks}
                                    onChange={handleEditorChange}
                                    style={{ width: '44vw', height: '10vh', margin: 'auto' }}
                                    className="mt-3 mb-3 d-grid"
                                  />
                                {/* </div> */}
                            </Form.Item>
                          

                        </Col>
                    </Row>

                </Form>

            </Modal>
            </div>
            <Footer />
        </div>
    )
}

export default SenderVerifyemail
