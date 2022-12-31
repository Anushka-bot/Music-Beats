import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Equalizer() {
  return (
    <>
      <div id="equalizer">
        <div id="horizontal"></div>
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
    </>
  );
}

export function setEqualizer() {
  let lines = document.querySelectorAll(".vertical");
  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i];
    line.style.animation = `equalizer ${
      Math.random() * (3 - 0.3) + 0.3
    }s ease infinite`;
    line.style.animationDirection = "alternate-reverse";
  }
}
setEqualizer();
