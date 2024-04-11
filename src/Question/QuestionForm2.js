import React,{useState,useEffect} from 'react'
import ImageCompo from './ImageCompo'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const QuestionForm2 = () => {
    const navigate=useNavigate()
    const [formdata2, setFormData2] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response2 = await axios.get('https://intileo-tech.info/api/admin/question/index');
            console.log(response2.data.data.questions)
            setFormData2(response2.data.data.questions);
            console.log(formdata2[1]?.id)


            if (response2.status === 200) {
                navigate('/onboardQuestion3');
            } else {
                console.error('Unexpected response status:', response2.status);
            }
            

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };



    return (
        <div>
            <div className='image-main'>

                <ImageCompo />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12  form2col">
                        <div className='form2uppper'>
                            <div className='num'>1</div><span className='hrtext'>Goal</span><hr className='hline' />
                            <div className='num'>{formdata2[1]?.id}</div> <span className='hrtext'>{formdata2[1]?.title}</span><hr className='hrlinee' />
                            <div className='num'>3</div><span className='hrtext'>Contact Range</span>
                        </div>
                        <div className='form2down'>

                            <h1 style={{ fontSize: "30px", fontWeight: '600' }}>{formdata2[1]?.question}</h1>
                            <p className='form1pa'>{formdata2[1]?.description} </p>

                            <br />


                            <Form>
                                <div key={'vertical-radio'} className="mb-3 leftcheckbox">
                                    <div >
                                        <div className='formcheckbtn'>
                                            <Form.Check
                                                type="checkbox"
                                                label="Email Templates"
                                                id="checkbox-1"
                                                style={{ fontSize: "18px" }}
                                            />
                                        </div>
                                        {/* <br /> */}
                                        <div className='formcheckbtn'>
                                            <Form.Check
                                                type="checkbox"
                                                label="SMS Marketing"
                                                id="checkbox-1"
                                                style={{ fontSize: "18px" }}

                                            />
                                        </div>
                                        {/* <br /> */}
                                        <div className='formcheckbtn'>
                                            <Form.Check
                                                type="checkbox"
                                                label="Forms & Landing Pages"
                                                id="checkbox-1"
                                                style={{ fontSize: "18px" }}

                                            />
                                        </div>
                                        <div className='formcheckbtn'>
                                            <Form.Check
                                                type="checkbox"
                                                label="CRM"
                                                id="checkbox-1"
                                                style={{ fontSize: "18px" }}

                                            />
                                        </div>

                                    </div>
                                    <div className='rightcheckbox'>
                                        <div className='formcheckbtn'>
                                            <Form.Check
                                                type="checkbox"
                                                label="CRM"
                                                id="checkbox-1"
                                                style={{ fontSize: "18px" }}

                                            />
                                        </div>

                                        <div className='formcheckbtn'>
                                            <Form.Check
                                                type="checkbox"
                                                label="CRM"
                                                id="checkbox-1"
                                                style={{ fontSize: "18px" }}

                                            />
                                        </div>
                                    </div>

                                </div>
                                <Link to='#' className='form2skipbtn'>Skip <div className='form2skipbottomline'></div> </Link>

                                <Button variant="primary" className='form1nextbtn btn-md' type="submit">
                                    Next
                                </Button>
                            </Form>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionForm2
