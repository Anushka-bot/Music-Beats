import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import project1 from "../images/project1.png";

export default function AboutPro() {
  return (
    <>
      <div className="abtPro" id="AboutPro">
        <Container>
          <Row>
            <Col>
              <div className="txtAboutPro" style={{ marginTop: "30px" }}>
                <h1 style={{ color: "#455A64", fontSize: "36px" }}>
                  ABOUT PROJECT{" "}
                </h1>{" "}
                <br />
                <p style={{ fontSize: "18px" }}>
                  <h5 style={{ fontWeight: "700" }}> TRANSFER</h5>
                  Users can enjoy all of their favourite musicians on a single
                  platform by transferring their Spotify playlist to a YouTube
                  playlist and vice versa.
                </p>
                <p style={{ fontSize: "18px" }}>
                  <h5 style={{ fontWeight: "700" }}> DOWNLOAD</h5>
                  Music lovers, you are going to absolutely love this feature!
                  Users of Music Beats can also download music from their
                  favourite playlists on Spotify and YouTube to their local
                  storage and listen to them without an internet connection
                  (yayyayaya). What could be better than ringing in the new year
                  by completely disengaging from social media and grooving to
                  music.
                </p>
                <p style={{ fontSize: "18px" }}>
                  <h5 style={{ fontWeight: "700" }}> PARTY</h5>
                  Users can choose from 8 themes and Music Beats will play the
                  greatest songs ever written that are based on that theme. In
                  addition, user can also add these theme music to your Spotify
                  and YouTube playlists.
                </p>
                <p style={{ fontSize: "18px" }}>
                  <h5 style={{ fontWeight: "700" }}> TWILIO</h5>
                  We also implemented Twilio Api to allow users to share theme
                  songs with their friends and to add a special New Year's
                  touch, users can also send a personalised message wishing
                  their loved ones a Happy New Year along with a GIF created
                  automatically (awesome, right?).
                </p>
              </div>
            </Col>
            <Col>
              <img className="project" src={project1} alt="Project"></img>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
