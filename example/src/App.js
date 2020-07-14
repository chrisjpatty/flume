import React from "react";
import "normalize.css";

import { NodeEditor, FlumeConfig, Controls, Colors } from "node-editor";

const colors = [
  {value: "blue", label: "Blue"},
  {value: "red", label: "Red"},
  {value: "green", label: "Green"},
  {value: "orange", label: "Orange"},
]

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
  .addPortType({
    type: "text",
    name: "text",
    label: "Text",
    color: Colors.green,
    controls: [
      Controls.text({
        name: "text",
        label: "Text"
      })
    ]
  })
  .addPortType({
    type: "boolean",
    name: "boolean",
    label: "True/False",
    color: Colors.grey,
    controls: [
      Controls.checkbox({name: "boolean", label: "True/False"})
    ]
  })
  .addPortType({
    type: "color",
    name: "color",
    label: "Color",
    color: Colors.blue,
    controls: [
      Controls.select({name: "color", getOptions: () => {
        return colors.map(color => color)
      }})
    ]
  })
  .addPortType({
    type: "animals",
    name: "animals",
    label: "Animals",
    controls: [
      Controls.multiselect({
        name: "values",
        label: "Animals",
        options: ["Cow", "Snake", "Butterfly", "Horse", "Lizard", "Tiger"]
          .map(animal => ({value: animal.toLowerCase(), label: animal}))
      })
    ]
  })
  .addPortType({
    type: "noOptions",
    name: "noOptions",
    label: "No Options",
    controls: [
      Controls.select({
        label: "This has no options",
        placeholder: '[Select an Option]',
        options: []
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
  .addNodeType({
    type: "boolean",
    label: "True/False",
    initialWidth: 150,
    inputs: ports => [
      ports.boolean()
    ],
    outputs: ports => [
      ports.boolean()
    ]
  })
  .addNodeType({
    type: "color",
    label: "Color",
    initialWidth: 170,
    inputs: ports => [
      ports.color()
    ],
    outputs: ports => [
      ports.color()
    ]
  })
  .addNodeType({
    type: "text",
    label: "Text",
    initialWidth: 170,
    inputs: ports => [
      ports.text()
    ],
    outputs: ports => [
      ports.text()
    ]
  })
  .addNodeType({
    type: "animals",
    label: "Animals",
    initialWidth: 160,
    inputs: ports => [
      ports.animals()
    ],
    outputs: ports => [
      ports.animals()
    ]
  })
  .addNodeType({
    type: 'stringEquals',
    label: "Text Equals",
    description: "Outputs if text equals another string of text.",
    initialWidth: 170,
    sortIndex: 33,
    inputs: ports => [
      ports.text({ name: "string1", label: "First String" }),
      ports.text({ name: "string2", label: "Second String" }),
      ports.boolean({ name: "caseSensitive", controls: [
        Controls.checkbox({
          label: "Case Sensitive",
          name: "boolean",
          defaultValue: true
        })
      ] })
    ],
    outputs: ports => [
      ports.boolean({ name: "result"})
    ]
  })
  .addNodeType({
    type: "noOptions",
    label: "No Options",
    description: "This node shows the empty state",
    initialWidth: 170,
    deletable: false,
    inputs: ports => [
      ports.noOptions()
    ]
  })

export default () => {
  const [nodes, setNodes] = React.useState({})
  return (
    <div className="wrapper">
      <NodeEditor
        portTypes={flumeConfig.portTypes}
        nodeTypes={flumeConfig.nodeTypes}
        nodes={nodes}
        onChange={nodes => {
          console.log(nodes);
          setNodes(nodes)
        }}
        debug
      />
    </div>
  );
};
