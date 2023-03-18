import { CheckboxControl } from "./../dist/types.d";
import {
  Colors as ColorsType,
  Control,
  CustomControl,
  GenericControl,
  MultiselectControl,
  NodeType,
  NodeTypeConfig,
  NumberControl,
  PortType,
  PortTypeBuilder,
  PortTypeConfig,
  SelectControl,
  TextControl
} from "./types";
const define = <T extends any>(value: T, defaultValue: T): T =>
  value !== undefined ? value : defaultValue;

const buildDefaultConfig = (
  defaultConfig: Partial<GenericControl>,
  config: Partial<GenericControl>
): Omit<GenericControl, "type"> => {
  return {
    label: config.label ?? defaultConfig.label ?? "",
    name: config.name ?? defaultConfig.name ?? "",
    defaultValue: config.defaultValue ?? defaultConfig.defaultValue
  };
};

const buildTextControl = (
  config: Omit<Partial<TextControl>, "type">
): TextControl => {
  const defaultConfig = buildDefaultConfig(
    {
      name: "text",
      defaultValue: ""
    },
    config
  );
  return {
    ...defaultConfig,
    type: "text"
  };
};

const buildSelectControl = (
  config: Omit<Partial<SelectControl>, "type">
): SelectControl => {
  const defaultConfig = buildDefaultConfig(
    {
      name: "select",
      defaultValue: ""
    },
    config
  );
  return {
    ...defaultConfig,
    type: "select",
    options: config.options ?? [],
    getOptions: config.getOptions,
    placeholder: config.placeholder
  };
};

const buildNumberControl = (
  config: Omit<Partial<NumberControl>, "type">
): NumberControl => {
  const defaultConfig = buildDefaultConfig(
    {
      name: "number",
      defaultValue: 0
    },
    config
  );
  return {
    ...defaultConfig,
    type: "number",
    step: config.step
  };
};

const buildCheckboxControl = (
  config: Omit<Partial<CheckboxControl>, "type">
): CheckboxControl => {
  const defaultConfig = buildDefaultConfig(
    {
      name: "checkbox",
      defaultValue: false
    },
    config
  );
  return {
    ...defaultConfig,
    type: "checkbox"
  };
};

const buildMultiselectControl = (
  config: Omit<Partial<MultiselectControl>, "type">
): MultiselectControl => {
  const defaultConfig = buildDefaultConfig(
    {
      name: "multiselect",
      defaultValue: []
    },
    config
  );
  return {
    ...defaultConfig,
    type: "multiselect",
    options: config.options ?? [],
    getOptions: config.getOptions,
    placeholder: config.placeholder
  };
};

const buildCustomControl = (
  config: Omit<Partial<CustomControl>, "type">
): CustomControl => {
  const defaultConfig = buildDefaultConfig(
    {
      name: "custom",
      defaultValue: undefined
    },
    config
  );
  return {
    ...defaultConfig,
    type: "custom",
    render: config.render ?? (() => null)
  };
};

export const Controls = {
  text: buildTextControl,
  select: buildSelectControl,
  number: buildNumberControl,
  checkbox: buildCheckboxControl,
  multiselect: buildMultiselectControl,
  custom: buildCustomControl
};

export const Colors: { [key: string]: ColorsType } = {
  yellow: "yellow",
  orange: "orange",
  red: "red",
  pink: "pink",
  purple: "purple",
  blue: "blue",
  green: "green",
  grey: "grey"
};

export const getPortBuilders = (ports: {
  [portType: string]: PortType;
}): { [portType: string]: PortTypeBuilder } =>
  Object.values(ports).reduce((obj, port) => {
    obj[port.type] = (config: Partial<PortType> = {}) => {
      return {
        type: port.type,
        name: config.name || port.name,
        label: config.label || port.label,
        noControls: define(config.noControls, false),
        color: config.color || port.color,
        hidePort: define(config.hidePort, port.hidePort),
        controls: define(config.controls, port.controls)
      };
    };
    return obj;
  }, {});

export class FlumeConfig {
  nodeTypes: { [nodeType: string]: NodeType };
  portTypes: { [portType: string]: PortType };

  constructor(config?: {
    nodeTypes: { [nodeType: string]: NodeType };
    portTypes: { [portType: string]: PortType };
  }) {
    if (config) {
      this.nodeTypes = { ...config.nodeTypes };
      this.portTypes = { ...config.portTypes };
    } else {
      this.nodeTypes = {};
      this.portTypes = {};
    }
  }
  public addRootNodeType(config: NodeTypeConfig) {
    this.addNodeType({
      ...config,
      root: true,
      addable: false,
      deletable: false
    });
    return this;
  }
  public addNodeType(config: NodeTypeConfig) {
    if (typeof config !== "object" && config !== null) {
      throw new Error(
        "You must provide a configuration object when calling addNodeType."
      );
    }
    if (typeof config.type !== "string") {
      throw new Error(
        `Required key, "type" must be a string when calling addNodeType.`
      );
    }
    if (
      typeof config.initialWidth !== "undefined" &&
      typeof config.initialWidth !== "number"
    ) {
      throw new Error(
        `Optional key, "initialWidth" must be a number when calling addNodeType.`
      );
    }
    if (this.nodeTypes[config.type] !== undefined) {
      throw new Error(
        `A node with type "${config.type}" has already been declared.`
      );
    }
    const node: Partial<NodeType> = {
      type: config.type,
      label: define(config.label, ""),
      description: define(config.description, ""),
      addable: define(config.addable, true),
      deletable: define(config.deletable, true)
    };
    if (config.initialWidth) {
      node.initialWidth = config.initialWidth;
    }
    if (config.sortIndex !== undefined) {
      node.sortIndex = config.sortIndex;
    }
    if (typeof config.inputs === "function") {
      const inputs = config.inputs(getPortBuilders(this.portTypes));
      if (!Array.isArray(inputs) && typeof config.inputs !== "function") {
        throw new Error(
          `When providing a function to the "inputs" key, you must return either an array or a function.`
        );
      }
      node.inputs = inputs;
    } else if (config.inputs === undefined) {
      node.inputs = [];
    } else if (!Array.isArray(config.inputs)) {
      throw new Error(`Optional key, "inputs" must be an array.`);
    } else {
      node.inputs = config.inputs;
    }

    if (typeof config.outputs === "function") {
      const outputs = config.outputs(getPortBuilders(this.portTypes));
      if (!Array.isArray(outputs) && typeof config.outputs !== "function") {
        throw new Error(
          `When providing a function to the "outputs" key, you must return either an array or a function.`
        );
      }
      node.outputs = outputs;
    } else if (config.outputs === undefined) {
      node.outputs = [];
    } else if (config.outputs !== undefined && !Array.isArray(config.outputs)) {
      throw new Error(`Optional key, "outputs" must be an array.`);
    } else {
      node.outputs = config.outputs;
    }

    if (config.root !== undefined) {
      if (typeof config.root !== "boolean") {
        throw new Error(`Optional key, "root" must be a boolean.`);
      } else {
        node.root = config.root;
      }
    }

    this.nodeTypes[config.type] = node as NodeType;
    return this;
  }
  public removeNodeType(type: string) {
    if (!this.nodeTypes[type]) {
      console.error(`Non-existent node type "${type}" cannot be removed.`);
    } else {
      const { [type]: deleted, ...nodeTypes } = this.nodeTypes;
      this.nodeTypes = nodeTypes;
    }
    return this;
  }
  public addPortType(config: PortTypeConfig) {
    if (typeof config !== "object" && config !== null) {
      throw new Error(
        "You must provide a configuration object when calling addPortType"
      );
    }
    if (typeof config.type !== "string") {
      throw new Error(
        `Required key, "type" must be a string when calling addPortType.`
      );
    }
    if (this.portTypes[config.type] !== undefined) {
      throw new Error(
        `A port with type "${config.type}" has already been declared.`
      );
    }
    if (typeof config.name !== "string") {
      throw new Error(
        `Required key, "name" must be a string when calling addPortType.`
      );
    }

    const port: Partial<PortType> = {
      type: config.type,
      name: config.name,
      label: define(config.label, ""),
      color: define(config.color, Colors.grey),
      hidePort: define(config.hidePort, false)
    };

    if (config.acceptTypes === undefined) {
      port.acceptTypes = [config.type];
    } else if (!Array.isArray(config.acceptTypes)) {
      throw new Error(`Optional key, "acceptTypes" must be an array.`);
    } else {
      port.acceptTypes = config.acceptTypes;
    }

    if (config.controls === undefined) {
      port.controls = [];
    } else if (!Array.isArray(config.controls)) {
      throw new Error(`Optional key, "controls" must be an array.`);
    } else {
      port.controls = config.controls;
    }

    this.portTypes[config.type] = port as PortType;
    return this;
  }
  public removePortType(type: string, { skipDynamicNodesCheck = false } = {}) {
    if (!this.portTypes[type]) {
      console.error(`Non-existent port type "${type}" cannot be removed.`);
    } else {
      if (!skipDynamicNodesCheck) {
        const dynamicNodes = Object.values(this.nodeTypes).filter(
          node =>
            typeof node.inputs === "function" ||
            typeof node.outputs === "function"
        );
        if (dynamicNodes.length) {
          console.warn(
            `We've detected that one or more of your nodes is using dynamic inputs/outputs. This is a potentially dangerous operation as we are unable to detect if this portType is being used in one of those nodes. You can quiet this message by passing { skipDynamicNodesCheck: true } in as the second argument.`
          );
        }
      }
      const affectedNodes = Object.values(this.nodeTypes).filter(
        node =>
          (Array.isArray(node.inputs) &&
            node.inputs.find(p => p.type === type)) ||
          (Array.isArray(node.outputs) &&
            node.outputs.find(p => p.type === type))
      );
      if (affectedNodes.length) {
        throw new Error(
          `Cannot delete port type "${type}" without first deleting all node types using these ports: [${affectedNodes
            .map(n => `${n.type}`)
            .join(", ")}]`
        );
      } else {
        const { [type]: deleted, ...portTypes } = this.portTypes;
        this.portTypes = portTypes;
      }
    }
    return this;
  }
}
