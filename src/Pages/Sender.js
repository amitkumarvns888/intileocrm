import React from 'react'
import Header from '../Component/Header'
import SideNavbar from '../Component/SideNavbar'
import Footer from '../Component/Footer'
import cardimage from '../crmimage/cardimage.png'
import { Card, Button } from 'react-bootstrap';
import Bootstpcard from '../Component/Bootstpcard';
import { useNavigate, Link } from 'react-router-dom';
const Sender = () => {
    const navigate=useNavigate()


    const viewhandler=()=>{
        navigate('/addsender')
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
                                    <li className="breadcrumb-item active"><b>Analytics</b></li>
                                </ol>
                                <h2 className='font30'>Sender, Domain & IPs </h2>
                                <hr className='dashbhrline' />
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </div>

                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                      
                        <table className="table">
                            <tbody>
                               <tr>
                                    <td> <span className='backsidecolor'><img src={cardimage} /></span> <span className='font14span'> Sender</span> <p className='font14p'>Sender are shown in your recipient’s inbox when they receive your email.</p> 
                                    <Button variant="primary" type="submit" style={{ float: 'right' }} onClick={viewhandler} >
                                            View
                                        </Button>
                                    
                                    </td>
                               </tr>

                                <tr>
                                    <td> <span className='backsidecolor'><img src={cardimage} /></span> <span className='font14span'> Email Template</span> <p className='font14p'>Domain indicates from whom an email is sent.</p>
                                    <Button variant="primary" type="submit" style={{ float: 'right' }} onClick={()=>{navigate('/craeteemail')}} >
                                            View
                                        </Button>
                                     </td>
                                </tr>

                               
                            </tbody>
                        </table>



                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Sender
