import React, { useState } from "react";
import { Select, Input, Space, Checkbox } from "antd";

const { Option } = Select;

const YourComponent = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [mandatory, setMandatory] = useState(false);
    const [unique, setUnique] = useState(false);

    const handleCheckboxChange = (e, type) => {
        if (type === "mandatory") {
            setMandatory(e.target.checked);
        } else if (type === "unique") {
            setUnique(e.target.checked);
        }
    };

    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };

    return (
        <div className="m-5">
            <Select
                mode="multiple"
                allowClear
                style={{
                    width: '20%',
                }}
                placeholder="Add more Fields"
                onChange={handleChange}
            >
                <Option key="first_name">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>First Name</span>
                        <div>
                            <Checkbox onChange={(e) => handleCheckboxChange(e, "mandatory")}><span className="text-xs">Mandatory</span></Checkbox>
                            {/* <Checkbox onChange={(e) => handleCheckboxChange(e, "unique")}>Unique</Checkbox> */}
                        </div>
                    </div>
                </Option>
                <Option key="last_name" className="">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Last Name</span>
                        <div>
                            <Checkbox onChange={(e) => handleCheckboxChange(e, "mandatory")}><span className="text-xs">Mandatory</span></Checkbox>
                            {/* <Checkbox onChange={(e) => handleCheckboxChange(e, "unique")}>Unique</Checkbox> */}
                        </div>
                    </div>
                </Option>

                {/* Add more options as needed */}
            </Select>
            <br />
            {selectedOptions.map(option => (
                <div key={option}>
                    <label>
                        {mandatory ? <span className="text-danger"> * </span>:null}
                        {option}
                        </label> {/* Render the label with option name */}
                    <Input
                        style={{ marginLeft: '10px', width: '20%' }}
                        placeholder={`Enter ${option}`}
                        required={mandatory}
                        addonBefore={unique ? '*' : null}
                    />
                    {/* Render different inputs based on selected options */}
                    <br />
                </div>
            ))}
        </div>
    );
};

export default YourComponent;
