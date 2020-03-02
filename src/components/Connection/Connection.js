import React from "react";
import styles from "./Connection.css";

const connections = {}

export const ConnectionsState = {
  setConnection: (id, {x1, y1, x2, y2}) => {
    connections[id].setFrom({x: x1, y: y1})
    connections[id].setTo({x: x2, y: y2})
  }
}

const Connection = ({
  from: initialFrom,
  to: initialTo,
  id,
  lineRef,
  outputNodeId,
  outputPortName,
  inputNodeId,
  inputPortName
}) => {
  const [from, setFrom] = React.useState(initialFrom)
  const [to, setTo] = React.useState(initialTo)

  connections[id] = { setFrom, setTo }

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
