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
            color: "green"
          },
          businessRules: {
            label: "Business Rules",
            acceptTypes: ["businessRules"],
            color: "purple"
          }
        }}
        nodeTypes={{
          fieldValueEquals: {
            label: "Field Value Equals",
            inputs: [
              { type: 'field' }
            ],
            outputs: [
              {
                type: 'boolean',
                name: 'output',
                label: 'True/False'
              }
            ]
          },
          output: {
            label: "Wizard Attributes",
            inputs: [
              {
                type: "string",
                name: "label",
                label: "Label"
              },
              {
                type: "string",
                name: "description",
                label: "Description"
              },
              {
                type: "string",
                name: "tooltip",
                label: "Tooltip"
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
              visible: {
                nodeId: "vmkld29",
                portName: "output"
              },
              disabled: {
                nodeId: "alkjlnq",
                portName: "output"
              },
              hideFieldOnForm: {
                nodeId: "rriwo92",
                portName: "output"
              },
              required: {
                nodeId: "alkjlnq",
                portName: "output"
              }
            }
          },
          rriwo92: {
            id: "rriwo92",
            type: "fieldValueEquals",
            x: 550,
            y: 500,
            width: 200,
            height: 300
          },
          alkjlnq: {
            id: "alkjlnq",
            type: "fieldValueEquals",
            x: 400,
            y: 350,
            width: 200,
            height: 300
          },
          vmkld29: {
            id: "vmkld29",
            type: "fieldValueEquals",
            x: 550,
            y: 200,
            width: 200,
            height: 300
          }
        }}
      />
    </div>
  );
};
