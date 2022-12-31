import React, { useState, useEffect } from "react";
// import SpotifyWebApi from "spotify-web-api-js";
import { gapi } from "gapi-script";
import Navbar2 from "../components/Navbar2";
import { Toast } from "react-bootstrap";
// const spotify = new SpotifyWebApi();

function Home() {
  const [PlaylistName, setPlaylistName] = useState("");
  const [show, setShow] = useState(false);
  var temp = localStorage.getItem("yt");
  temp = JSON.parse(temp);
  const yturls = temp.arr;
  //   const spotify = props.spotify;
  const [playlistId, setPlaylistId] = useState("");

  function authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
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
          console.log("window.gapi client loaded for API");
        },
        function (err) {
          console.error("Error loading window.gapi client for API", err);
        }
      );
  }

  function insertPlaylistItem(playlistId, yturl) {
    let id = yturl;
    console.log(id);
    return gapi.client.youtube.playlistItems
      .insert({
        part: ["snippet"],
        resource: {
          snippet: {
            playlistId: playlistId,
            resourceId: {
              videoId: id,
              kind: "youtube#video",
            },
          },
        },
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }
  function insertPlaylist() {
    return gapi.client.youtube.playlists
      .insert({
        part: ["snippet", "status"],
        resource: {
          snippet: {
            title: PlaylistName,
            description: "This is a sample playlist description.",
            tags: ["sample playlist", "API call"],
            defaultLanguage: "en",
          },
          status: {
            privacyStatus: "private",
          },
        },
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          setPlaylistId(response.result.id);
          console.log("Response", response);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }

  gapi.load("client:auth2", function () {
    gapi.auth2.init({
      client_id: "",
      plugin_name: "demo-app",
    });
  });

  async function main(playlistId) {
    console.log(yturls.length);
    for (let i = 0; i < yturls.length; i++) {
      await insertPlaylistItem(playlistId, yturls[i]);
    }
  }
  useEffect(() => {
    if (playlistId) {
      main(playlistId).then(() => setShow(true));
    }
  }, [playlistId]);

  return (
    // <div>
    //   hello mf
    //   <button
    //     onClick={() => {
    //       authenticate().then(loadClient);
    //     }}
    //   >
    //     authorize and load
    //   </button>
    //   <button onClick={insertPlaylist}>execute</button>
    // </div>
    <>
      <Navbar2 />
      <Toast
        bg={"success"}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        style={{ position: "absolute", top: "80px", right: "10px" }}
      >
        <Toast.Body>Created Playlist Successfully</Toast.Body>
      </Toast>
      <h1 className="spot">
        Enter title for your new playlist and listen on youtube
      </h1>
      <div>
        <input
          style={{ marginLeft: "465px", marginBottom: "30px" }}
          className="form-control"
          type="text"
          placeholder="enter playlist name for youtube"
          value={PlaylistName}
          onChange={(e) => {
            setPlaylistName(e.target.value);
          }}
        />
      </div>

      <div>
        <div style={{ textAlign: "center" }}>
          <button
            className="btn"
            style={{ marginRight: "28px" }}
            type="button"
            onClick={() => {
              authenticate().then(loadClient);
            }}
          >
            Login
          </button>
          <button
            // id="grid-btn"
            className="btn"
            type="button"
            onClick={() => {
              insertPlaylist();
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
