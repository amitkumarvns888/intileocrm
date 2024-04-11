import React, { useState, useEffect } from 'react'
import ImageCompo from './ImageCompo'
import { Form, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const QuestionForm3 = () => {

    const navigate = useNavigate()
    const [formdata3, setFormData3] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://intileo-tech.info/api/admin/question/index');
            console.log(response.data.data.questions)
            setFormData3(response.data.data.questions);
            console.log(formdata3)

            

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };


    const handlenext=()=>{
        navigate('/dashboard')
    }

    return (
        <div>
            <div className='image-main'>

                <ImageCompo />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12  form2col">
                        <div className='form3uppper'>
                            <div className='num'>1</div><span className='hrtext'>Goal</span><hr className='hline' />
                            <div className='num'>2</div> <span className='hrtext'>Feature List</span><hr className='hrlinee' />
                            <div className='num'>{formdata3[2]?.id}</div><span className='hrtext'>{formdata3[2]?.title}</span>
                        </div>
                        <div className='form3down'>

                            <div className='form3downinside'>



                                <h1 style={{ fontSize: "25px", fontWeight: '600' }}>{formdata3[2]?.question}</h1>
                                <p className='form1pa'>{formdata3[2]?.description}</p>

                                <br />


                                <Form>

                                    <div key={'vertica'} className="mb-3 ">
                                        <Form.Label className='form3label'>How many people are there in your team? </Form.Label>
                                        <Form.Select className='form3choose'>
                                            <option>Choose an option</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </Form.Select>
                                        <br />

                                        <Form.Label className='form3label'>How many contact do you have? </Form.Label>
                                        <Form.Select className='form3choose'>
                                            <option>Choose an option</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                        </Form.Select>


                                    </div>

                                    <Link to='#' className='form3skipbtn'>Skip <div className='form3skipbottomline'></div> </Link>

                                    <Button variant="primary" className='form3nextbtn btn-md' type="submit"  onClick={handlenext}>
                                        Next
                                    </Button>
                                </Form>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionForm3
