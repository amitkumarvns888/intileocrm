import React, { useState, useEffect } from "react";
import ImageCompo from "./ImageCompo";
import { Form, Button, FormGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { API_HEADER } from "../Config";
import { toast, ToastContainer } from "react-toastify";
const DATA = [
  { id: 1, description: "description1" },
  { id: 2, description: "description2" },
  { id: 3, description: "option3" },
  { id: 4, description: "option4" },
  { id: 5, description: "option5" },
  { id: 6, description: "option6" },
  // { id: 7, description: "option7" },
  // { id: 8, description: "option8" },
  // { id: 9, description: "option9" },
  // { id: 10, description: "option10" },
  // { id: 11, description: "option11" },
  // { id: 12, description: "option12" },
  // { id: 13, description: "option13" },
];
const QuestionForm2 = () => {
  const navigate = useNavigate();
  const [formdata2, setFormData2] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response2 = await axios.get(
        "https://intileo-tech.info/api/admin/question/index"
      );
      console.log(response2.data.data.questions);
      setFormData2(response2.data.data.questions);

      try {
        let options = await axios.get(
          "https://intileo-tech.info/api/user/answer/program_question/2",
          API_HEADER
        );
        console.log(options.data.data);
        // setOptions2(options.data.data);
        setOptions2(DATA);
      } catch (error) {
        console.log(error);
      }

      if (response2.status === 200) {
        // navigate('/onboardQuestion3');
      } else {
        console.error("Unexpected response status:", response2.status);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(id)) {
        return prevSelectedOptions.filter((optionId) => optionId !== id);
      } else {
        return [...prevSelectedOptions, id];
      }
    });
  };

  const submitform2 = async (event) => {
    event.preventDefault();
    if (selectedOptions.length === 0) {
      toast.error("Please select at least one option!");
      return;
    }
    console.log("Form submitted! Selected options:", selectedOptions);
    // Your form submission logic goes here
    try {
      //add post url
      const resp = await axios.post(
        "",
        { programms_id: selectedOptions },
        { API_HEADER }
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
    navigate("/onboardQuestion3");
  };

  return (
    <div>
      <div className="image-main">
        <ImageCompo />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form2uppper">
              <div className="numGray">1</div>
              <span className="hrtext">Goal</span>
              <hr className="hline" />
              <div className="num">{formdata2[1]?.id}</div>{" "}
              <span className="hrtext">{formdata2[1]?.title}</span>
              <hr className="hrlinee" />
              <div className="numGray">3</div>
              <span className="hrtext">Contact Range</span>
            </div>
            <div className="form2down">
              <div className="ms-5 me-3 mt-3 mb-1 form2height">

                <h1 className="font30">
                  {formdata2[1]?.question}
                </h1>
                <p className="form1pa">{formdata2[1]?.description} </p>

                <br />
                <Form className="pl-4  " onSubmit={submitform2} >
                  <FormGroup>
                    <div className="row">
                      {DATA.map((option) => (
                        <div className="col-md-3" key={option.id}>
                          <Form.Check
                            type="checkbox"
                            id={option.id}
                            label={option.description}
                            value={option.id}
                            style={{ fontSize: "20px" }}

                            checked={selectedOptions.includes(option.id)}
                            onChange={() => handleCheckboxChange(option.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </FormGroup>
                  <div className=" float-right mt-5 me-2">
                    {/* <Link to="#" className="form1skipbtn"> */}

                    <NavLink to="/onboardQuestion2" className='font14'>Skip</NavLink>

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

export default QuestionForm2;
