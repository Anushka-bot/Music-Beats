import React, { useState } from "react";
import { gapi } from "gapi-script";
import Navbar2 from "../components/Navbar2";
import { Toast } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function YoutubeToSpotify() {
  const [url, setUrl] = useState("");
  const [PlaylistName, setPlaylistName] = useState("");
  const [playlist, setPlaylist] = useState(undefined);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show3, setShow3] = useState(false);
  ////////////////////////////////////////////////////
  function authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
      .then(
        function () {
          console.log("Sign-in successful");
        },
        function (err) {
          console.error("Error signing in", err);
        }
      );
  }
  function loadClient() {
    gapi.client.setApiKey("");
    return gapi.client
      .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.playlists
      .list({
        part: ["snippet,contentDetails"],
        maxResults: 25,
        mine: true,
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response.result.items);
          setPlaylist(response.result.items);
          setShow3(true);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }
  gapi.load("client:auth2", function () {
    gapi.auth2.init({
      client_id: "",
      plugin_name: "anything",
    });
  });

  ///////////////////////////////////////////////////////////////////////
  const postDetails = async () => {
    if (url) {
      fetch("/getPlaylist", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.error) {
            console.log(data.error);
            // M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            // alert(`${data.error}`);
            // const bsToast = new Toast("hello");
            // bsToast.show();
            // window.alert(`${data.error}`);
            setShow(true);
          } else {
            var arr = [];
            let x = 0,
              y = data.videos.length;

            data.videos.map(async (vid) => {
              const songapi = `https://api.song.link/v1-alpha.1/links?url=${vid}&userCountry=US&songIfSingle=true`;
              console.log(songapi);
              await fetch(songapi)
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.linksByPlatform.spotify) {
                    arr.push(data.linksByPlatform.spotify.nativeAppUriDesktop);
                    console.log(
                      data.linksByPlatform.spotify.nativeAppUriDesktop
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              ///////////////////////
              x++;
              if (x === y) {
                fetch("/download2", {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    urls: arr,
                    playlistName: PlaylistName,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setShow1(true);

                    // M.toast({
                    //   html: "Created Playlist Successfully",
                    //   classes: "#43a047 green darken-1",
                    // });
                  });

                // const data = await result.json();
              }
            });
            console.log(arr);
            /////////////////////////
          }
        })
        .catch((err) => {
          console.log(err);
        });
      ////////////////////////////////////////////////////
    }
  };
  return (
    <>
      <div>
        <Navbar2 />
        <h1 className="spot">Login to youtube below to enjoy your songs</h1>

        <div>
          <Toast
            bg={"danger"}
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            style={{ position: "absolute", top: "80px", right: "10px" }}
          >
            <Toast.Body>
              {" "}
              Playlist is either private or does not exist
            </Toast.Body>
          </Toast>
          <Toast
            bg={"success"}
            onClose={() => setShow1(false)}
            show={show1}
            delay={3000}
            autohide
            style={{ position: "absolute", top: "80px", right: "10px" }}
          >
            <Toast.Body>Created Playlist Successfully</Toast.Body>
          </Toast>
          <div>
            <input
              style={{ marginLeft: "465px", marginBottom: "20px" }}
              className="form-control"
              type="text"
              placeholder="enter playlist link (or playlist name if already logged in)"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <input
              style={{ marginLeft: "465px", marginBottom: "30px" }}
              className="form-control"
              type="text"
              placeholder="enter playlist name for Spotify"
              value={PlaylistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            />
          </div>

          <div>
            <div style={{ paddingLeft: "600px", paddingBottom: "20px" }}>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  authenticate().then(loadClient).then(execute);
                }}
              >
                Login Here
              </button>
              <button
                type="button"
                id="nav-btn2"
                className="btn"
                onClick={() => {
                  postDetails();
                }}
              >
                Submit Post
              </button>
            </div>
          </div>
          {playlist ? (
            <div className="d-flex justify-content-center">
              {/* <Modal onHide={() => setShow3(false)} show={show3}>
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header"> */}
              <Col className="col-md-6 justify-content-center">
                {playlist.map((item) => (
                  <Row
                    style={{
                      // --bs-gutter-x: "1.5rem";
                      // --bs-gutter-y: "0";
                      display: "flex",
                      flexWrap: "wrap",
                      // marginTop: "calc(-1 * var(--bs-gutter-y))",
                      // marginRight: "calc(-.5 * var(--bs-gutter-x))",
                      // marginLeft: "570px",
                      color: "black",
                      fontSize: "18px",
                      display: "block",
                      textAlign: "center",
                      // backgroundColor: "grey",
                      margin: "10px",
                      marginRight: "190px",
                      marginLeft: "212px",
                      paddingRight: "10px",
                    }}
                    className="form-control"
                    key={item.id}
                    onClick={
                      (e) =>
                        setUrl(
                          `https://www.youtube.com/playlist?list=${e.target.id}`
                        ) //note this displays both public and private playlists but
                    }
                    id={item.id}
                  >
                    {item.snippet.localized.title}
                  </Row>
                ))}
              </Col>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
