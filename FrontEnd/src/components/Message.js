import React, { useEffect, useState } from "react";
import {
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
} from "react-icons/io5";
import { BsFillSkipStartFill } from "react-icons/bs";
import ReactPlayer from "react-player/lazy";
import Modal from "react-bootstrap/Modal";

export default function Message({
  songDetails,
  songURL,
  trackCount,
  setTrackCount,
  sharePage,
}) {
  const [show, setShow] = useState(false);
  const [phoneNo, setPhoneNo] = useState(0);
  const [sendText, setSendText] = useState("");
  let song_name = "";
  //Ensure songDetails are fetched prior to accessing it
  if (songDetails) {
    song_name = songDetails[trackCount - 1].name.toUpperCase();
    //Remove "(feat. artist)" from song title
    console.log(sharePage);
    song_name = song_name.replace(/\([^()]*\)/g, "");
  }

  function changeSong(value) {
    if (value === -1) {
      if (trackCount + value === 0) {
        setTrackCount(10);
      } else {
        setTrackCount((count) => count - 1);
      }
    } else {
      if (trackCount + value > 10) {
        setTrackCount(1);
      } else {
        setTrackCount((count) => count + 1);
      }
    }
  }
  function setEqualizer() {
    let lines = document.querySelectorAll(".vertical");
    for (let i = 0; i < lines.length; i += 1) {
      let line = lines[i];
      line.style.animation = `equalizer ${
        Math.random() * (1.7 - 0.3) + 0.3
      }s ease infinite`;
      line.style.animationDirection = "alternate-reverse";
    }
  }
  useEffect(() => {
    setEqualizer();
    console.log("hi");
  }, [songURL]);

  const sendMessage = () => {
    console.log("hi");
    fetch("/party", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: phoneNo,
        message: `${sharePage}\n${sendText}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setShow1(true);
        // M.toast({
        //   html: "Created Playlist Successfully",
        //   classes: "#43a047 green darken-1",
        // });
      });
  };
  return (
    <div className="card-mg">
      {!songDetails && !songURL && (
        <div className="message">
          Choose one of the below cards that best suits you this new year and
          vibe to the top hits :-) <br />
        </div>
      )}
      {songDetails && songURL && (
        <div className="contents">
          <div id="playerWrap">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${songURL}?autoplay=1`}
              controls={true}
              playing={true}
              onEnded={() => changeSong(1)}
            />
          </div>

          <div className="song-info">
            <div className="test-container">
              <p className="song-title text-grad">{song_name}</p>
              <p className="song-artists text-grad">
                {songDetails[trackCount - 1].artists[0].toUpperCase()}
              </p>
            </div>
            <div id="equalizer">
              {/* <div id="horizontal"></div> */}
              <div id="vertical-lines">
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
                <div class="vertical"></div>
              </div>
            </div>
            <div id="controls">
              <div id="change-track">
                <IoPlaySkipBackCircleOutline
                  //   style={{
                  //     color: "linear-gradient(90deg, #905960, #241015, #905960);",
                  //     width: "43px",
                  //     height: "43px",
                  //   }}
                  className="button"
                  onClick={() => changeSong(-1)}
                />
                <IoPlaySkipForwardCircleOutline
                  //   style={{ color: "black", width: "43px", height: "43px" }}
                  className="button"
                  onClick={() => changeSong(1)}
                />
              </div>
              <button
                onClick={() => {
                  setShow(true);
                }}
                type="button"
                className="btn btn-circle btn-md share"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                <svg
                  style={{ color: "black" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-share-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                </svg>
              </button>
              <p id="track-number" className="">{`${trackCount}/10`}</p>
            </div>
          </div>
        </div>
      )}
      <Modal onHide={() => setShow(false)} show={show}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <p
                style={{ color: "#455a64", fontSize: "18px" }}
                className="modal-title"
                id="exampleModalLongTitle"
              >
                Share the best songs along with a sweet new year wish :)
              </p>
            </div>
            <div style={{ color: "#455a64" }} className="modal-body">
              <form>
                <label htmlFor="recipient-name" className="col-form-label">
                  Contact no.
                </label>
                <input
                  className="form-ctrl"
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="10"
                  value={phoneNo}
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                  }}
                />
                <label htmlFor="message-text" className="col-form-label">
                  Message:
                </label>
                <textarea
                  className="form-ctrl"
                  id="message-text"
                  value={sendText}
                  onChange={(e) => {
                    setSendText(e.target.value);
                  }}
                ></textarea>
              </form>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShow(false)}
                type="button"
                className="btn"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      ></div>
    </div>
  );
}
