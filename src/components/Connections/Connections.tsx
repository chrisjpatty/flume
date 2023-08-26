import React from "react";
import { CONNECTIONS_ID } from "../../constants";
import styles from "./Connections.css";

interface ConnectionsProps {
  editorId: string;
}

const Connections = ({ editorId }: ConnectionsProps) => (
  <div className={styles.svgWrapper} id={`${CONNECTIONS_ID}${editorId}`} />
);

export default Connections;
