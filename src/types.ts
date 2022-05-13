import { HTMLProps, ReactNode } from "react";

export type InputData = { [portName: string]: { [controlName: string]: any } };

export type ControlTypes =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "multiselect"
  | "custom";

export type ValueSetter = (newData: any, oldData: any) => any;

export interface TextControl {
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

export interface SelectControl {
  type: "select";
  options: SelectOption[];
  defaultValue: string;
  getOptions?: (inputData: InputData, context: any) => SelectOption[];
  placeholder?: string;
}

export interface NumberControl {
  type: "number";
  defaultValue: number;
  step: number;
}

export interface CheckboxControl {
  type: "checkbox";
  defaultValue: boolean;
}

export interface MultiselectControl {
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
  inputData: InputData
) => ReactNode;

export interface CustomControl {
  type: "custom";
  defaultValue: any;
  render: ControlRenderCallback;
}

export type Control = {
  type: ControlTypes;
  label: string;
  name: string;
  defaultValue: any;
  setValue: ValueSetter;
} & (
  | TextControl
  | SelectControl
  | NumberControl
  | CheckboxControl
  | MultiselectControl
  | CustomControl
);

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
  type: string;
  name: string;
  label: string;
  noControls: boolean;
  color: Colors;
  hidePort: boolean;
  controls: Control[];
  acceptTypes: string[];
}

export type PortTypeMap = { [portType: string]: PortType };

export type PortTypeBuilder = (config: Partial<PortType>) => PortType;

export interface PortTypeConfig extends Partial<PortType> {
  type: string;
}

export type TransputType = "input" | "output";

export type TransputBuilder = (
  inputData: InputData,
  connections: Connections,
  context: any
) => PortType[];

export interface NodeType {
  id: string;
  type: string;
  label: string;
  description: string;
  addable: boolean;
  deletable: boolean;
  inputs: PortType[] | TransputBuilder;
  outputs: PortType[] | TransputBuilder;
  initialWidth?: number;
  sortIndex?: number;
  root?: boolean;
}

export type NodeTypeMap = { [nodeType: string]: NodeType };

export interface NodeTypeConfig
  extends Omit<Partial<NodeType>, "inputs" | "outputs"> {
  type: string;
  inputs?: (ports: { [portType: string]: PortTypeBuilder }) => PortType[];
  outputs?: (ports: { [portType: string]: PortTypeBuilder }) => PortType[];
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
}

export type NodeHeaderRenderCallback = (
  Wrapper: React.FC<HTMLProps<HTMLHeadingElement>>,
  nodeType: NodeType,
  actions: NodeHeaderActions
) => ReactNode;
