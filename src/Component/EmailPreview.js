import { RobotOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import React from "react";

const EmailPreview = ({ formValues }) => {
  console.log("formValues props", formValues);
  // const renderSignature = (signature) => {
  //   const lines = signature.split(/\r?\n/);
  //   return lines.map((line, index) => <p key={index}>{line}</p>);
  // };
  return (
    <div>
      <div
        style={{
          // backgroundColor: "yellow",
          padding: "0",
          // width:"100%",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <div
            style={
              {
                // display: "flex",
                //   justifyContent: "center",
                // alignItems: "center",
              }
            }
          ></div>
        </div>
        {formValues === null && (
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              minHeight: "100",
              textAlign: "center",
              color: "black  ",
            }}
          >
            <h1>Please select preview !</h1>
          </div>
        )}
        {formValues !== null && (
          <div
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4   )",
              backgroundColor: "white",
              padding: "2rem",
              minHeight: "100",
              textAlign: "center",
              color: "black",
              margin: "2rem",
            }}
          >
            {/* <img
              src={
                "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1713139200&semt=sph"
              }
              width={"150rem"}
              style={{ alignItems: "start" }}
            /> */}
            <h5
              style={{ textAlign: "left", lineHeight: "1", textWrap: "wrap" }}
            >
              Subject&nbsp;&nbsp;:
              <div
                dangerouslySetInnerHTML={{
                  __html: formValues?.template_subject,
                }}
                style={{
                  display: "inline",
                  textAlign: "left",
                  lineHeight: ".8",
                  overflow: "hidden",
                  textWrap: "wrap",
                }}
              />
            </h5>
            <br />
            <br />

            <div
              dangerouslySetInnerHTML={{ __html: formValues?.template_body }}
              style={{
                textAlign: "left",
                lineHeight: "0.1",
                overflow: "hidden",
                textWrap: "wrap",
              }}
            />

            {/* <img
              src={
                "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
              }
              width={"400rem"}
              height={"150rem"}
            /> */}
            <div>
              <br />
              <br />
              <br />
              <div
                dangerouslySetInnerHTML={{ __html: formValues?.template_sign }}
                style={{ textAlign: "left", lineHeight: "0.4" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailPreview;
