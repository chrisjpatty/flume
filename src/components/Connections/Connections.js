import React from "react";
import { CONNECTIONS_ID } from "../../constants";
import styled from "@emotion/styled";

const SVGWrapper = styled.div`
  position: absolute;
  left: 0px;
  height: 0px;
`;

const Connections = ({ nodes, editorId }) => {
  return <SVGWrapper id={`${CONNECTIONS_ID}${editorId}`} />;
};

export default Connections;
