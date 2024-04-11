import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import image from './image/logo.png'
import './Abc.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Resetpass = () => {
    const navigate = useNavigate()

    const location = useLocation();
    const { email } = location.state || {};

    useEffect(() => {
        setFormData({ email })
    }, [email])

    const [formData, setFormData] = useState({
        email: email,
        otp: '',
        password: '',
        password_confirmation: ''
    });

    const [passwordError, setPasswordError] = useState('');
    const [otp, setOtpError] = useState('');
    const [password_confirmationError, setpassword_confirmationError] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(otpval,password,password_confirmation); // You can send this data to your backend or perform any other actions

        //here api calling

        try {
            const response = await axios.post('https://intileo-tech.info/api/user/change-password', formData);


            console.log(response)
            toast.success("Password changed successfully");

            navigate('/signin')

        } catch (error) {


            if (error.response.data.message == 'Invalid OTP') {
                console.log(error.response.data.message);
                toast.error(error.response.data.message)

            } else {
                console.log(error.response.data.message);
                toast.error(error.response.data.data)

            }


            // if (error.data) {
            //     console.log(error.data)
            //     const err1 = error.data
            //     toast.error(err1);
            // } else {
            //     toast.success('Error occurred:', error);
            // }

        }



        if (!formData.otp && !formData.password && !formData.password_confirmation) {
            setOtpError('Otp is Required ');
            setPasswordError('Password  is Required ');
            setpassword_confirmationError('Confirm Password  is Required ');


        }

        //otp val  condition
        if (!formData.otp) {
            setOtpError('Otp is Required ');
            return; // Stop form submission if validation fails
        }
        else {
            setOtpError('');
        }
        //password condition        

        if (!formData.password) {
            setPasswordError('Password is Required ');
            return; // Stop form submission if validation fails
        }
        else {
            setPasswordError('');
        }


        //password_confirmationword 

        if (!formData.password_confirmation) {
            setpassword_confirmationError('Confirm Password is Required ');
            return; // Stop form submission if validation fails
        }
        else {
            setpassword_confirmationError('');
        }



        // for input empty
        setFormData({
            otp: '',
            password: '',
            password_confirmation: '',

        })

    };

    // const notifyfun = () => {
    //     toast.success(response.data.message)
    // }


    return (
        <div>
            <div className="logoimg">
                <img src={image} className='logoimg' alt='logo image' />
            </div>

            <div className="container">
                <div className="row">
                    <div className="resetmain  ">
                        <h2 className='heading'>Forget Password</h2>

                        <Form onSubmit={handleSubmit}>
                            <div className="col-md-5 leftForm">

                                <Form.Group controlId="email" className='ctrll'>
                                    <Form.Label>Your Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        value={email}
                                        readOnly
                                        onChange={handleChange}
                                        className='placeholderColor form3email'
                                    />
                                </Form.Group>

                                {/* here i get data api and use  in form */}
                                <Form.Group controlId="otpval" className='ctrll'>
                                    <span className='req'>*</span>
                                    <Form.Label>Enter Otp</Form.Label>
                                    <Form.Control
                                        name="otp"
                                        placeholder="Enter otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        maxLength={4}

                                        className='placeholderColor form3email'
                                    />
                                    {otp && <div className="error-message">{otp}</div>}
                                </Form.Group>
                                <Form.Group controlId="formpassword" className='ctrl'>
                                    <span className='req'>*</span>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        value={formData.password}
                                        onChange={handleChange}

                                        className='placeholderColor form3email'
                                    />
                                    {passwordError && <div className="error-message">{passwordError}</div>}
                                </Form.Group>

                                <Form.Group controlId="formpassword_confirmation" className='ctrl'>
                                    <span className='req'>*</span>
                                    <Form.Label>confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Enter confirm Password"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}

                                        className='placeholderColor form3email'
                                    />
                                    {password_confirmationError && <div className="error-message">{password_confirmationError}</div>}
                                </Form.Group>


                                <br />
                                <Link to='/signin' className='returnlog' style={{ textDecoration: "none" }} >Return Login </Link>
                                <div className='form3btm'></div>

                                <Button variant="primary" className='resetbtn' type="submit">
                                    submit
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

export default Resetpass
