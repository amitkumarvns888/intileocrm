import React, { useState } from 'react'
import Header from '../Component/Header'
import SideNavbar from '../Component/SideNavbar'
import Footer from '../Component/Footer'
import cardimage from '../crmimage/cardimage.png'
import { Card, Form, Button } from 'react-bootstrap';
import Bootstpcard from '../Component/Bootstpcard';

const SenderVerifyemail = () => {

   
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
                        <input type='text' className='inputcls' placeholder='0000' />

                        

                    </div>
                    <div className='btnverify'>
                        <Button variant="primary" type="submit" className="me-2">Verify</Button>
                        <Button variant="btn btn-outline-dark">Cancel</Button>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default SenderVerifyemail
