interface PortBuilderType {
    type: string;
    name?: string;
    label?: string;
    noControls?: boolean;
    color?: string;
    hidePort?: boolean;
    controls?: boolean;
}

export interface NodeType {
    type: string;
    label?: string;
    initialWidth?: number;
    inputs?: ((ports: PortTypes) => PortBuilderType[]) | PortBuilderType[];
    outputs?: ((ports: PortTypes) => PortBuilderType[]) | PortBuilderType[];
    root?: boolean;
    addable?: boolean;
    deletable?: boolean;
    description?: string;
    sortIndex?: number;
}

interface PortProps {
    label: string;
    inputLabel: string;
    name: string;
    portName: string;
    defaultValue: any;
    inputData: any;
}

interface Control {
    type: string;
    name?: string;
    label?: string;
    defaultValue?: any | any[];
    setValue?: (oldData: any, newData: any) => any;
    options?: any[];
    getOptions?: (any) => any;
    placeholder?: any;
    render?: (
        data: any,
        onChange: (data: any) => void,
        context: any,
        redraw: () => void,
        portProps: PortProps,
        inputData: any
      ) => JSX.Element;
}

export interface PortType {
    type: string;
    name: string;
    label?: string;
    acceptTypes?: string[];
    color: string;
    hidePort?: boolean;
    controls?: Control[]
}

interface NodeBase {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

interface Connection {
    nodeId: string;
    portName: string;
}

export interface Node extends NodeBase {
    type: string;
    connections: {
        inputs: {[id: string]: Connection};
        outputs: {[id: string]: Connection};
    };
    inputData: {[id: string]: {string?: string, boolean?: boolean, number?: number}};
}

export interface Comment extends NodeBase {
    text: string;
}

export interface DefaultNode {
    type: string;
    x: number;
    y: number;
}

export interface PortTypes {
    [id: string]: NodeType;
}

interface Nodes {
    [id: string]: Node;
}

interface Comments {
    [id: string]: Comment;
}

export interface NodeTypes {
    [id: string]: NodeType;
}

export function NodeEditor({ comments: initialComments, nodes: initialNodes, nodeTypes, portTypes, defaultNodes, context, onChange, onCommentsChange, initialScale, spaceToPan, hideComments, disableComments, disableZoom, disablePan, circularBehavior, debug }: {
    comments: Comments;
    nodes: Nodes;
    nodeTypes?: NodeTypes;
    portTypes?: PortTypes;
    defaultNodes?: DefaultNode[];
    context?: any;
    onChange?: (nodes: Nodes) => void;
    onCommentsChange?: (comments: Comments) => void;
    initialScale?: number;
    spaceToPan?: boolean;
    hideComments?: boolean;
    disableComments?: boolean;
    disableZoom?: boolean;
    disablePan?: boolean;
    circularBehavior?: "prevent" | "warn" | "allow";
    debug?: boolean;
}, ref: any): any;
export function useRootEngine(nodes: {[id: string]: Node}, engine: import("./RootEngine").default, context: any): any;
export { FlumeConfig, Controls, Colors } from "./typeBuilders";
