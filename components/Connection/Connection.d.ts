import React from "react";
import { Coordinate } from "../../types";
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
declare const Connection: ({ from, to, id, lineRef, outputNodeId, outputPortName, inputNodeId, inputPortName }: ConnectionProps) => JSX.Element;
export default Connection;
