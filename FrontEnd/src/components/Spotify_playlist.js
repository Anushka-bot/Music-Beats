import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";
import { Toast } from "react-bootstrap";
export default function Spotify_playlist() {
  const [PlaylistName, setPlaylistName] = useState("");
  const [show, setShow] = useState(false);
  const postDetails = async () => {
    var temp = localStorage.getItem("arr");
    temp = JSON.parse(temp);
    var arr = temp.arr;
    fetch("/download3", {
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
        setShow(true);
      });

    // arr.map((data) => console.log(data));
  };
  return (
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
      <h1 className="spot">Enter youtube playlist name to listen on spotify</h1>
      <div>
        <input
          style={{ marginLeft: "465px", marginBottom: "30px" }}
          className="form-control"
          type="text"
          placeholder="enter playlist name for spotify"
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
            type="button"
            onClick={() => {
              postDetails();
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </>
  );
}
