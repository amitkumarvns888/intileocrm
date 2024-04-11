import React, { useState } from 'react'
import Header from '../Component/Header'
import { Input } from 'antd';
import SideNavbar from '../Component/SideNavbar';
import Footer from '../Component/Footer';
import uploadicon from '../crmimage/uploadicon.png';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["CSV", "XLSX"];

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <>
            <Header />
            <SideNavbar />
            <div className="content-wrapper bg-light">
                <div className="content">
                    <div className="container-fluid ">
                        <div className="row px-3 py-4">
                            <p className='font30px'>Upload a file</p>
                            <hr className='bg-secondary' />
                        </div>


                        <div className="row d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                            <div className="col-3 border bordergrey rounded-2 p-3 text-center">
                                <img src={uploadicon} alt="upload icon" className='mb-3' />
                                <FileUploader handleChange={handleChange} name="file" types={fileTypes} className="mt-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UploadFile