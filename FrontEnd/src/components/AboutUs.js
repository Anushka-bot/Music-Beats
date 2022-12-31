import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import team1 from "../images/team1.png";

export default function AboutUs() {
  return (
    <>
      <div className="abtUs" id="AboutUs">
        <Container>
          <Row>
            <Col>
              <img
                style={{ marginTop: "80px" }}
                className="team"
                src={team1}
                alt="Team"
              ></img>
            </Col>
            <Col>
              <div className="txtAboutUs" style={{ marginTop: "160px" }}>
                <h1 style={{ color: "#455A64", fontSize: "36px" }}>
                  ABOUT US{" "}
                </h1>{" "}
                <br />
                Music Beats is the hard work of 4 team members namely: <br />{" "}
                Harsh Vardhan, Prateek Arora, Prashant Kumar Singh and Anushka
                Bansal. We are 3rd year undergraduate students and pursuing our
                B.Tech degree in Indian Instituta of Information Technology
                Guwahati, India. We put our late nights and early mornings hard
                work in making of this project in the last week, and absolutely
                enjoyed the team work :-)
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
