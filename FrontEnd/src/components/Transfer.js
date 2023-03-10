import React from "react";
import "../css/styles.css";
import Navbar2 from "./Navbar2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SpotToyout() {
  let goTO = () => {
    window.open("http://localhost:5000/login2", "_self");
  };
  return (
    <>
      <Navbar2 />
      <div className="text-center">
        <div className="spot">Select the source </div>
        {/* <button className="source btn" type="button">
          <Container style={{ padding: "0px" }}>
            <Row style={{ padding: "0px", margin: "0px" }}>
              <Col style={{ padding: "0px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  fill="currentColor"
                  class="bi bi-spotify"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
                </svg>
              </Col>
              <Col
                style={{
                  padding: "0px",
                  marginLeft: "5px",
                  marginTop: "1.5px",
                }}
              >
                Spotify
              </Col>
            </Row>
          </Container>
        </button> */}
        <button type="button" className="source btn" onClick={goTO}>
          <Container style={{ padding: "0px" }}>
            <Row style={{ padding: "0px", margin: "0px" }}>
              <Col style={{ padding: "0px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-youtube"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                </svg>
              </Col>
              <Col
                style={{
                  padding: "0px",
                  marginLeft: "5px",
                  marginTop: "1.5px",
                }}
              >
                Youtube
              </Col>
            </Row>
          </Container>
        </button>
      </div>
    </>
  );
}
