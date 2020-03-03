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
                label: "Text"
              }
            ]
          },
          number: {
            label: 'Number',
            acceptTypes: ["number"],
            color: "red"
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
          }
        }}
        nodeTypes={{
          field: {
            label: 'Field',
            description: 'Represents an existing field in the current wizard.',
            type: 'field',
            sortIndex: 0,
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
          valuesEqual: {
            label: "Values Equal",
            description: "Outputs whether two values equal each other.",
            type: 'valuesEqual',
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
          valuesDoNotEqual: {
            label: "Values Do Not Equal",
            description: "Outputs whether two values do not equal each other.",
            type: 'valuesDoNotEqual',
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
            description: "Accepts text, and attempts to output it as a number.",
            type: "textToNumber",
            inputs: [
              {
                type: "string",
                name: "text"
              }
            ],
            outputs: [
              {
                type: 'number',
                name: 'number'
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
            x: 900,
            y: 240,
            width: 200,
            height: 300,
            connections: {
              inputs: {},
              outputs: {}
            }
          }
        }}
      />
    </div>
  );
};
