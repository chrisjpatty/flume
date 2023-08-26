import React from "react";
import { calculateCurve } from "../../connectionCalculator";
import { Coordinate } from "../../types";
import styles from "./Connection.css";

interface ConnectionProps {
  from: Coordinate;
  to: Coordinate;
  id?: string;
  lineRef: React.Ref<SVGPathElement>;
  outputNodeId?: string;
  outputPortName?: string;
  inputNodeId?: string;
  inputPortName?: string;
}

const Connection = ({
  from,
  to,
  id,
  lineRef,
  outputNodeId,
  outputPortName,
  inputNodeId,
  inputPortName
}: ConnectionProps) => {
  const curve = calculateCurve(from, to);
  return (
    <svg className={styles.svg} data-flume-component="connection-svg">
      <path
        data-connection-id={id}
        data-output-node-id={outputNodeId}
        data-output-port-name={outputPortName}
        data-input-node-id={inputNodeId}
        data-input-port-name={inputPortName}
        data-flume-component="connection-path"
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
