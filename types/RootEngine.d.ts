import {FlumeConfig, Node, NodeType} from "./index";

export default RootEngine;

type ResolveInputControl = (type: string, data: any, context?: any) => any;
type FireNodeFunction = (node: Node, inputValues: any, nodeType: NodeType, context: any) => any;

declare class RootEngine {
    constructor(config: FlumeConfig, resolveInputControls: ResolveInputControl, fireNodeFunction: FireNodeFunction);
    config: FlumeConfig;
    fireNodeFunction: FireNodeFunction;
    resolveInputControls: ResolveInputControl;
    loops: number;
    maxLoops: number;
    resetLoops: (maxLoops: any) => void;
    checkLoops: () => void;
    getRootNode: (nodes: any) => any;
    reduceRootInputs: (inputs: any, callback: any) => {};
    resolveInputValues: (node: any, nodeType: any, nodes: any, context: any) => any;
    getValueOfConnection: (connection: any, nodes: any, context: any) => any;
    resolveRootNode(nodes: any, options?: {}): any;
}
