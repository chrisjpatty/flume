import { designerStore  } from './Form'

const commonFieldOutputTypes = [
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
  },
  {
    type: "value",
    name: "value"
  },
  {
    type: "fieldId",
    name: "fieldId",
    label: "Field"
  }
]

const NodeTypes = {
  output: {
    type: "output",
    description: "The root node for outputing attribute values.",
    label: "Field Attributes",
    addable: false,
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
    sortIndex: 0,
    inputs: [
      {
        type: "fieldId",
        name: "fieldId"
      }
    ],
    outputs: [
      ...commonFieldOutputTypes
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
    ],
    outputs: [
      {
        type: 'boolean',
        name: 'output',
        label: 'True/False'
      }
    ]
  },
  valueEqualsValue: {
    label: "Values Equal",
    description: "Outputs whether two values equal each other.",
    type: 'valueEqualsValue',
    inputs: [
      {
        type: "value",
        name: "val1"
      },
      {
        type: "value",
        name: "val2"
      }
    ],
    outputs: [
      {
        type: "boolean",
        name: "output"
      }
    ]
  },
  valueEqualsBoolean: {
    label: "Value Equals True/False",
    description: "Outputs whether a value equals a True/False.",
    type: 'valueEqualsBoolean',
    inputs: [
      {
        type: "value",
        name: "val1"
      },
      {
        type: "boolean",
        name: "boolean"
      }
    ],
    outputs: [
      {
        type: "boolean",
        name: "output"
      }
    ]
  },
  valueEqualsOneOfOptions: {
    type: "valueEqualsOneOfOptions",
    label: "Equals one of options",
    description: "Outputs if a value equals one of several options.",
    inputs: [
      {
        type: "fieldId",
        name: "fieldId",
        hidePort: true,
        controls: [
          {
            type: "select",
            name: "selectedFieldId",
            label: "Field",
            defaultValue: "",
            placeholder: "[Select a Field]",
            options: [],
            setValue: (newData, oldData) => {
              if(newData.fieldId.selectedFieldId !== oldData.fieldId.selectedFieldId){
                return {
                  ...newData,
                  selectedOptions: {
                    ...newData.selectedOptions,
                    values: []
                  }
                }
              }else{
                return newData
              }
            },
            getOptions: () => (
              Object.values(designerStore.getFields())
              .filter(f => f.type === "select")
              .map(f => ({
                value: f.id,
                label: f.label,
                description: f.type
              }))
            )
          }
        ]
      },
      {
        type: "stringArray",
        name: "selectedOptions",
        hidePort: true,
        controls: [
          {
            type: "multiselect",
            name: "values",
            getOptions: (inputData) => {
              const field = designerStore.getFields()[inputData.fieldId.selectedFieldId] || {}
              return field.options || []
            },
            defaultValue: []
          }
        ]
      },
      {
        type: "value",
        name: "value",
        label: "Value (optional)"
      }
    ],
    outputs: [
      {
        type: "boolean",
        name: "output"
      }
    ]
  },
  number: {
    label: "Number",
    description: "Outputs a number.",
    type: "number",
    initialWidth: 130,
    inputs: [
      {
        type: 'number',
        name: 'number'
      }
    ],
    outputs: [
      {
        type: 'number',
        name: 'number'
      }
    ]
  },
  boolean: {
    label: "True/False",
    description: "Outputs a True/False.",
    type: "boolean",
    initialWidth: 130,
    inputs: [
      {
        type: 'boolean',
        name: 'boolean'
      }
    ],
    outputs: [
      {
        type: 'boolean',
        name: 'boolean'
      }
    ]
  },
  string: {
    label: "Text",
    description: "Outputs a string of text.",
    type: "string",
    inputs: [
      {
        type: 'string',
        name: 'string'
      }
    ],
    outputs: [
      {
        type: 'string',
        name: 'string'
      }
    ]
  },
  textSwitch: {
    label: "Text Switch",
    description: "Outputs text based on a given true/false input.",
    type: 'textSwitch',
    inputs: [
      {
        type: "boolean",
        name: "test"
      },
      {
        type: "string",
        name: "textIfTrue",
        label: "Text if true"
      },
      {
        type: "string",
        name: "textIfFalse",
        label: "Text if false"
      }
    ],
    outputs: [
      {
        type: "string",
        name: "output"
      }
    ]
  }
}
export default NodeTypes
