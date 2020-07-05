import React from "react";
import "normalize.css";

import { NodeEditor } from "node-editor";

export default () => {
  return (
    <div className="wrapper">
      <NodeEditor
        portTypes={{
          number: {
            label: "Number",
            name: "number",
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
          }
        }}
        nodeTypes={{
          number: {
            type: "number",
            label: "Number",
            initialWidth: 150,
            inputs: [{ type: "number", name: "number" }],
            outputs: [
              {
                type: "number",
                name: "number"
              }
            ]
          },
          addNumbers: {
            type: "addNumbers",
            label: "Add Numbers",
            initialWidth: 150,
            inputs: [
              {
                type: "number",
                name: "num1"
              },
              {
                type: "number",
                name: "num2"
              }
            ],
            outputs: [{ type: "number", name: "result" }]
          }
        }}
        nodes={{}}
        debug
      />
    </div>
  );
};
