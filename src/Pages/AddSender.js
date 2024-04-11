import React,{useState} from 'react'
import Header from '../Component/Header'
import SideNavbar from '../Component/SideNavbar'
import Footer from '../Component/Footer'
import cardimage from '../crmimage/cardimage.png'
import { Card,Form, Button } from 'react-bootstrap';
import Bootstpcard from '../Component/Bootstpcard';

const AddSender = () => {


    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    const verifyhandler =()=>{
        
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
                                <div style={{display:'flex'}}>
                                    <Form.Group controlId="formFromName">
                                        <span className='req'>*</span>
                                        <Form.Label>From Name</Form.Label>
                                        <Form.Control type="text" className='formcontrolclass' placeholder="Enter your name" />
                                    </Form.Group>
                                    <Form.Group controlId="formFromEmail" style={{marginLeft:"16px"}}>
                                        <span className='req'>*</span>
                                        <Form.Label>From Email Address</Form.Label>
                                        <Form.Control type="email" className='formcontrolclass' placeholder="Text Here" />
                                    </Form.Group>
                                </div>
                                <br/>
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
