import React, { useEffect, useState } from "react";
import "../css/player_styles.css";
import Header from "./Header";
import Cards from "./Cards.js";
import axios from "axios";
const CLIENT_ID = "";
const CLIENT_SECRET = "";

export default function Party() {
  const [mood, setMood] = useState("Haudiofeel?");
  const [token, setToken] = useState("");

  //get spotify access token
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
      console.log(tokenResponse.data.access_token);
    });
  }, []);

  return (
    <div>
      <Header mood={mood} />
      <Cards setMood={setMood} token={token} />
    </div>
  );
}
