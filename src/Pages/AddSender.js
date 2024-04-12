import React, { useState } from 'react'
import Header from '../Component/Header'
import SideNavbar from '../Component/SideNavbar'
import Footer from '../Component/Footer'
import cardimage from '../crmimage/cardimage.png'
import { Card, Form, Button } from 'react-bootstrap';
import Bootstpcard from '../Component/Bootstpcard';
import axios from 'axios';
import { API_HEADER, addSenderUrl } from '../Config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddSender = () => {

    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState('');
    const [sendername, setSendername] = useState('');
    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const verifyhandler = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                email: email,
                sender_name: sendername,
            }
            const response = await axios.post(`${addSenderUrl}`, payload, API_HEADER);
            if (response.status === 200) {
                toast.success(response.data.message)
                navigate('/senderverify', { state: { email } });
                // navigate(`/senderverify/${email}`);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }

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
                                    <li className="breadcrumb-item active"><b>Sender</b></li>
                                </ol>
                                <h2 className='font30'>Sender </h2>
                                <Button variant="primary" type="submit" onClick={toggleForm} className='addsenderbtn'>
                                    Add Sender
                                </Button>

                                <hr className='dashbhrline' />
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </div>

                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {showForm && (
                            <Form>
                                <div style={{ display: 'flex' }}>
                                    <Form.Group controlId="formFromName">
                                        <span className='req'>*</span>
                                        <Form.Label>From Name</Form.Label>
                                        <Form.Control type="text" className='formcontrolclass' placeholder="Enter your name" value={sendername} onChange={(e) => setSendername(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formFromEmail" style={{ marginLeft: "16px" }}>
                                        <span className='req'>*</span>
                                        <Form.Label>From Email Address</Form.Label>
                                        <Form.Control type="email" className='formcontrolclass' placeholder="Text Here" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <br />
                                <Button variant="primary" type="submit" className="me-2" onClick={verifyhandler} >Save</Button>
                                <Button variant="btn btn-outline-dark" onClick={toggleForm}>Cancel</Button>
                            </Form>
                        )}



                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default AddSender
