import { PortResolver, NodeResolver, NodeMap, RootEngineOptions } from "./types";
import { FlumeConfig } from "./typeBuilders";
export declare class RootEngine {
    config: FlumeConfig;
    private resolveInputControls;
    private fireNodeFunction;
    private loops;
    private maxLoops;
    constructor(config: FlumeConfig, resolveInputControls: PortResolver, fireNodeFunction: NodeResolver);
    private resetLoops;
    private checkLoops;
    private getRootNode;
    private reduceRootInputs;
    private resolveInputValues;
    private getValueOfConnection;
    resolveRootNode<T extends {
        [inputName: string]: any;
    }>(nodes: NodeMap, rawOptions?: RootEngineOptions): T;
}
