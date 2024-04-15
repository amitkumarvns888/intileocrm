import { RobotOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import React from "react";

const EmailPreview = ({ data }) => {
  console.log("data props", data);
  const renderSignature = (signature) => {
    const lines = signature.split(/\r?\n/);
    return lines.map((line, index) => <p key={index}>{line}</p>);
  };
  return (
    <div>
      <div
        style={{
          // backgroundColor: "yellow",
          padding: "20px",
          minHeight: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              //   justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                //   justifyContent: "center",
                alignItems: "center",

                background: "red",
              }}
            >
              <RobotOutlined
                style={{
                  fontSize: "16px",
                  marginRight: "8px",
                  color: "#1890FF",
                }}
              />

              <p style={{ margin: 0, fontSize: "16px", color: "#1890FF" }}>
                Preview
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <RobotOutlined
              style={{
                fontSize: "16px",
                marginRight: "8px",
                color: "#1890FF",
              }}
            />
            <p style={{ margin: 0, fontSize: "16px", color: "#1890FF" }}>
              Send A Test Mail
            </p>
          </div>
        </div>
        {data === null && (
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
        {data !== null && (
          <div
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4   )",
              backgroundColor: "white",
              padding: "20px",
              minHeight: "100",
              textAlign: "center",
              color: "black",
              margin: "2rem",
            }}
          >
            {/* Your content here */}
            <p style={{ textDecoration: "underline" }}>
              View this email in your brouser.
            </p>
            <img
              src={
                "data:image/jpeg;base64,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"
              }
              width={300}
            />
            <h1>{data?.template_subject}</h1>
            <div dangerouslySetInnerHTML={{ __html: data?.template_body }} />

            <img
              src={
                "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
              }
              width={400}
            />
            <div style={{ textAlign: "left", lineHeight: "1" }}>
              <br />
              <br />
              <br />
              {renderSignature(data?.template_sign)}
            </div>
            <Button
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                borderColor: "#000000",
              }}
            >
              Add Button Text
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailPreview;
