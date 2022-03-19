import defaultNodes from './defaultNodes'

const commonAttributes = [
  {
    name: "label",
    label: "Label",
    defaultValue: "New Field",
    type: "text"
  },
  {
    name: "name",
    label: "Name",
    defaultValue: "FIELD_NAME",
    type: "text"
  },
  {
    name: "visible",
    label: "Visible",
    defaultValue: true,
    type: "checkbox"
  },
  {
    name: "disabled",
    label: "Disabled",
    defaultValue: false,
    type: "checkbox"
  },
  {
    name: "required",
    label: "Required",
    defaultValue: false,
    type: "checkbox"
  },
  {
    name: "logic",
    label: "Logic",
    defaultValue: defaultNodes,
    type: "logic"
  }
];

const optionsAttribute = {
  name: "options",
  label: "Options",
  defaultValue: [{ value: "", label: "[Pick an Option]" }],
  type: "options"
};

const fieldTypes = {
  text: {
    type: "text",
    label: "Text Input",
    defaultValue: "",
    attributes: [...commonAttributes]
  },
  checkbox: {
    type: "checkbox",
    label: "Checkbox",
    defaultValue: false,
    ownsLabel: true,
    attributes: [...commonAttributes]
  },
  select: {
    type: "select",
    label: "Dropdown",
    defaultValue: "",
    attributes: [...commonAttributes, optionsAttribute]
  }
};

export default fieldTypes;