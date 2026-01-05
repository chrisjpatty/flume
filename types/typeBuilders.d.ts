import {NodeTypes, PortTypes, NodeType, PortType} from "./index";

export namespace Controls {
    function text(config: any): {
        type: string;
        label?: string;
        name: string;
        defaultValue: any;
        setValue?: (oldData: any, newData: any) => any;
    };
    function select(config: any): {
        type: string;
        label?: string;
        name: string;
        defaultValue: any;
        setValue?: (oldData: any, newData: any) => any;
    };
    function number(config: any): {
        type: string;
        label?: string;
        name: string;
        defaultValue: any;
        setValue?: (oldData: any, newData: any) => any;
    };
    function checkbox(config: any): {
        type: string;
        label?: string;
        name: string;
        defaultValue: any;
        setValue?: (oldData: any, newData: any) => any;
    };
    function multiselect(config: any): {
        type: string;
        label?: string;
        name: string;
        defaultValue: any;
        setValue?: (oldData: any, newData: any) => any;
    };
    function custom(config: any): {
        type: string;
        label?: string;
        name: string;
        defaultValue: any;
        setValue?: (oldData: any, newData: any) => any;
    };
}
export namespace Colors {
    const yellow: string;
    const orange: string;
    const red: string;
    const pink: string;
    const purple: string;
    const blue: string;
    const green: string;
    const grey: string;
}
export class FlumeConfig {
    constructor(config?: FlumeConfig);
    nodeTypes: NodeTypes;
    portTypes: PortTypes;
    addRootNodeType(config: NodeType): FlumeConfig;
    addNodeType(config: NodeType): FlumeConfig;
    removeNodeType(type: any): FlumeConfig;
    addPortType(config: PortType): FlumeConfig;
    removePortType(type: any): FlumeConfig;
}
