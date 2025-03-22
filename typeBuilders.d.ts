import { CheckboxControl } from "./../dist/types.d";
import { CustomControl, MultiselectControl, NodeType, NodeTypeConfig, NumberControl, PortType, PortTypeBuilder, PortTypeConfig, SelectControl, TextControl } from "./types";
export declare const Controls: {
    text: (config: Omit<Partial<TextControl>, "type">) => TextControl;
    select: (config: Omit<Partial<SelectControl>, "type">) => SelectControl;
    number: (config: Omit<Partial<NumberControl>, "type">) => NumberControl;
    checkbox: (config: Omit<Partial<CheckboxControl>, "type">) => CheckboxControl;
    multiselect: (config: Omit<Partial<MultiselectControl>, "type">) => MultiselectControl;
    custom: (config: Omit<Partial<CustomControl>, "type">) => CustomControl;
};
export declare const Colors: {
    readonly yellow: "yellow";
    readonly orange: "orange";
    readonly red: "red";
    readonly pink: "pink";
    readonly purple: "purple";
    readonly blue: "blue";
    readonly green: "green";
    readonly grey: "grey";
};
export declare const getPortBuilders: (ports: {
    [portType: string]: PortType;
}) => {
    [portType: string]: PortTypeBuilder;
};
export declare class FlumeConfig {
    nodeTypes: {
        [nodeType: string]: NodeType;
    };
    portTypes: {
        [portType: string]: PortType;
    };
    constructor(config?: {
        nodeTypes: {
            [nodeType: string]: NodeType;
        };
        portTypes: {
            [portType: string]: PortType;
        };
    });
    addRootNodeType(config: NodeTypeConfig): this;
    addNodeType(config: NodeTypeConfig): this;
    removeNodeType(type: string): this;
    addPortType(config: PortTypeConfig): this;
    removePortType(type: string, { skipDynamicNodesCheck }?: {
        skipDynamicNodesCheck?: boolean | undefined;
    }): this;
}
