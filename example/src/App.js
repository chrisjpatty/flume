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
                type: 'value',
                name: 'value'
              },
              {
                type: 'field',
                name: 'fieldId',
                label: 'Field'
              }
            ]
          },
          fieldValueEquals: {
            label: "Field Value Equals",
            description: "Outputs true if both values equal each other.",
            addable: true,
            deleteable: true,
            type: "fieldValueEquals",
            sortIndex: 1,
            inputs: [
              {
                type: 'field',
                name: 'fieldId'
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
          and: {
            label: "And",
            description: "Outputs true if both values are true.",
            type: "and",
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
              inputs: {
                visible: [
                  {
                    nodeId: "vmkld29",
                    portName: "output"
                  }
                ],
                disabled: [
                  {
                    nodeId: "alkjlnq",
                    portName: "output"
                  }
                ],
                hideFieldOnForm: [
                  {
                    nodeId: "rriwo92",
                    portName: "output"
                  }
                ],
                required: [
                  {
                    nodeId: "alkjlnq",
                    portName: "output"
                  }
                ]
              },
              outputs: {}
            }
          },
          rriwo92: {
            id: "rriwo92",
            type: "fieldValueEquals",
            x: 550,
            y: 500,
            width: 200,
            height: 300,
            connections: {
              inputs: {},
              outputs: {
                output: [
                  {
                    nodeId: "io3daf9",
                    portName: "hideFieldOnForm"
                  }
                ]
              }
            }
          },
          alkjlnq: {
            id: "alkjlnq",
            type: "fieldValueEquals",
            x: 400,
            y: 350,
            width: 200,
            height: 300,
            connections: {
              inputs: {},
              outputs: {
                output: [
                  {
                    nodeId: "io3daf9",
                    portName: "disabled"
                  },
                  {
                    nodeId: "io3daf9",
                    portName: "required"
                  }
                ]
              }
            }
          },
          vmkld29: {
            id: "vmkld29",
            type: "fieldValueEquals",
            x: 550,
            y: 200,
            width: 200,
            height: 300,
            connections: {
              inputs: {},
              outputs: {
                output: [
                  {
                    nodeId: "io3daf9",
                    portName: "visible"
                  }
                ]
              }
            }
          }
        }}
      />
    </div>
  );
};
