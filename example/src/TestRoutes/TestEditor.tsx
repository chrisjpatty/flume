import React from "react";
import "normalize.css";

import { Controls, FlumeConfig, NodeEditor } from "node-editor";

const Log = console.log;

const config = new FlumeConfig()
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    controls: [
      Controls.number({
        name: "number"
      })
    ]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    initialWidth: 150,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addNodeType({
    type: "addNumbers",
    label: "Add Numbers",
    initialWidth: 150,
    inputs: ports => [
      ports.number({
        name: "num1"
      }),
      ports.number({
        name: "num2"
      })
    ],
    outputs: ports => [
      ports.number({
        name: "result"
      })
    ]
  });

const TestEditor = () => {
  const [output, setOutput] = React.useState<string | undefined>();

  React.useEffect(() => {
    console.log = log => {
      Log(log);
      if (typeof log === "object") {
        setOutput(JSON.stringify(log));
      }
    };
    return () => {
      console.log = Log;
    };
  });
  return (
    <div className="wrapper" style={{ width: 800, height: 600 }}>
      <NodeEditor
        portTypes={config.portTypes}
        nodeTypes={config.nodeTypes}
        nodes={{}}
        debug
      />
      <div id="OUTPUT" style={{ display: "none" }}>
        {output}
      </div>
    </div>
  );
};

export default TestEditor;
