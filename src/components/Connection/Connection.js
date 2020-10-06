import React from "react";
import { calculateCurve } from "../../connectionCalculator";
import styles from "./Connection.css";

//This component cannot easily be refactored, because the classes are also used in src/connectionCalculator.js . I have decided against code duplication.
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
  const curve = calculateCurve(from, to);
  return (
    <svg className={styles.svg}>
      <path
        data-connection-id={id}
        data-output-node-id={outputNodeId}
        data-output-port-name={outputPortName}
        data-input-node-id={inputNodeId}
        data-input-port-name={inputPortName}
        stroke="rgb(185, 186, 189)"
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        d={curve}
        ref={lineRef}
      />
    </svg>
  );
};

export default Connection;
