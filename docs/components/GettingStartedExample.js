import React from 'react'
import { FlumeConfig, Colors, Controls, NodeEditor } from 'flume'

const simpleConfig = new FlumeConfig()
simpleConfig
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
    description: "Outputs a string of text",
    inputs: ports => [
      ports.string()
    ],
    outputs: ports => [
      ports.string()
    ]
  })

const simpleConfig2 = new FlumeConfig()
simpleConfig2
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
  .addPortType({
    type: "boolean",
    name: "boolean",
    label: "True/False",
    color: Colors.blue,
    controls: [
      Controls.checkbox({
        name: "boolean",
        label: "True/False"
      })
    ]
  })
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
  .addNodeType({
    type: "string",
    label: "Text",
    description: "Outputs a string of text",
    inputs: ports => [
      ports.string()
    ],
    outputs: ports => [
      ports.string()
    ]
  })
  .addNodeType({
    type: "boolean",
    label: "True/False",
    description: "Outputs a true/false value",
    initialWidth: 140,
    inputs: ports => [
      ports.boolean()
    ],
    outputs: ports => [
      ports.boolean()
    ]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    description: "Outputs a numeric value",
    initialWidth: 160,
    inputs: ports => [
      ports.number()
    ],
    outputs: ports => [
      ports.number()
    ]
  })
  .addRootNodeType({
    type: "homepage",
    label: "Homepage",
    initialWidth: 170,
    inputs: ports => [
      ports.string({
        name: "title",
        label: "Title"
      }),
      ports.string({
        name: "description",
        label: "Description"
      }),
      ports.boolean({
        name: "showSignup",
        label: "Show Signup"
      }),
      ports.number({
        name: "copyrightYear",
        label: "Copyright Year"
      })
    ]
  })

export const SimpleEditor = () => {

  return (
    <NodeEditor
      comments={{}}
      portTypes={simpleConfig.portTypes}
      nodeTypes={simpleConfig.nodeTypes}
      defaultNodes={[
        {
          type: "string",
          x: -100,
          y: -80
        }
      ]}
    />
  )
}

export const SimpleEditor2 = () => {

  return (
    <NodeEditor
      comments={{}}
      portTypes={simpleConfig2.portTypes}
      nodeTypes={simpleConfig2.nodeTypes}
      defaultNodes={[
        {
          type: "string",
          x: -300,
          y: -240
        },
        {
          type: "boolean",
          x: -80,
          y: -80
        },
        {
          type: "number",
          x: 100,
          y: 50
        }
      ]}
    />
  )
}

export const SimpleEditor3 = () => {

  return (
    <NodeEditor
      comments={{}}
      portTypes={simpleConfig2.portTypes}
      nodeTypes={simpleConfig2.nodeTypes}
      disableZoom
      defaultNodes={[
        {
          type: "homepage",
          x: 190,
          y: -150
        },
      ]}
    />
  )
}
