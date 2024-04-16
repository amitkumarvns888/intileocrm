import React from 'react'
import { Card, Button } from 'react-bootstrap';
import cardimage from '../crmimage/cardimage.png'
import { Link } from 'react-router-dom';
import '../App.css'
const Bootstpcard = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <Card style={{ width: "288px", height: '180px', marginLeft: '-130px' }} >
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <div>
                                    <Card.Img variant="top" src={cardimage} style={{ width: '15px', marginRight: '10px', backgroundImage: '#BAE7FF' }} />
                                </div>
                                <div>
                                    <Card.Title><strong className='strongh1'>Boost Your Reach</strong></Card.Title>
                                </div>
                            </div>
                            <Card.Text className='cardintext'>
                                Amplify your reach and connect with your audience via email.
                            </Card.Text>
                            <Link to="/campaign"><Button variant="primary">Create Campaign</Button></Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-md-6'>
                    <Card style={{ width: "288px", height: '180px', marginLeft: '-220px' }}>
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <div>
                                    <Card.Img variant="top" src={cardimage} style={{ width: '15px', marginRight: '10px', backgroundImage: '#BAE7FF' }} />
                                </div>
                                <div>
                                    <Card.Title><strong className='strongh1'>Simplify your connections</strong></Card.Title>
                                </div>
                            </div>
                            <Card.Text className='cardintext'>
                                Keep your contact all in one place for easy access.
                            </Card.Text>
                            <Link to="/contactdetails"><Button variant="primary">Add Contact</Button></Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>)
}

export default Bootstpcard
