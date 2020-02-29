import React from "react";
import styles from "./Connection.css";

const Connection = ({ from, to }) => {
  return (
    <svg className={styles.svg}>
      <line
        stroke="rgb(185, 186, 189)"
        strokeWidth={5}
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
      />
    </svg>
  );
};

export default Connection;
