import React from "react";
import "../css/styles.css";
import Navbar2 from "./Navbar2";

export default function Downloader() {
  return (
    <>
      <Navbar2 />
      <div className="text-center">
        <div className="spot">
          Paste your favourite Youtube playlist link here
        </div>
      </div>

      <div className="searchBar">
        <form className="d-flex" method="POST" action="/download_yt">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Video URL"
            name="url"
          />
          <button className="btn mx-3" type="submit">
            Download
          </button>
        </form>
      </div>
    </>
  );
}
