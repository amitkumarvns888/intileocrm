import React from 'react'
import Header from '../Component/Header'
import { Input } from 'antd';
import SideNavbar from '../Component/SideNavbar';
import Footer from '../Component/Footer';
const { TextArea } = Input;

const CopyPaste = () => {
    return (
        <>
            <Header />
            <SideNavbar />
            <div className="content-wrapper bg-light">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row px-3 py-4">
                            <p className='font30px'>Copy and paste your contacts</p>
                            <hr className='bg-secondary' />
                        </div>

                        <div className="row mx-2">
                            <div className="col-4">
                                <p className='textgrey text-wrap font14px'>Paste your contact information into this box using commas
                                    to separate each field. There should be one contact per line.</p>
                                <textarea className="form-control textareaph"
                                    placeholder="Example:Email Address, First Name, Last Name, Addressamelia@pottedplanter.com, Amelia, Breiner, 154th Street OH 43560 USamelia@pottedplanter.com, Amelia, Breiner, 154th Street OH 43560 USamelia@pottedplanter.com, Amelia, Breiner, 154th Street OH 43560 US..."

                                    style={{ width: 500, height: 164 }}
                                />
                            </div>
                        </div>
                        <button type='button' className='btn btn-primary mt-3 mx-3'>Continue</button>
                        </div>
                    </div>
                </div>
                <Footer />
        </>
    )
}

export default CopyPaste