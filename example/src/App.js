import React from "react";
import "normalize.css";

import NodeEditor from "node-editor";

export default () => {
  return (
    <div className="wrapper">
      <NodeEditor
        inputTypes={{
          field: {
            label: 'Field',
            acceptTypes: ["field"],
            color: "blue",
            controls: [
              {
                type: "select",
                name: "fieldId",
                label: "Field",
                placeholder: "Select a field",
                defaultValue: "",
                options: [
                  {value: "fjwnaiw", label: "Type of Limited Liability Company", description: "FILING_SUBTYPE_ID - Dropdown"},
                  {value: "lk2li21", label: "The appointment of the registered agent listed above is an affirmation by the represented entity that the agent has consented to serve as a registered agent.", description: "ATTESTATION - Checkbox"},
                  {value: "vnalk13", label: "Organizers", description: "ORGANIZERS_PARTY_LIST - Repeater"}
                ]
              }
            ]
          },
          boolean: {
            label: 'True/False',
            acceptTypes: ["boolean"]
          },
          string: {
            label: 'Text',
            acceptTypes: ["string"],
            color: "green",
            controls: [
              {
                type: "text",
                name: "text",
                label: "Text",
                defaultValue: ""
              }
            ]
          },
          number: {
            label: 'Number',
            acceptTypes: ["number"],
            color: "red",
            controls: [
              {
                type: "number",
                name: "number",
                label: "Number",
                defaultValue: 0
              }
            ]
          },
          businessRules: {
            label: "Business Rules",
            acceptTypes: ["businessRules"],
            color: "purple"
          },
          value: {
            label: 'Value',
            acceptTypes: ["value"],
            color: "yellow"
          },
          options: {
            label: 'Options',
            acceptTypes: ["options"],
            color: "pink"
          }
        }}
        nodeTypes={{
          field: {
            label: 'Field',
            description: 'Represents an existing field in the current wizard.',
            type: 'field',
            sortIndex: 0,
            initialWidth: 230,
            inputs: [
              {
                type: 'field',
                name: 'fieldId'
              }
            ],
            outputs: [
              {
                type: 'field',
                name: 'fieldId',
                label: 'Field'
              },
              {
                type: 'value',
                name: 'value'
              },
              {
                type: 'string',
                name: 'label',
                label: 'Label'
              },
              {
                type: 'boolean',
                name: 'visible',
                label: 'Visible'
              },
              {
                type: 'boolean',
                name: 'disabled',
                label: 'Disabled'
              },
              {
                type: 'options',
                name: 'options',
                label: 'Options'
              }
            ]
          },
          numberGreaterThan: {
            label: "Greater Than",
            description: "Outputs true if the first number is greater than the second number.",
            type: "numberGreaterThan",
            inputs: [
              {
                type: 'number',
                name: 'num1'
              },
              {
                type: 'number',
                name: 'num2'
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
          text: {
            label: "Text",
            description: "Outputs a string of text.",
            type: 'text',
            inputs: [
              {
                type: 'string',
                name: 'text'
              }
            ],
            outputs: [
              {
                type: 'string',
                name: 'text'
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
          },
          and: {
            label: "And",
            description: "Outputs true if both values are true.",
            type: "and",
            sortIndex: 1,
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
          valueEqualsText: {
            label: "Value Equals Text",
            description: "Outputs whether a value is equal to a text.",
            type: 'valueEqualsText',
            inputs: [
              {
                type: "value",
                name: "value"
              },
              {
                type: "string",
                name: "text"
              }
            ],
            outputs: [
              {
                type: "boolean",
                name: "output"
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
          valueDoesNotEqualValue: {
            label: "Values Do Not Equal",
            description: "Outputs whether two values do not equal each other.",
            type: 'valueDoesNotEqualValue',
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
          booleanReverse: {
            label: "Reverse Boolean",
            description: "Outputs the opposite of a true/false",
            type: 'booleanReverse',
            inputs: [
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
          textToNumber: {
            label: "Text to Number",
            description: "Accepts text and converts it to a number.",
            type: "textToNumber",
            inputs: [
              {
                type: 'string',
                name: 'text'
              }
            ],
            outputs: [
              {
                type: 'number',
                name: 'number'
              }
            ]
          },
          numberToText: {
            label: "Number to Text",
            description: "Accepts text and converts it to a number.",
            type: "numberToText",
            inputs: [
              {
                type: 'number',
                name: 'number'
              }
            ],
            outputs: [
              {
                type: 'string',
                name: 'text'
              }
            ]
          },
          option: {
            label: "Option",
            description: "Outputs the value and label of a selected option.",
            type: "option",
            inputs: [
              {
                type: 'options',
                name: "options"
              },
              {
                type: 'string',
                name: 'selectedOptionValue',
                label: 'Selected Option Value',
                placeholder: "Select an option"
              }
            ],
            outputs: [
              {
                type: 'string',
                name: 'value',
                label: 'Value'
              },
              {
                type: 'string',
                name: 'label',
                label: 'Label'
              }
            ]
          },
          output: {
            addable: false,
            deleteable: false,
            label: "Field Attributes",
            type: "output",
            inputs: [
              {
                type: "string",
                name: "label",
                label: "Label",
                noControls: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                noControls: true
              },
              {
                type: "string",
                name: "tooltip",
                label: "Tooltip",
                noControls: true
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
                name: "includeInSummary",
                label: "Include in summary"
              },
              {
                type: "boolean",
                name: "required",
                label: "Show required indicator"
              },
              {
                type: "boolean",
                name: "hideFieldOnForm",
                label: "Hide field on form"
              },
              {
                type: "boolean",
                name: "hideLabelOnForm",
                label: "Hide label on form"
              },
              {
                type: "boolean",
                name: "redact",
                label: "Redact"
              },
              {
                type: "businessRules",
                name: "businessRules",
                label: "Business Rules"
              }
            ]
          }
        }}
        nodes={{
          io3daf9: {
            id: "io3daf9",
            type: "output",
            x: 300,
            y: -150,
            width: 200,
            height: 300,
            connections: {
              inputs: {},
              outputs: {}
            },
            inputData: {}
          }
        }}
        debug
      />
    </div>
  );
};
