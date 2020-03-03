import React from "react";
import styles from "./Connection.css";

const Connection = ({
  from,
  to,
  id,
  lineRef,
  outputNodeId,
  outputPortName,
  inputNodeId,
  inputPortName
}) => {
  return (
    <svg className={styles.svg}>
      <line
        data-connection-id={id}
        data-output-node-id={outputNodeId}
        data-output-port-name={outputPortName}
        data-input-node-id={inputNodeId}
        data-input-port-name={inputPortName}
        stroke="rgb(185, 186, 189)"
        strokeWidth={5}
        strokeLinecap="round"
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        ref={lineRef}
      />
    </svg>
  );
};

export default Connection;
