import React from "react";
import "normalize.css";

import { NodeEditor, FlumeConfig, Controls, Colors } from "node-editor";

const flumeConfig = new FlumeConfig()
flumeConfig
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.red,
    controls: [
      Controls.number({
        name: "num",
        label: "Number"
      })
    ]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    initialWidth: 150,
    inputs: ports => [
      ports.number()
    ],
    outputs: ports => [
      ports.number()
    ]
  })
  .addNodeType({
    type: "addNumbers",
    label: "Add Numbers",
    initialWidth: 150,
    inputs: ports => [
      ports.number({name: "num1"}),
      ports.number({name: "num2"})
    ],
    outputs: ports => [
      ports.number({name: "result"})
    ]
  })

console.log(flumeConfig);

export default () => {
  return (
    <div className="wrapper">
      <NodeEditor
        portTypes={flumeConfig.portTypes}
        nodeTypes={flumeConfig.nodeTypes}
        debug
      />
    </div>
  );
};
