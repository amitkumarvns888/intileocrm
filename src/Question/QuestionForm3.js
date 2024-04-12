import React, { useState, useEffect } from "react";
import ImageCompo from "./ImageCompo";
import { Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
const DATA = [
  { id: 1, teams: "team 1" },
  { id: 2, teams: "team 2" },
  { id: 3, teams: "team 3" },
  { id: 4, teams: "team 4" },
];
const DATA2 = [
  { id: 1, teams: "contact 1" },
  { id: 2, teams: "contact 2" },
  { id: 3, teams: "contact 3" },
  { id: 4, teams: "contact 4" },
];
const QuestionForm3 = () => {
  const navigate = useNavigate();
  const [formdata3, setFormData3] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);

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
        const response = await axios.get(
          "https://intileo-tech.info/api/admin/teams/index"
        );
        console.log("dropdown response", response);
      } catch (error) {}
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const submitform3 = (event) => {
    event.preventDefault();
    console.log("Form submitted! Selected options:");
    // Your form submission logic goes here
    // navigate("/dashboard");
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
                    <Form.Label className="form3label">
                      How many people are there in your team?{" "}
                    </Form.Label>
                    <Form.Select className="form3choose">
                      <option>Choose an option</option>
                      {DATA.map((item) => (
                        <option value="1">{item.teams}</option>
                      ))}
                    </Form.Select>
                    <br />

                    <Form.Label className="form3label">
                      How many contact do you have?{" "}
                    </Form.Label>
                    <Form.Select className="form3choose">
                      <option>Choose an option</option>
                      {DATA2.map((item) => (
                        <option value="1">{item.teams}</option>
                      ))}
                    </Form.Select>
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
    </div>
  );
};

export default QuestionForm3;
