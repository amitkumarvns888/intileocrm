import React, { useState, useEffect } from 'react'
import { Card, Button, Form, ListGroup } from 'react-bootstrap';
import vector from './image/Vector.png';
import './Abc.css'
import image from './image/logo.png'
import tick from './image/tick.png';
import Vector3 from './image/Vector3.png';
import vector2 from './image/Vector2.svg'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserPlan = () => {
    const navigate=useNavigate()

    const [plans, setPlans] = useState([]);

    const [isSwitchOn, setIsSwitchOn] = useState(0);

    const handleSwitchChange = () => {
        setIsSwitchOn(prevValue => prevValue === 0 ? 1 : 0);
        console.log(isSwitchOn)
    };

    const submitform = () => {
        //here i use api calling

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://intileo-tech.info/api/admin/plan/plantype/${isSwitchOn}`);
                console.log(response.data.data.planType)
                // const filteredPlans = response.data.filter(plan => plan.plan_type === 0);
                setPlans(response.data.data.planType);

            } catch (error) {
                console.error('Failed to fetch plans:', error);
            }
        };

        fetchData();
    }, [isSwitchOn]);


    const buynow=()=>{
        navigate('/signin')
    }

    return (

        <div>

            <img src={image} className='logoimg' alt='logo image' />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <Form onSubmit={submitform}>

                            <Form.Group controlId="formSwitch" className="d-flex align-items-center">

                                <div className={`col-md-6 leftlabel ${isSwitchOn ? 'light-label' : 'bold-label'}`}>
                                    <Form.Label>Billed Yearly</Form.Label>
                                </div>

                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label=""


                                    checked={isSwitchOn === 1}
                                    onChange={handleSwitchChange}
                                    className='toggalbtn'
                                    style={{position:'relative',left:'-50px',width:'30px'}}

                                />

                                <div className={`col-md-6 righttext ${isSwitchOn ? 'bold-label' : 'light-label'}`}>
                                    <Form.Label>Billed Monthly</Form.Label>
                                </div>
                            </Form.Group>



                            <p className='dashpara' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat magni ratione ex nobis odio optio nemo cumque commodi voluptatibus atque, quae totam cum ipsam possimus qui obcaecati error saepe odit?</p>

                        </Form>
                    </div>
                    {/* {plans.map((item)=>{ */}

                    <div className="row">

                        {plans.map(plan => (
                            <div className="col-md-4  planborder " key={plan.id}  >
                                <div className='upper'>
                                    <img src={vector2} alt='vector image' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: '800', fontSize: '20px' }}>{plan.name}</span>
                                    <p className='dashparaa'>{plan.remarks}</p>
                                </div>
                                <span className='trail price price'><b style={{ fontSize: "20px", color: "#262626" }}> &#36;{plan.amount} </b> &nbsp;&nbsp;{plan.plan_days
                                }&nbsp;Days</span>
                                <br />
                                <button onClick={buynow} style={{width:"160px",marginLeft:"16px"}} className='btn btn-primary' >Buy Now</button>
                                <hr className='hrline' />
                                <div className='down'>
                                    <ul>
                                        {/* {plan.features.map((feature, index) => (
                                            <li key={index}><img src={tick} alt="" className='tickimage' />{feature}</li>
                                        ))} */}

                                        <li > <img src={tick} alt="" className='tickimage' />One End Product</li>
                                        <li><img src={tick} alt="" className='tickimage' /> No attribute required</li>
                                        <li><img src={tick} alt="" className='tickimage' /> TypeScript</li>
                                        <li><img src={tick} alt="" className='tickimage' /> Fifma Design Resource</li>
                                        <li><img src={tick} alt="" className='tickimage' /> Create Multipal Product</li>
                                        <li><img src={tick} alt="" className='tickimage' /> Create a SaaS Project</li>

                                    </ul>
                                </div>
                            </div>
                        ))}

                        {/* </div> */}

                        {/* <div className="col-md-4 card">
                            <div className='upper'>
                                <img src={vector2} alt='vector image' />&nbsp;&nbsp;&nbsp;  <span style={{ fontWeight: '800', fontSize: '20px' }}>{plans.name}</span>

                                <p className='dashparaa'>{plans.remarks}</p>
                            </div>
                            <span className='trail price'><b style={{ fontSize: "20px", }}> &#36;{plans.amount} </b> &nbsp;&nbsp;{plans.plan_days
                            }</span>

                            <button>Buy Now</button>
                            <hr className='hrline' />

                            <div className='down'>
                                <ul>
                                    <li > <img src={tick} alt="" className='tickimage' />One End Product</li>
                                    <li><img src={tick} alt="" className='tickimage' /> No attribute required</li>
                                    <li><img src={tick} alt="" className='tickimage' /> TypeScript</li>
                                    <li><img src={tick} alt="" className='tickimage' /> Fifma Design Resource</li>
                                    <li><img src={tick} alt="" className='tickimage' /> Create Multipal Product</li>
                                    <li><img src={tick} alt="" className='tickimage' /> Create a SaaS Project</li>

                                </ul>
                            </div>

                        </div> */}
                        {/* <div className="col-md-4 card">
                            <div className='upper'>
                                <img src={Vector3} alt='vector image' />&nbsp;&nbsp;&nbsp; <span style={{ fontWeight: '800', fontSize: '20px' }}>Extended</span>

                                <p className='dashparaa'>Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.</p>
                            </div>
                            <span className='trail price'><b style={{ fontSize: "20px", }}> &#36;599</b> &nbsp;&nbsp; Lifetime</span>

                            <button>Buy Now</button>
                            <hr className='hrline' />

                            <div className='down'>
                                <ul>
                                    <li > <img src={tick} alt="" className='tickimage' />One End Product</li>
                                    <li><img src={tick} alt="" className='tickimage' /> No attribute required</li>
                                    <li><img src={tick} alt="" className='tickimage' /> TypeScript</li>
                                    <li><img src={tick} alt="" className='tickimage' /> Fifma Design Resource</li>
                                    <li><img src={tick} alt="" className='tickimage' /> Create Multipal Product</li>
                                    <li><img src={tick} alt="" className='tickimage' /> Create a SaaS Project</li>

                                </ul>
                            </div>

                        </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserPlan
