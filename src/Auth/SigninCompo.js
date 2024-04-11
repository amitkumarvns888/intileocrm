import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import icon from './image/icon.png'
import image from './image/logo.png'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import './Abc.css'

const SignCompo = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        let errorMessage = '';
        if (name === 'email') {
            // Custom email validation
            if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                errorMessage = 'Invalid email address';
            }
        }


        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData); // You can send this data to your backend or perform any other actions

        if (!formData.email && !formData.password) {
            setEmailError('Email is Required ');
            setPasswordError('Password  is Required ');

        }

        if (!formData.email) {
            setEmailError('Email is Required ');
            return; // Stop form submission if validation fails
        }
        else {
            setEmailError('');
        }


        if (!formData.password) {
            setPasswordError('Password is Required ');
            return; // Stop form submission if validation fails
        }
        else {
            setPasswordError('');
        }

        try {
            const response = await axios.post('https://intileo-tech.info/api/login', formData);
            console.log('Login successful:', response.data);
            console.log(response.status);
            if (response.status == 200) {

                toast.success('Login Successfully');

                sessionStorage.setItem("token", response.data.data.token);
                sessionStorage.setItem("name", response.data.data.name);
                sessionStorage.setItem('user', JSON.stringify(response.data.data.user));

                
                window.location.reload()

            } else {

                toast.error(response.data.error);

            }

            
            // Optionally, you can perform actions like showing a success message or redirecting the user.
        } catch (error) {
            console.error('Login failed:', error);
            // Optionally, you can handle errors, show error messages, or perform other actions based on the error.
        }
        // toast.success('User Login SuccessFully')

        setFormData({
            email: '',
            password: ''
        })

    };



    const notifyfun = () => {
        // toast.success("You Are Successfully Login")

        navigate('/onboarding')
    }
    return (
        <div>
            <img src={image} className='logoimg' style={{ marginTop: "15px", marginLeft: "10px" }} alt='logo image' />

            <div className='containe formmain2'>
                <div className="row">
                    <div className="col rowdiv">

                        <h2 className='formheading2'>Sign in For Portal Name</h2>
                        <p className='para'>New Member ? <span><Link to='/' className='form2bbtm' style={{ textDecoration: 'none' }} >Create an Account</Link> </span> </p>


                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <span className='req'>*</span>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}

                                    className='placeholderColor'
                                />
                                {emailError && <div className="error-message">{emailError}</div>}
                            </Form.Group>

                            <Form.Group controlId="formPassword" className='formcompo'>
                                <span className='req'>*</span>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="*********"
                                    value={formData.password}
                                    onChange={handleChange}

                                    className='placeholderColor'

                                />
                                <img src={icon} className='settingiconimg' alt='setting iamge' />
                                {passwordError && <div className="error-message">{passwordError}</div>}
                            </Form.Group>
                            <br />
                            <input type='checkbox' className='check' /> <span>Keep Me Logged In</span>
                            <br />
                            <br />
                            <Link to='/forgetmail' className='forgetbtn'>Forget Password ?</Link>
                            <div className='borderbtm'></div>
                            <br />
                            <Button variant="primary" className='form2loginbtn' onClick={notifyfun} type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default SignCompo;
