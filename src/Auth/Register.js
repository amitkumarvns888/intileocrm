import React, { useEffect, useState } from 'react'
// import '../bootstrap.css'
import { registerUrl, getCompanyTypeUrl,getIndustryTypeUrl } from '../Config';
import image from './image/logo.png'
import { Button, Form } from 'react-bootstrap';
import icon from './image/icon.png'
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import './Abc.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, Link } from 'react-router-dom';

import { Select } from 'antd';



const Register = () => {
    const navigate = useNavigate()
    const [companytypedrp, setCompanytypedrp] = useState()

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const [companyType, setCompanyType] = useState([]);
    const [industryType, setIndustryType] = useState([]);
    const { Option } = Select;
    const getCompanyType = async (value) => {
        try {

            const result = await axios.get(`${getCompanyTypeUrl}`);
            setCompanyType(result.data.data.company_type);
        } catch (error) {
            console.log('Error fetching company type data:', error)
        }
    }
    const getIndustryType = async (value) => {
        try {
            const result = await axios.get(`${getIndustryTypeUrl}`);
            setIndustryType(result.data.data.industries);
        } catch (error) {
            
            console.log('Error fetching industry type data:', error)
        }
    }
    useEffect(() => {
        // Fetch data from API when component mounts
        getCompanyType();
        getIndustryType();
    }, []);
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };



    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        company: '',
        company_type: '',
        contact_no: '',
        industry: '',
        isHuman: false
    });

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [companynameError, setCompanynameError] = useState('');
    const [company_type, setCompanytypeError] = useState('');
    const [phoneNo, setPhoneNoError] = useState('');
    const [industry, setIndustryError] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        // const val = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData); // You can send this data to your backend or perform any other actions

        if (!formData.first_name && !formData.last_name && !formData.emailError && !formData.passwordError && !formData.companynameError && !formData.company_type && !formData.contact_no && !formData.industry) {
            setFirstNameError('First name is Required ');
            setLastNameError('Last name is Required ');
            setEmailError('Email is Required ');
            setPasswordError('Password  is Required ');
            setCompanynameError('Company Name  is Required ');
            setCompanytypeError('Company Name  is Required ');
            setPhoneNoError('Phone No  is Required ');
            setIndustryError('Industry  is Required ');

        }

        if (!formData.first_name) {
            setFirstNameError('First name is Required ');
            return; // Stop form submission if validation fails
        }
        else if (formData.first_name.length < 4) {
            setFirstNameError('Atleast Four character ');
            return;
        } else if (!/^[A-Za-z]+$/.test(formData.first_name)) {
            setFirstNameError('Only alphabetic characters allowed');
            return;
        }
        else {
            setFirstNameError('');
        }

        // last name 

        if (!formData.last_name) {
            setLastNameError('Last name is Required ');
            return; // Stop form submission if validation fails
        }
        else if (formData.last_name.length < 4) {
            setLastNameError('Atleast Four character ');
            return;
        } else if (!/^[A-Za-z]+$/.test(formData.last_name)) {
            setLastNameError('Only alphabetic characters allowed');
            return;
        }
        else {
            setLastNameError('');
        }


        // email error condition
        if (!formData.email) {
            setEmailError('Email is Required ');
            return; // Stop form submission if validation fails
        }
        else {
            setEmailError('');
        }

        //password error

        if (!formData.password) {
            setPasswordError('Password  is Required ');
            return; // Stop form submission if validation fails
        }
        else if (formData.password.length < 4) {
            setPasswordError('Atleast Four character ');
            return;
        }
        else if (!/(?=.*[A-Z])/.test(formData.password)) {
            setPasswordError('Password must contain at least one uppercase letter');
            return;
        } else if (!/(?=.*[a-z])/.test(formData.password)) {
            setPasswordError('Password must contain at least one lowercase letter');
            return;
        } else if (!/(?=.*\d)/.test(formData.password)) {
            setPasswordError('Password must contain at least one digit');
            return;
        }
        else {
            setPasswordError('');
        }


        // company error massage
        if (!formData.company) {
            setCompanynameError('Company Name  is Required ');
            return; // Stop form submission if validation fails
        }
        else {
            setCompanynameError('');
        }

        // company type error
        if (!formData.company_type) {
            setCompanytypeError('Company Name  is Required ');
            return; // Stop form submission if validation fails
        }

        else {
            setCompanytypeError('');
        }

        //phone number error

        if (!formData.contact_no) {
            setPhoneNoError('Phone No  is Required ');
            return; // Stop form submission if validation fails
        } else if (isNaN(formData.contact_no)) {
            setPhoneNoError('Phone No must contain only numbers');
            return;
        }
        else if (formData.contact_no.length !== 10) {
            setPhoneNoError('Phone No must be 10 digits long');
            return;
        }
        else {
            setPhoneNoError('');
        }
        //industry error

        if (!formData.industry) {
            setIndustryError('Industry  is Required ');
            return; // Stop form submission if validation fails
        }
        // else if (formData.industry.length < 4) {
        //     setIndustryError('Atleast Four character ');
        //     return;
        // }
        else {
            setIndustryError('');
        }

        // here i connect ali

        try {
            const response = await axios.post(`${registerUrl}`, formData);
            console.log('Registration successful:', response.data);
            navigate('/signin')

            // Optionally, you can perform actions like showing a success message or redirecting the user.
        } catch (error) {
            console.error('Registration failed:', error);
            // Optionally, you can handle errors, show error messages, or perform other actions based on the error.
        }

        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            company: '',
            company_type: '',
            contact_no: '',
            industry: '',
            // isHuman: false
        });


        toast.success('Register Successfully')
    };

    const onChange = (value) => {
        console.log("Captcha value:", value);
    }

    return (
        <div>
            <div className="logoimg">
                <img src={image} className='logoimg' alt='logo image' />
            </div>
            <div className="container">
                <div className="row rowregister">
                    <div className="col-md-6 maintext ">
                        <h2 className='heading'>Sign Up For Portal Name</h2>
                        <p className='paraa'>Already Have an account ? <span><Link to='/signin'>Login</Link></span> </p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div className=" mainCompo d-flex">
                            <div className="col-md-6 leftForm">
                                <Form.Group controlId="formFirstName" >
                                    <span className='req'>*</span>
                                    <Form.Label>First Name</Form.Label><br />
                                    <Form.Control type="text" placeholder='Enter First Name' className='placeholderColor' name="first_name" value={formData.first_name} onChange={handleChange} />
                                    {firstNameError && <div className="error-message">{firstNameError}</div>}
                                </Form.Group>


                                <Form.Group controlId="formEmail" className='formcompo'>
                                    <span className='req'>*</span>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" name="email" placeholder='Enter Email' value={formData.email} className='placeholderColor' onChange={handleChange} />

                                    {emailError && <div className="error-message">{emailError}</div>}
                                </Form.Group>

                                <Form.Group controlId="companyname" className='formcompo'>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control type="text" name="company" placeholder='Enter Company Name' value={formData.company} className='placeholderColor' onChange={handleChange} />

                                    {companynameError && <div className="error-message">{companynameError}</div>}
                                </Form.Group>


                                <Form.Group controlId="phonenumber" className='formcompo'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" name="contact_no" placeholder='Enter Phone Number' value={formData.contact_no} className='placeholderColor' onChange={handleChange} />

                                    {phoneNo && <div className="error-message">{phoneNo}</div>}
                                </Form.Group>

                                <ReCAPTCHA
                                    sitekey="6LdhDq0pAAAAAMS_5ZVv2xxwvtqoVHTJwGbe1Yup"
                                    onChange={onChange}
                                    className='recaptch'
                                />

                            </div>
                            {/* left side form */}

                            <div className="col-md-6 offset-md-1  rightdata">
                                <Form.Group controlId="formLastName">
                                    <span className='req'>*</span>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="last_name" placeholder='Enter Last Name' value={formData.last_name} className='placeholderColor' onChange={handleChange} />
                                    {lastNameError && <div className="error-message">{lastNameError
                                    }</div>}
                                </Form.Group>

                                <Form.Group controlId="formPassword" className='formcompo'>
                                    <span className='req'>*</span>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder='*******' value={formData.password} className='placeholderColor' onChange={handleChange} />
                                    <img src={icon} className='settingiconimg' alt='setting iamge' />

                                    {passwordError && <div className="error-message">{passwordError}</div>}
                                </Form.Group>

                                {/* company type dropdown */}

                                <Form.Group controlId="formIndustry" className='formcompo'>
                                    <span className='req'>*</span>
                                    <Form.Label>Company Type</Form.Label>
                                    <Form.Control as="select" className='placeholderColor' name="company_type" value={formData.company_type} onChange={handleChange}>
                                        <option value="">Select Company Type</option>
                                        {
                                            companyType.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>

                                    {company_type && <div className="error-message">{company_type}</div>}
                                   
                                </Form.Group>


                                <Form.Group controlId="formIndustry" className='formcompo'>
                                    <span className='req'>*</span>
                                    <Form.Label>Industry</Form.Label>
                                    <Form.Control as="select" className='placeholderColor' name="industry" value={formData.industry} onChange={handleChange}>
                                        <option value="" as="select">Select Industry</option>
                                        {
                                            industryType.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }

                                    </Form.Control>

                                    {industry && <div>{industry}</div>}
                                </Form.Group>


                                <Button variant="primary" className='nextbtn' type="submit">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register
