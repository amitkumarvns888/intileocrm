import React from 'react'
import Header from '../Component/Header'
import { Input } from 'antd';
import SideNavbar from '../Component/SideNavbar';
import Footer from '../Component/Footer';

const ImportExisting = () => {
    return (
        <>
            <Header />
            <SideNavbar />
            <div className="content-wrapper bg-light">
                <div className="content">
                    <div className="container-fluid ">
                        <div className="row px-3 py-4">
                            <p className='font30px'>Import existing or future contacts, automatically.</p>
                            <p className='font16px textgrey'>Connect it to your account to keep all your contacts in sync.</p>
                            <hr className='bg-secondary' />
                        </div>



                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ImportExisting