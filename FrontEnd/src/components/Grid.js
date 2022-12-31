import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import headphone from "../images/headphone.png";
import { Link } from "react-router-dom";
import AboutUs from "./AboutUs";
import AboutPro from "./AboutPro";
// import FeatureCards from "./FeatureCards";
import Navbar from "./Navbar";

function Grid() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Container>
          <Row>
            <Col>
              <img className="headphone" src={headphone} alt="headphone"></img>
            </Col>
            <Col>
              <div className="grid">
                <h1 style={{ color: "#455A64" }}>TUNE WITH MUSIC </h1>
                <div>
                  When it comes to New Year celebrations, we believe music is a
                  must! Music always creates a mood, whether you are attending a
                  party with friends, spending the new year alone, spending it
                  with family by a fire, or hanging out with your cousins under
                  comfy blankets. Considering this we had the idea to create a
                  website where everybody, regardless of their plans for the
                  year's conclusion, could listen to the best tunes. Get ready!
                  because you're going to have a fantastic new year.✨
                  <br /> <br />
                  <Link to="/transfer">
                    <button type="button" className="btn">
                      Transfer Playlist
                    </button>
                  </Link>
                  <Link to="/download">
                    <button type="button" id="grid-btn" className="btn">
                      Download Playlist
                    </button>
                  </Link>
                  <Link to="/party">
                    <button type="button" id="grid-btn" className="btn">
                      Party Player
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container"></div>
      {/* <FeatureCards /> */}
      <AboutPro />
      <AboutUs />
    </>
  );
}

export default Grid;
