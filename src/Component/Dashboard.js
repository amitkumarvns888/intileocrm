import React from 'react'
import Header from './Header'
import SideNavbar from './SideNavbar'
import Footer from './Footer'
import { Card, Button } from 'react-bootstrap';
import Bootstpcard from './Bootstpcard';

const Dashboard = () => {
  
       const nameString = sessionStorage.getItem('username');
       const name = JSON.parse(nameString);
    return (
        <div>
            <Header />
            <SideNavbar />
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row mb-2">

                            <div className="col-sm-6">
                                <ol className="breadcrumb ">
                                    <li className="breadcrumb-item">Home</li>
                                    <li className="breadcrumb-item active">Dashboard v1</li>
                                    <li className="breadcrumb-item active"><b>Analytics</b></li>
                                </ol>
                                <h2 className='heading2'>Welcome {name}</h2>
                                <hr className='dashbhrline' />
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </div>

                {/* /.content-header */}
                {/* Main content */}


                <div className="row">
                    <div className=''>
                        <Bootstpcard />
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Dashboard
