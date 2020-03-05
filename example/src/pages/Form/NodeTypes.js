export default {
  output: {
    type: "output",
    description: "The root node for outputing attribute values.",
    label: "Field Attributes",
    deletable: false,
    sortIndex: 1,
    inputs: [
      {
        type: "string",
        name: "label",
        label: "Label",
        noControls: true
      },
      {
        type: "boolean",
        name: "visible",
        label: "Visible",
        noControls: true
      },
      {
        type: "boolean",
        name: "disabled",
        label: "Disabled",
        noControls: true
      },
      {
        type: "boolean",
        name: "required",
        label: "Required",
        noControls: true
      }
    ],
    outputs: []
  },
  field: {
    type: "field",
    label: "Field",
    description: "Use another field's attributes as inputs.",
    deletable: false,
    inputs: [],
    sortIndex: 0,
    outputs: [
      {
        type: "string",
        name: "label",
        label: "Label"
      },
      {
        type: "boolean",
        name: "visible",
        label: "Visible"
      },
      {
        type: "boolean",
        name: "disabled",
        label: "Disabled"
      },
      {
        type: "boolean",
        name: "required",
        label: "Required"
      }
    ]
  },
  and: {
    label: "And",
    description: "Outputs true if both values are true.",
    type: "and",
    sortIndex: 2,
    inputs: [
      {
        type: "boolean",
        name: "val1"
      },
      {
        type: "boolean",
        name: "val2"
      }
    ],
    outputs: [
      {
        type: 'boolean',
        name: 'output',
        label: 'True/False'
      }
    ]
  },
  or: {
    label: "Or",
    description: "Outputs true if either value is true.",
    type: "or",
    sortIndex: 3,
    inputs: [
      {
        type: "boolean",
        name: "val1"
      },
      {
        type: "boolean",
        name: "val2"
      }
    ]
  }
}
