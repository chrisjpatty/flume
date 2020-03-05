const commonAttributes = [
  {
    name: "label",
    label: "Label",
    defaultValue: "New Field",
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
  }
];

const optionsAttribute = {
  name: "options",
  label: "Options",
  defaultValue: [{ value: "", label: "[Pick an Option]" }],
  type: "options"
};

export default {
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
