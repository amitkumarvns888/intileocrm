import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import image from './image/logo.png'
import './Abc.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

const Forgetmail = () => {

    const [email, setEmail] = useState("")

    const [emailError, setEmailError] = useState('');

    const navigate = useNavigate()




    const handleChange = (e) => {
        setEmail(e.target.value)
        console.log(e.target.value);
        console.log(email)


    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        //api code
        try {
            const response = await axios.post('https://intileo-tech.info/api/forget-password', { email });
            console.log('Registration successful:', response.data);
           console.log("cbhbsds")
            navigate('/resetpass', { state: { email } })
        } catch (error) {
            console.error('Registration failed:', error);

        }








        if (!email) {
            setEmailError('Email is Required ');
            return; // Stop form submission if validation fails
        }
        else {
            setEmailError('');
        }
    };

    const notifyfun = () => {

        toast.success("Otp send Register email")
    }




    // navigate



    return (
        <div>
            <div className="logoimg">
                <img src={image} className='logoimg' alt='logo image' />
            </div>

            <div className="container">
                <div className="row">
                    <div className="resetmain  ">
                        <h2 className='heading'>Reset Your Account</h2>
                        <p className='paraa'>We will send you an email to reset Your account  </p>
                        {/* <br /> */}

                        <Form onSubmit={handleSubmit}>
                            <div className="col-md-5 leftForm">
                                <Form.Group controlId="formEmail">
                                    <span className='req'>*</span>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={handleChange}

                                        className='placeholderColor form3email'
                                    />
                                    {emailError && <div className="error-message">{emailError}</div>}
                                </Form.Group>
                                <br />


                                <br />
                                <Link to='/signin' className='returnlog' style={{ textDecoration: "none" }} >Return Login </Link>
                                <div className='form3btm'></div>

                                <Button variant="primary" onClick={notifyfun} className='resetbtn' type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Forgetmail
