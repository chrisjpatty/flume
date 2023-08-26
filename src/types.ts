import { HTMLProps, ReactNode } from "react";

export type ControlData = { [controlName: string]: any };
export type InputData = { [portName: string]: ControlData };

export type ControlTypes =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "multiselect"
  | "custom";

export type ValueSetter = (newData: any, oldData: any) => any;

export interface GenericControl {
  type: ControlTypes;
  label: string;
  name: string;
  defaultValue: any;
  setValue?: ValueSetter;
}

export interface TextControl extends GenericControl {
  type: "text";
  defaultValue: string;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  sortIndex?: number;
  node?: NodeType;
  internalType?: "comment";
}

export interface SelectControl extends GenericControl {
  type: "select";
  options: SelectOption[];
  defaultValue: string;
  getOptions?: (inputData: InputData, context: any) => SelectOption[];
  placeholder?: string;
}

export interface NumberControl extends GenericControl {
  type: "number";
  defaultValue: number;
  step?: number;
}

export interface CheckboxControl extends GenericControl {
  type: "checkbox";
  defaultValue: boolean;
}

export interface MultiselectControl extends GenericControl {
  type: "multiselect";
  options: SelectOption[];
  defaultValue: string[];
  getOptions?: (inputData: InputData, context: any) => SelectOption[];
  placeholder?: string;
}

export type ControlRenderCallback = (
  data: any,
  onChange: (newData: any) => void,
  context: any,
  redraw: () => void,
  portProps: {
    label: string;
    name: string;
    portName: string;
    inputLabel: string;
    defaultValue: any;
  },
  controlData: ControlData
) => ReactNode;

export interface CustomControl extends GenericControl {
  type: "custom";
  defaultValue: any;
  render: ControlRenderCallback;
}

export type Control =
  | TextControl
  | SelectControl
  | NumberControl
  | CheckboxControl
  | MultiselectControl
  | CustomControl;

export type Colors =
  | "yellow"
  | "orange"
  | "red"
  | "pink"
  | "purple"
  | "blue"
  | "green"
  | "grey";

export interface PortType {
  /**
   * A unique string identifier for the port. Preferred to be camelCased.
   */
  type: string;
  /**
   * A default string identifier used when the port is constructed.
   */
  name: string;
  /**
   * A default human-readable label for the port.
   */
  label: string;
  /**
   * When true the port will not render its controls.
   *
   * @defaultValue false
   */
  noControls: boolean;
  /**
   * The color of the port. Should be one of the colors defined by the Colors type.
   */
  color: Colors;
  /**
   * If true the ports controls will render but the actual port will not. This disallows connections.
   *
   * @defaultValue false
   */
  hidePort: boolean;
  /**
   * An array of controls to render on the port.
   */
  controls: Control[];
  /**
   * An array of port type strings. Only port types included in this array will be allowed to connect to this port. By default ports always accept their own type.
   */
  acceptTypes: string[];
}

export type PortTypeMap = { [portType: string]: PortType };

export type PortTypeBuilder = (config?: Partial<PortType>) => PortType;

export interface PortTypeConfig extends Partial<PortType> {
  type: string;
  name: string;
}

export type TransputType = "input" | "output";

export type TransputBuilder = (
  inputData: InputData,
  connections: Connections,
  context: any
) => PortType[];

export interface NodeType {
  /**
   * A unique randomly-generated string identifier for the node.
   */
  id: string;
  /**
   * A unique string identifier for the node. Preferred to be camelCased.
   */
  type: string;
  /**
   * A human-readable label for the node.
   */
  label: string;
  /**
   * A human-readable description for the node. Renders in the "Add Node" context menu.
   */
  description: string;
  /**
   * If false the node may not be added to the canvas.
   *
   * @defaultValue true
   */
  addable: boolean;
  /**
   * If false the node may not be removed from the canvas.
   *
   * @defaultValue true
   */
  deletable: boolean;
  inputs: PortType[] | TransputBuilder;
  outputs: PortType[] | TransputBuilder;
  initialWidth?: number;
  sortIndex?: number;
  root?: boolean;
}

export type NodeTypeMap = { [nodeType: string]: NodeType };

export type DynamicPortTypeBuilder = (
  inputData: InputData,
  connections: Connections,
  context: any
) => PortType[];

export interface NodeTypeConfig
  extends Omit<Partial<NodeType>, "inputs" | "outputs"> {
  type: string;
  /**
   * Represents the ports available to be connected as inputs to the node. Must be one of the following types:
   * - An array of ports
   * - A function that returns an array of ports at definition time
   * - A function that returns a function that returns an array of ports at runtime
   *
   * @example
   * ### Static ports
   * ```
   * inputs: ports => [
   *   ports.string({name: "stringPortName", label: "String Port Label"}),
   *   ports.number({name: "numberPortName", label: "Number Port Label"}),
   * ]
   * ```
   *
   * ### Dynamic ports
   * ```
   * inputs: ports => (inputData, connections, context) => {
   *   if(inputData.isAdmin.boolean) {
   *     return [ports.string({label: "Admin Name"})]
   *   }else{
   *    return []
   *   }
   * }
   * ```
   */
  inputs?:
    | PortType[]
    | ((ports: { [portType: string]: PortTypeBuilder }) => PortType[])
    | ((ports: {
        [portType: string]: PortTypeBuilder;
      }) => DynamicPortTypeBuilder);
  /**
   * Represents the ports available to be connected as outputs from the node. Must be one of the following types:
   * - An array of ports
   * - A function that returns an array of ports at definition time
   * - A function that returns a function that returns an array of ports at runtime
   *
   * @example
   * ### Static ports
   * ```
   * inputs: ports => [
   *   ports.string({name: "stringPortName", label: "String Port Label"}),
   *   ports.number({name: "numberPortName", label: "Number Port Label"}),
   * ]
   * ```
   *
   * ### Dynamic ports
   * ```
   * inputs: ports => (inputData, connections, context) => {
   *   if(inputData.isAdmin.boolean) {
   *     return [ports.string({label: "Admin Name"})]
   *   }else{
   *    return []
   *   }
   * }
   * ```
   */
  outputs?:
    | PortType[]
    | ((ports: { [portType: string]: PortTypeBuilder }) => PortType[])
    | ((ports: {
        [portType: string]: PortTypeBuilder;
      }) => DynamicPortTypeBuilder);
}

export type Connection = {
  nodeId: string;
  portName: string;
};

export type ConnectionMap = { [portName: string]: Connection[] };

export type Connections = {
  inputs: ConnectionMap;
  outputs: ConnectionMap;
};

export type FlumeNode = {
  id: string;
  type: string;
  width: number;
  x: number;
  y: number;
  inputData: InputData;
  connections: Connections;
  defaultNode?: boolean;
  root?: boolean;
};

export type DefaultNode = {
  type: string;
  x?: number;
  y?: number;
};

export type NodeMap = { [nodeId: string]: FlumeNode };

export type ToastTypes = "danger" | "info" | "success" | "warning";

export type Toast = {
  id: string;
  title: string;
  message: string;
  type: ToastTypes;
  duration: number;
  height: number;
  exiting: boolean;
};

export type FlumeComment = {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: Colors;
  isNew: boolean;
};

export type FlumeCommentMap = { [commentId: string]: FlumeComment };

export type StageTranslate = {
  x: number;
  y: number;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type StageState = {
  scale: number;
  translate: StageTranslate;
};

export type CircularBehavior = "prevent" | "warn" | "allow";

export type NodeHeaderActions = {
  openMenu: (event: MouseEvent | React.MouseEvent) => void | any;
  closeMenu: () => void | any;
  deleteNode: () => void | any;
};

export type NodeHeaderRenderCallback = (
  Wrapper: React.FC<HTMLProps<HTMLHeadingElement>>,
  nodeType: NodeType,
  actions: NodeHeaderActions
) => ReactNode;

export type PortResolver = (
  portType: string,
  data: InputData,
  context: any
) => any;

export type NodeResolver = (
  node: FlumeNode,
  inputValues: InputData,
  nodeType: NodeType,
  context: any
) => { [outputPortName: string]: any };

export interface RootEngineOptions {
  rootNodeId?: string;
  context?: any;
  maxLoops?: number;
  onlyResolveConnected?: boolean;
}
