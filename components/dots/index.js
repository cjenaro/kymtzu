import { useState } from "react";

import styles from "./dots.module.scss";

export default function Dots({ isToggled, toggle }) {
  return (
    <button
      onClick={toggle}
      className={styles[isToggled ? "active" : "inactive"]}
    >
      <svg
        width="27"
        height="10"
        viewBox="0 0 27 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="23.5"
          cy="5"
          r="3"
          transform="rotate(90 23.5 5)"
          fill="black"
        />
        <circle
          cx="13.5"
          cy="5"
          r="3"
          transform="rotate(90 13.5 5)"
          fill="black"
        />
        <circle
          cx="3.5"
          cy="5"
          r="3"
          transform="rotate(90 3.5 5)"
          fill="black"
        />
      </svg>
    </button>
  );
}
