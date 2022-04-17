import { ReactNode } from "react";

export type InputData = { [portName: string]: { [controlName: string]: any } };

export type Control = {
  type: "text" | "select" | "number" | "checkbox" | "multiselect" | "custom";
  label: string;
  name: string;
  defaultValue: any;
  setValue: (newData: any, oldData: any) => any;
};

export type TextControl = Control & {
  type: "text";
  defaultValue: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectControl = Control & {
  type: "select";
  options: SelectOption[];
  defaultValue: string;
  getOptions?: (
    inputData: InputData,
    context: any
  ) => SelectOption[];
  placeholder?: string;
};

export type NumberControl = Control & {
  type: "number";
  defaultValue: number;
  step: number;
};

export type CheckboxControl = Control & {
  type: "checkbox";
  defaultValue: boolean;
};

export type MultiselectControl = Control & {
  type: "multiselect";
  options: SelectOption[];
  defaultValue: string[];
  getOptions?: (
    inputData: InputData,
    context: any
  ) => SelectOption[];
  placeholder?: string;
};

export type ControlRenderCallback = (
  data: any,
  onChange: (newData: any) => void,
  context: any,
  redraw: () => void,
  portProps: PortType,
  inputData: InputData
) => ReactNode;

export type CustomControl = Control & {
  type: "custom";
  defaultValue: any;
  render: ControlRenderCallback;
};

export enum Colors {
  yellow = "yellow",
  orange = "orange",
  red = "red",
  pink = "pink",
  purple = "purple",
  blue = "blue",
  green = "green",
  grey = "grey"
}

export type PortType = {
  type: string;
  name: string;
  label: string;
  noControls: boolean;
  color: string;
  hidePort: boolean;
  controls: Control[];
  acceptTypes: string[];
};

export type NodeType = {
  id: string;
  type: string;
  label: string;
  description: string;
  addable: boolean;
  deletable: boolean;
  initialWidth: number;
  sortIndex: number;
  root: boolean;
  inputs: PortType[];
  outputs: PortType[];
};

export type Connection = {
  nodeId: string;
  portName: string;
}

export type Connections = {
  inputs: { [portName: string]: Connection[] };
  outputs: { [portName: string]: Connection[] };
}

export type Node = {
  id: string;
  type: string;
  width: number;
  x: number;
  y: number;
  inputData: InputData;
  connections: Connections
};
