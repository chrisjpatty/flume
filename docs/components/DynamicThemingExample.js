import React from 'react'
import { Colors, Controls, FlumeConfig, NodeEditor } from "flume";

const defaultNodes = {
  "RaOIu-i1Qo": {
    id: "RaOIu-i1Qo",
    x: -282.375,
    y: -77.6640625,
    type: "number",
    width: 140,
    connections: { inputs: {}, outputs: { number: [] } },
    inputData: { number: { number: 0 } }
  },
  "GGx-8iFtPP": {
    id: "GGx-8iFtPP",
    x: -65.3828125,
    y: -109.6640625,
    type: "addNumbers",
    width: 140,
    connections: { inputs: {}, outputs: {} },
    inputData: { num1: { number: 0 }, num2: { number: 0 } }
  },
  Esjqq_aoSE: {
    id: "Esjqq_aoSE",
    x: 152.625,
    y: -84.6640625,
    type: "string",
    width: 140,
    connections: { inputs: {}, outputs: {} },
    inputData: { string: { string: "" } }
  }
};

const config = new FlumeConfig()
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.red,
    controls: [
      Controls.number({
        name: "number",
        label: "Number"
      })
    ]
  })
  .addPortType({
    type: "string",
    name: "string",
    label: "Text",
    color: Colors.green,
    controls: [
      Controls.text({
        name: "string",
        label: "Text"
      })
    ]
  })
  .addNodeType({
    type: "string",
    label: "Text",
    initialWidth: 140,
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    initialWidth: 140,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addNodeType({
    type: "addNumbers",
    label: "Add Numbers",
    initialWidth: 140,
    inputs: ports => [
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number()]
  });

export const DynamicThemingExample = () => {
  return (
    <div style={{ width: "100%", height: 400, color: "#000" }}>
      <style type="text/css">
        {`
          [data-flume-node-type="addNumbers"] {
            background: linear-gradient(to top, #4e2020 0%, #20204e 100%);
            border: 1px solid rgba(255,255,255,.5);
            color: #fff;
          }
          [data-flume-node-type="addNumbers"] [data-flume-component="node-header"] {
            background: none;
          }
        `}
      </style>
      <NodeEditor
        defaultNodes={Object.values(defaultNodes)}
        portTypes={config.portTypes}
        nodeTypes={config.nodeTypes}
        debug
      />
    </div>
  );
}