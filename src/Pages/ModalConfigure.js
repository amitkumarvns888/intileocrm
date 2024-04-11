import React, { useState, useEffect } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { configureModal, API_HEADER } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModalConfigure = () => {

    const navigate = useNavigate();
    let [modalVisible, SetModalVisible] = useState(false);
    let [formdisable, SetFormDisabled] = useState(false);
    const [editorRemarks, setEditorRemarks] = useState('');
    const [configureform] = Form.useForm();
    const handleEditorChange = (content) => {
        setEditorRemarks(content);
    };
    const openVerifyModal = () => {
        window.scrollTo(0, 0);
        SetModalVisible(true);
        configureform.setFieldsValue(clientData);
        SetFormDisabled(false);

    }
    const configureFormSubmit = (values) => {
        configureform.validateFields()
            .then((values) => {

                const requestData = {
                    ...values,
                    // client_id 
                }

                axios.post(`${configureModal}`, requestData,
                    //  API_HEADER
                )
                    .then((result) => {
                        if (result.status === 200 && result.data.status === true) {

                            if (client_id === null) {
                                toast.success('verified Successfully!');
                            } else {
                                toast.success('Client Details Updated Successfully!');
                            }

                            configureform.resetFields();
                            SetModalVisible(false);
                            //   SetCallApi(true);
                            navigate('/dashboard')
                        }
                    }).catch((error) => {
                        console.log(error);
                        toast.error(error.response.data.message);
                    })

            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    }


    return (
        <>
            <button className='btn border-0 btn-primary text-white bg_green' style={{ fontSize: '14px' }} onClick={openVerifyModal}>Add Client</button> : ''
            <Modal visible={modalVisible}
                onOk={configureFormSubmit}
                onCancel={() => {
                    SetModalVisible(false);
                }}

                okText="Submit"
                okButtonProps={{ style: { display: formdisable ? 'none' : '' } }}
                width={800}
                centered
            >



                <Form form={configureform} onFinish={configureFormSubmit} layout="vertical" disabled={formdisable}>

                    <p className='textcolorblue fw-bold' style={{ fontSize: '30px', color: '#002329' }}>Configure Sender’s</p>

                    <Row gutter={[8, 4]}>
                        <Col span={12}>
                            <Form.Item name="name" label={<span style={{ color: '##006D75' }}>Host Name</span>}

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
                            <Form.Item name="port_number" label={<span style={{ color: '#006D75' }}>Port Number</span>}
                                rules={[
                                    { required: true, message: 'Port Number is required' },
                                    { pattern: /^[0-9]+$/, message: 'Port Number must contain only digits' },

                                ]}>
                                <Input maxLength={10} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="name" label={<span style={{ color: '##006D75' }}>Imap Host</span>}

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
                            <Form.Item name="port_number" label={<span style={{ color: '#006D75' }}>Imap Port</span>}
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
                                <Input type="email" placeholder="name@example.com" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="name" label={<span style={{ color: '##006D75' }}>Sender’s Name</span>}

                                rules={[
                                    { required: true, message: 'Sender’s Name is required' },
                                    {
                                        pattern: /^[&,.\-_\w\s]{1,50}$/,
                                        message: 'Please enter a valid Sender’s Name (up to 50 characters, only &, , ., -, _ special characters are allowed)'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>


                    </Row>


                    <Row gutter={[8, 4]}>
                        <Col span={24}>
                            <div class="mt-3 mb-3 d-grid">

                                <ReactQuill
                                    theme="snow"
                                    value={editorRemarks}
                                    onChange={handleEditorChange}
                                    style={{ width: '50vw', height: '20vh', margin: 'auto' }}
                                />
                            </div>

                        </Col>
                    </Row>

                </Form>

            </Modal>
        </>
    )
}

export default ModalConfigure