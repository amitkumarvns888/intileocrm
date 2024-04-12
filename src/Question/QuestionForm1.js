import React, { useState, useEffect } from "react";
import ImageCompo from "./ImageCompo";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { API_HEADER } from "../Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionForm1 = () => {
  const navigate = useNavigate();
  const [formdata1, setFormData1] = useState([]);
  const [question1, setQuestion1] = useState([]);
  const [options1, setOptions1] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://intileo-tech.info/api/admin/question/index"
      );
      console.log(response.data.data.questions);
      setFormData1(response.data.data.questions);
      console.log(formdata1[0]?.id);
      try {
        let options = await axios.get(
          "https://intileo-tech.info/api/admin/answer/question_show/1",
          API_HEADER
        );
        options = options.data.data.slice(0, 3);
        console.log("*******************************");
        console.log(options);
        setOptions1(options);
      } catch (error) { }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const submitform1 = async (e) => {
    e.preventDefault();
    if (selectedOption === null) {
      console.log("please select option....");
      toast.error("Please select option!");
      return;
    }
    console.log("form data", selectedOption);
    try {
      //    const resp = await axios.post(`https://intileo-tech.info/api/user/answer/get-user-select-answer/`,{"answer_id":selectedOption},{API_HEADER})
      navigate("/onboardQuestion2");
      //    console.log(resp)
    } catch (err) {
      console.log(err);
    }
    setSelectedOption(null);
    toast.success("Successfull");
  };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.id);
  };
  return (
    <>
      <div>
        <div className="image-main">
          <ImageCompo />
        </div>
        <div className="container ">
          <div className="row">
            <div className="col-md-12   ">
              <Form onSubmit={submitform1}>
                <div className="uppper">
                  <div className="num"> {formdata1[0]?.id} </div>
                  <span className="hrtext">{formdata1[0]?.title} </span>
                  <hr className="hline" />
                  <div className="numGray">2</div>{" "}
                  <span className="hrtext">Feature List</span>
                  <hr className="hrlinee" />
                  <div className="numGray">3</div>
                  <span className="hrtext">Contact Range</span>
                </div>
                <div className="form3down">
                  <div className="ms-3 me-3 mt-2 mb-0">

                    <h1 style={{ fontSize: "30px", fontWeight: "600" }}>
                      {formdata1[0]?.question}
                    </h1>
                    <p className="form1pa">{formdata1[0]?.description} </p>

                    <br />

                    <div className="">
                      {options1.map((item) => (
                        <>
                          <div className="radiobtn" key={item.id}>
                            <Form.Check
                              inline
                              label={item.answer}
                              name="group1"
                              type={"radio"}
                              id={item.id}
                              onChange={handleOptionChange}
                            />
                          </div>
                          <br />
                        </>
                      ))}
                    </div>
                    <div className=" float-right">
                      {/* <Link to="#" className="form1skipbtn"> */}

                      <NavLink to="/onboardQuestion2">Skip</NavLink>

                      <Button
                        variant="primary"
                        className="ml-4"
                        // className="form1nextbtn btn-md"
                        type="submit"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default QuestionForm1;
