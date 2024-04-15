import React, { useState, useEffect } from "react";
import ImageCompo from "./ImageCompo";
import { Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { API_HEADER,UserbaseUrl } from "../Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const QuestionForm3 = () => {
  const navigate = useNavigate();
  const [formdata3, setFormData3] = useState([]);
  const [dropdownData1, setDropdownData1] = useState([]);
  const [dropdownData2, setDropdownData2] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://intileo-tech.info/api/admin/question/index"
      );
      //   console.log(response.data.data);
      setFormData3(response.data.data.questions);
      //   console.log(formdata3);
      try {
        const response1 = await axios.get(
          "https://intileo-tech.info/api/admin/contacts/contacts-list"
        );
        setDropdownData1(response1.data.data);
        const response2 = await axios.get(
          "https://intileo-tech.info/api/admin/teams/teams-list"
        );
        setDropdownData2(response2.data.data);
        // console.log("dropdown response", response.data.data);
        // console.log("dropdown response", response2.data.data);
      } catch (error) {}
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const handleSelectChange1 = (event) => {
    console.log(event.target.value);
    setSelectedOption1(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    console.log(event.target.value);
    setSelectedOption2(event.target.value);
  };
  const submitform3 = async (event) => {
    event.preventDefault();
    console.log(selectedOption1, selectedOption2);
    try {
      const resp = await axios.post(
        `${UserbaseUrl}/question/user-team-contact`,
        {
          teams: selectedOption1,
          contacts: selectedOption2,
        },
        API_HEADER
      );
      //   console.log(resp);
      if (resp.status === 200) {
        toast.success("Successfull");
        navigate("/dashboard");
      } else {
        toast.error("Internal Server error!");
      }
    } catch (error) {
      console.log(error);
    }
    setSelectedOption1("");
    setSelectedOption2("");
    // Your form submission logic goes here
  };

  return (
    <div>
      <div className="image-main">
        <ImageCompo />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form3uppper">
              <div className="numGray">1</div>
              <span className="hrtext">Goal</span>
              <hr className="hline" />
              <div className="numGray">2</div>
              <span className="hrtext">Feature List</span>
              <hr className="hline" />
              <div className="num">{formdata3[2]?.id}</div>
              <span className="hrtext">{formdata3[2]?.title}</span>
            </div>
            <div className="form3down">
              <div className="form3downinside">
                <h1 style={{ fontSize: "25px", fontWeight: "600" }}>
                  {formdata3[2]?.question}
                </h1>
                <p className="form1pa">{formdata3[2]?.description}</p>

                <br />

                <Form onSubmit={submitform3}>
                  <div key={"vertica"} className="mb-3 ">
                    <Form.Group controlId="dropdown1">
                      <Form.Label className="form3label">
                        How many people are there in your team?{" "}
                      </Form.Label>
                      <Form.Select
                        className="form3choose"
                        value={selectedOption1}
                        onChange={handleSelectChange1}
                      >
                        <option>Choose an option</option>
                        {dropdownData1.map((item) => (
                          <option value={item.id}>{item.contacts}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <br />
                    <Form.Group controlId="dropdown2">
                      <Form.Label className="form3label">
                        How many contact do you have?{" "}
                      </Form.Label>
                      <Form.Select
                        className="form3choose"
                        value={selectedOption2}
                        onChange={handleSelectChange2}
                      >
                        <option>Choose an option</option>
                        {dropdownData2.map((item) => (
                          <option value={item.id}>{item.teams}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <div className=" float-right">
                    {/* <Link to="#" className="form1skipbtn"> */}

                    <NavLink to="/dashboard">Skip</NavLink>

                    <Button
                      variant="primary"
                      className="ml-4"
                      // className="form1nextbtn btn-md"
                      type="submit"
                    >
                      Next
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuestionForm3;
