import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transfer from "./components/Transfer";
import Grid from "./components/Grid";
import Download from "./components/Download";
import Spotify from "./components/Spotify";
import Youtube from "./components/Youtube";
import YoutubeToSpotify from "./components/YoutubeToSpotify";
import Party from "./components/Party";
import Spotify_playlist from "./components/Spotify_playlist";
import Youtube_playlist from "./components/Youtube_playlist";

// let mybutton = document.getElementById("btn-back-to-top");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }
// // // When the user clicks on the button, scroll to the top of the document
// mybutton.addEventListener("click", backToTop);

// function backToTop() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

function App() {
  return (
    <BrowserRouter>
      <ul className="strand">
        {/* <li></li>
        <li></li> */}
        {/* <li></li>
        <li></li> */}
        {/* <li></li>
        <li></li> */}
        {/* <li></li>
        <li></li> */}
        {/* <li></li> */}
        {/* <li></li>
        <li></li> */}
        {/* <li></li>
        <li></li> */}
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Routes>
        <Route path="/" element={<Grid />} />
      </Routes>
      <Routes>
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
      <Routes>
        <Route path="/download" element={<Download />} />
      </Routes>
      <Routes>
        <Route path="/download_from_spotify" element={<Spotify />} />
      </Routes>
      <Routes>
        <Route path="/download_from_youtube" element={<Youtube />} />
      </Routes>
      <Routes>
        <Route path="/youtube_to_spotify" element={<YoutubeToSpotify />} />
      </Routes>
      <Routes>
        <Route path="/party" element={<Party />} />
      </Routes>
      <Routes>
        <Route path="/spotify_playlist" element={<Spotify_playlist />} />
      </Routes>
      <Routes>
        <Route path="/youtube_playlist" element={<Youtube_playlist />} />
      </Routes>
      {/* <button
        type="button"
        class="btn btn-danger btn-floating"
        id="btn-back-to-top"
      >
        <i class="fas fa-arrow-up"></i>
      </button> */}
    </BrowserRouter>
  );
}

export default App;
