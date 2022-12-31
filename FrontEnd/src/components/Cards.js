import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Message from "./Message";
import { Link } from "react-router-dom";
import "../css/cards.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Icons({ setMood, token }) {
  const [songDetails, setSongDetails] = useState(null);
  //state to store youtube video id of song
  const [songLink, setSongLink] = useState(null);
  const [sharePage, setSharePage] = useState(null);
  //state to store track number from playlist
  const [trackCount, setTrackCount] = useState(1);
  const [ytLink, setYtLink] = useState(null);
  const isInitialMount = useRef(true);

  const YT_API = "";

  function handleClick(e, key = token) {
    console.log("hi");
    setMood(e.target.title);
    let genre = e.target.id;
    let limit = 50;
    //fetch 50 songs from spotify playlist
    axios(
      `https://api.spotify.com/v1/playlists/${genre}/tracks?fields=items(track(album(artists(name)),name,popularity,href))&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: "grant_type=client_credentials",
        method: "GET",
      }
    ).then((res) => {
      let songs = res.data.items;
      //take top 10 songs based on popularity from batch of 50
      console.log(songs);
      songs = songs
        .sort((a, b) => b.track?.popularity - a.track?.popularity)
        .slice(0, 10);
      extractInfo(songs);
    });
  }

  //extract song titles and artists names from spotify data
  function extractInfo(songs) {
    let details = [];
    for (let i = 0; i < songs.length; i++) {
      let artists = [];
      //copy all artists
      for (let j = 0; j < songs[i].track.album.artists.length; j++) {
        artists.push(songs[i].track.album.artists[j].name);
      }
      let track = {
        artists: artists,
        name: songs[i].track.name,
        href: songs[i].track.href,
      };
      details.push(track);
    }
    console.log(details);
    setSongDetails(details);
  }

  useEffect(() => {
    //prevent callback from running on first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getYoutube();
    }
  }, [songDetails, trackCount]);

  //fetch top youtube video search result based on song query -> "Song Title by Artist Name"
  async function getYoutube() {
    if (songDetails !== null) {
      const mylink = songDetails[trackCount - 1].href;
      console.log(mylink);
      const link_id = mylink.split("tracks/")[1];
      console.log(link_id);
      const vid = `https://open.spotify.com/track/${link_id}`;
      const songapi = `https://api.song.link/v1-alpha.1/links?url=${vid}&userCountry=US&songIfSingle=true`;
      console.log(songapi);
      await fetch(songapi)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSharePage(data.pageUrl);
          if (data.linksByPlatform.youtube) {
            const yt_id = data.linksByPlatform.youtube.url.split("v=")[1];
            setSongLink(yt_id);
            console.log(data.linksByPlatform.youtube.url);
          }
          {
            let resultLimit = 1;
            //grab track artist
            let artistName = songDetails[trackCount - 1].artists[0];
            let song = songDetails[trackCount - 1].name;
            let songQuery = `${song}%20by%20${artistName}`;
            songQuery = songQuery.replaceAll(" ", "%20");
            axios(
              `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&q=${songQuery}&key=${YT_API}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "GET",
              }
            ).then((link) => {
              let ytUrlId = link.data.items[0].id.videoId;
              setSongLink(ytUrlId);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  async function getYoutube_playlist() {
    if (songDetails != null) {
      var arr = [];
      let x = 0,
        y = songDetails.length;

      songDetails.map(async (mysong) => {
        const mylink = mysong.href;
        const link_id = mylink.split("tracks/")[1];
        console.log(link_id);
        const vid = `https://open.spotify.com/track/${link_id}`;
        const songapi = `https://api.song.link/v1-alpha.1/links?url=${vid}&userCountry=US&songIfSingle=true`;
        console.log(songapi);
        ///////////////////////////
        await fetch(songapi)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // setSharePage(data.pageUrl);
            if (data.linksByPlatform.youtube) {
              const yt_id = data.linksByPlatform.youtube.url.split("v=")[1];
              arr.push(`${yt_id}`);
              // console.log(arr);
              console.log(data.linksByPlatform.youtube.url);
            }
            // {
            //   let resultLimit = 1;
            //   //grab track artist
            //   let artistName = mysong.artists[0];
            //   let song = mysong.name;
            //   let songQuery = `${song}%20by%20${artistName}`;
            //   songQuery = songQuery.replaceAll(" ", "%20");
            //   axios(
            //     `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&q=${songQuery}&key=${YT_API}`,
            //     {
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //       method: "GET",
            //     }
            //   )
            //     .then((link) => {
            //       let ytUrlId = link.data.items[0].id.videoId;
            //       arr.push(`${ytUrlId}`);
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     });
            // }
          })
          .catch((err) => {
            console.log(err);
          });
        x++;
        if (x === y) {
          // console.log(arr);
          // setYtLink(arr);
          getYt(arr);
        }
      });
    }
  }
  function getYt(arr) {
    if (arr.length == 10) {
      console.log(arr.length);
      localStorage.setItem("yt", JSON.stringify({ arr: arr }));
      window.open("http://localhost:3000/youtube_playlist", "_self");
    }
  }

  ////////////////////////////////////////////////////////////
  const PostVideo = async (data) => {
    if (data.error) {
      console.log(data.error);
      //   M.toast({ html: data.error, classes: "#c62828 red darken-3" });
    } else {
      //data.videos
      // console.log(data);
      var arr = [];
      let x = 0,
        y = data.length;

      data.map(async (vid) => {
        const mylink = vid.href;
        const link_id = mylink.split("tracks/")[1];
        arr.push(`spotify:track:${link_id}`);
        ///////////////////////
        x++;
        if (x === y) {
          localStorage.setItem("arr", JSON.stringify({ arr: arr }));
          window.open("http://localhost:5000/login3", "_self");
          //   fetch("/download3", {
          //     method: "post",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       urls: arr,
          //     }),
          //   })
          //     .then((res) => res.json())
          //     .then((data) => {
          //       alert("Created Playlist Successfully");
          //     });

          // const data = await result.json();
        }
      });
      console.log(arr);
      /////////////////////////
    }
  };
  /////////////////////////////////////
  return (
    <>
      <div className="main-container text-center">
        <Message
          songDetails={songDetails}
          songURL={songLink}
          trackCount={trackCount}
          setTrackCount={setTrackCount}
          sharePage={sharePage}
        />
        {songDetails && songLink && (
          <Container style={{ padding: "0px" }}>
            <Row style={{ padding: "0px", margin: "0px" }}>
              <Col style={{ padding: "0px", marginTop: "1.5px" }}>
                <button
                  className="source btn"
                  type="button"
                  onClick={() => PostVideo(songDetails)}
                >
                  Add to Spotify
                </button>
                <button
                  type="button"
                  id="grid-btn"
                  className="source btn"
                  onClick={() => getYoutube_playlist()}
                >
                  Add to Youtube
                </button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
      <section className="hero-section">
        <div className="card-grid">
          <a className="card">
            <div
              onClick={handleClick}
              title="NewYear's Eve"
              id="37i9dQZF1DX1YMPNuWL6BX"
              className="card__background"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1564985275293-ef002b57fd0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80)",
              }}
            ></div>
            <div
              className="card__content"
              onClick={handleClick}
              title="NewYear's Eve"
              id="3AFToCrtdsqFxX6CdGdwzl"
            >
              <p
                className="card__category"
                onClick={handleClick}
                title="NewYear's Eve"
                id="3AFToCrtdsqFxX6CdGdwzl"
              >
                Category
              </p>
              <h3
                className="card__heading"
                onClick={handleClick}
                title="NewYear's Eve"
                id="3AFToCrtdsqFxX6CdGdwzl"
              >
                New Year's Eve
              </h3>
            </div>
          </a>
          <a className="card">
            <div
              onClick={handleClick}
              title="Rock Party"
              id="37i9dQZF1DX8FwnYE6PRvL"
              className="card__background"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
              }}
            ></div>
            <div
              className="card__content"
              onClick={handleClick}
              title="Rock Party"
              id="37i9dQZF1DX8FwnYE6PRvL"
            >
              <p
                className="card__category"
                onClick={handleClick}
                title="Rock Party"
                id="37i9dQZF1DX8FwnYE6PRvL"
              >
                Category
              </p>
              <h3
                className="card__heading"
                onClick={handleClick}
                title="Rock Party"
                id="37i9dQZF1DX8FwnYE6PRvL"
              >
                Rock Party
              </h3>
            </div>
          </a>
          <a className="card">
            <div
              onClick={handleClick}
              title="House Party"
              id="37i9dQZF1DXd5DCuoVuFY3"
              className="card__background"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1520438901-f822f9f4be01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80)",
              }}
            ></div>
            <div
              className="card__content"
              onClick={handleClick}
              title="House Party"
              id="37i9dQZF1DXd5DCuoVuFY3"
            >
              <p
                className="card__category"
                onClick={handleClick}
                title="House Party"
                id="37i9dQZF1DXd5DCuoVuFY3"
              >
                Category
              </p>
              <h3
                className="card__heading"
                onClick={handleClick}
                title="House Party"
                id="37i9dQZF1DXd5DCuoVuFY3"
              >
                House Party
              </h3>
            </div>
          </a>
          <a className="card">
            <div
              onClick={handleClick}
              title="Dance Party"
              id="37i9dQZF1DXaXB8fQg7xif"
              className="card__background"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1583318432730-a19c89692612?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80)",
              }}
            ></div>
            <div
              className="card__content"
              onClick={handleClick}
              title="Dance Party"
              id="37i9dQZF1DXaXB8fQg7xif"
            >
              <p
                className="card__category"
                onClick={handleClick}
                title="Dance Party"
                id="37i9dQZF1DXaXB8fQg7xif"
              >
                Category
              </p>
              <h3
                className="card__heading"
                onClick={handleClick}
                title="Dance Party"
                id="37i9dQZF1DXaXB8fQg7xif"
              >
                Dance Party
              </h3>
            </div>
          </a>
          <a className="card">
            <div
              onClick={handleClick}
              title="Filmy Songs"
              id="37i9dQZF1DWTUfv2yzHEe7"
              className="card__background"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
              }}
            ></div>
            <div
              className="card__content"
              onClick={handleClick}
              title="Filmy Songs"
              id="37i9dQZF1DWTUfv2yzHEe7"
            >
              <p
                className="card__category"
                onClick={handleClick}
                title="Filmy Songs"
                id="37i9dQZF1DWTUfv2yzHEe7"
              >
                Category
              </p>
              <h3
                className="card__heading"
                onClick={handleClick}
                title="Filmy Songs"
                id="37i9dQZF1DWTUfv2yzHEe7"
              >
                Filmy Songs
              </h3>
            </div>
          </a>
          <a className="card">
            <div
              onClick={handleClick}
              title="Family Party"
              id="0ZjPyJzy3zNaDsLEpDyMO0"
              className="card__background"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1643868420405-48e32c6f4620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
              }}
            ></div>
            <div
              className="card__content"
              onClick={handleClick}
              title="Family Party"
              id="0ZjPyJzy3zNaDsLEpDyMO0"
            >
              <p
                className="card__category"
                onClick={handleClick}
                title="Family Party"
                id="0ZjPyJzy3zNaDsLEpDyMO0"
              >
                Category
              </p>
              <h3
                className="card__heading"
                onClick={handleClick}
                title="Family Party"
                id="0ZjPyJzy3zNaDsLEpDyMO0"
              >
                Family Party
              </h3>
            </div>
          </a>
          <a className="card">
            <div
              onClick={handleClick}
              title="Lofi Beats"
              id="0vvXsWCC9xrXsKd4FyS8kM"
              className="card__background"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1558304970-abd589baebe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80)",
              }}
            ></div>
            <div
              className="card__content"
              onClick={handleClick}
              title="Lofi Beats"
              id="0vvXsWCC9xrXsKd4FyS8kM"
            >
              <p
                className="card__category"
                onClick={handleClick}
                title="Lofi Beats"
                id="0vvXsWCC9xrXsKd4FyS8kM"
              >
                Category
              </p>
              <h3
                className="card__heading"
                onClick={handleClick}
                title="Lofi Beats"
                id="0vvXsWCC9xrXsKd4FyS8kM"
              >
                Lofi Beats
              </h3>
            </div>
          </a>
          <a className="card">
            <div
              onClick={handleClick}
              title="Throwback Party"
              id="37i9dQZF1DX7F6T2n2fegs"
              className="card__background"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1466378743612-9da217f53e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
              }}
            ></div>
            <div
              className="card__content"
              onClick={handleClick}
              title="Throwback Party"
              id="37i9dQZF1DX7F6T2n2fegs"
            >
              <p
                className="card__category"
                onClick={handleClick}
                title="Throwback Party"
                id="37i9dQZF1DX7F6T2n2fegs"
              >
                Category
              </p>
              <h3
                className="card__heading"
                onClick={handleClick}
                title="Throwback Party"
                id="37i9dQZF1DX7F6T2n2fegs"
              >
                Throwback Party
              </h3>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
