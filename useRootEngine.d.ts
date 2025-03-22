import { RootEngine } from "./RootEngine";
import { NodeMap, RootEngineOptions } from "./types";
export declare const useRootEngine: <T extends {
    [inputName: string]: any;
}>(nodes: NodeMap, engine: RootEngine, context?: any, options?: RootEngineOptions | undefined) => T;
