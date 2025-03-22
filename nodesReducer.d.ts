import { RefObject } from "react";
import { CircularBehavior, DefaultNode, NodeMap, NodeTypeMap, PortTypeMap, TransputType, ValueSetter } from "./types";
import FlumeCache from "./Cache";
import { ToastAction } from "./toastsReducer";
export declare const getInitialNodes: (initialNodes: NodeMap | undefined, defaultNodes: DefaultNode[] | undefined, nodeTypes: NodeTypeMap, portTypes: PortTypeMap, context: any) => NodeMap;
export declare enum NodesActionType {
    ADD_CONNECTION = "ADD_CONNECTION",
    REMOVE_CONNECTION = "REMOVE_CONNECTION",
    DESTROY_TRANSPUT = "DESTROY_TRANSPUT",
    ADD_NODE = "ADD_NODE",
    REMOVE_NODE = "REMOVE_NODE",
    HYDRATE_DEFAULT_NODES = "HYDRATE_DEFAULT_NODES",
    SET_PORT_DATA = "SET_PORT_DATA",
    SET_NODE_COORDINATES = "SET_NODE_COORDINATES"
}
declare type ProposedConnection = {
    nodeId: string;
    portName: string;
};
export declare type NodesAction = {
    type: NodesActionType.ADD_CONNECTION | NodesActionType.REMOVE_CONNECTION;
    input: ProposedConnection;
    output: ProposedConnection;
} | {
    type: NodesActionType.DESTROY_TRANSPUT;
    transput: ProposedConnection;
    transputType: TransputType;
} | {
    type: NodesActionType.ADD_NODE;
    nodeType: string;
    x: number;
    y: number;
    id?: string;
    defaultNode?: boolean;
} | {
    type: NodesActionType.REMOVE_NODE;
    nodeId: string;
} | {
    type: NodesActionType.HYDRATE_DEFAULT_NODES;
} | {
    type: NodesActionType.SET_PORT_DATA;
    nodeId: string;
    portName: string;
    controlName: string;
    data: any;
    setValue?: ValueSetter;
} | {
    type: NodesActionType.SET_NODE_COORDINATES;
    x: number;
    y: number;
    nodeId: string;
};
interface FlumeEnvironment {
    nodeTypes: NodeTypeMap;
    portTypes: PortTypeMap;
    cache?: RefObject<FlumeCache>;
    circularBehavior?: CircularBehavior;
    context: any;
}
declare const nodesReducer: (nodes: NodeMap, action: NodesAction, { nodeTypes, portTypes, cache, circularBehavior, context }: FlumeEnvironment, dispatchToasts?: import("react").Dispatch<import("react").SetStateAction<ToastAction | undefined>> | undefined) => NodeMap;
export declare const connectNodesReducer: (reducer: typeof nodesReducer, environment: FlumeEnvironment, dispatchToasts: React.Dispatch<React.SetStateAction<ToastAction | undefined>>) => (state: NodeMap, action: NodesAction) => NodeMap;
export default nodesReducer;
