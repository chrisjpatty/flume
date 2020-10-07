export default RootEngine;
declare class RootEngine {
    constructor(config: any, resolveInputControls: any, fireNodeFunction: any);
    config: any;
    fireNodeFunction: any;
    resolveInputControls: any;
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
