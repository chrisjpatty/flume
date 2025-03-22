import { Coordinate, FlumeNode, StageState, TransputType } from "./types";
import FlumeCache from "./Cache";
import { RefObject } from "react";
export declare const getPortRect: (nodeId: string, portName: string, transputType?: TransputType | undefined, cache?: RefObject<FlumeCache> | undefined) => DOMRect | null;
export declare const getPortRectsByNodes: (nodes: {
    [nodeId: string]: FlumeNode;
}, forEachConnection: (connection: {
    to: DOMRect | null;
    from: DOMRect | null;
    name: string;
}) => void) => {
    [key: string]: DOMRect | null;
};
export declare const calculateCurve: (from: Coordinate, to: Coordinate) => string;
export declare const deleteConnection: ({ id }: {
    id: string;
}) => void;
export declare const deleteConnectionsByNodeId: (nodeId: string) => void;
export declare const updateConnection: ({ line, from, to }: {
    line: SVGPathElement;
    from: Coordinate;
    to: Coordinate;
}) => void;
export declare const createSVG: ({ from, to, stage, id, outputNodeId, outputPortName, inputNodeId, inputPortName }: {
    from: Coordinate;
    to: Coordinate;
    stage: HTMLDivElement;
    id: string;
    outputNodeId: string;
    outputPortName: string;
    inputNodeId: string;
    inputPortName: string;
}) => SVGSVGElement;
export declare const getStageRef: (editorId: string) => HTMLDivElement | null;
export declare const createConnections: (nodes: {
    [nodeId: string]: FlumeNode;
}, { scale }: StageState, editorId: string) => void;
