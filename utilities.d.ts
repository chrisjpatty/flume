import { FlumeNode } from "./types";
export declare const checkForCircularNodes: (nodes: {
    [nodeId: string]: FlumeNode;
}, startNodeId: string) => boolean;
