import React from 'react'
import { NodeEditor, FlumeConfig, Controls, Colors } from 'flume'

const config = new FlumeConfig()
config
  .addPortType({
    type: "string",
    name: "string",
    label: "Text",
    color: Colors.green,
    controls: [
      Controls.text({ name: "string", label: "Text"})
    ]
  })
  .addPortType({
    type: "boolean",
    name: "boolean",
    label: "Boolean",
    color: Colors.blue,
    controls: [
      Controls.checkbox({ name: "boolean", label: "Boolean"})
    ]
  })
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.red,
    controls: [
      Controls.number({ name: "number", label: "Number"})
    ]
  })
  .addNodeType({
    type: "string",
    label: "Text",
    description: "Outputs a string of text",
    initialNodes: 180,
    inputs: ports => [
      ports.string()
    ],
    outputs: ports => [
      ports.string()
    ]
  })
  .addNodeType({
    type: "boolean",
    label: "Boolean",
    description: "Outputs a single true/false value",
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
    description: "Outputs a single numeric value",
    initialWidth: 160,
    inputs: ports => [
      ports.number()
    ],
    outputs: ports => [
      ports.number()
    ]
  })
  .addNodeType({
    type: "user",
    label: "User",
    description: "Outputs the current user",
    initialWidth: 120,
    outputs: ports => [
      ports.string({ label: "First Name", name: "firstName"}),
      ports.string({ label: "Last Name", name: "firstName"}),
      ports.number({ name: "userAge", label: "Age" }),
      ports.boolean({ label: "Is Admin", name: "isAdmin"}),
    ]
  })
  .addNodeType({
    type: "homepage",
    label: "Homepage Attributes",
    root: true,
    addable: false,
    deletable: false,
    description: "Root node for homepage attributes",
    initialWidth: 160,
    inputs: ports => [
      ports.string({ name: "title", label: "Title"}),
      ports.string({ name: "description", label: "Description" }),
      ports.boolean({ name: "showDashboard", label: "Show Dashboard"}),
      ports.number({ name: "pageWidth", label: "Page Width"})
    ]
  })

export default () => {
  return (
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      comments={{"DCNL0ZklMh":{"id":"DCNL0ZklMh","text":"This is a node","x":-235.875,"y":-232,"width":108,"height":30,"color":"blue"},"FZWHnCrTkg":{"id":"FZWHnCrTkg","text":"This is a connection.","x":-49.875,"y":-111,"width":146,"height":30,"color":"green"},"1C0j5YInSC":{"id":"1C0j5YInSC","text":"Nodes can have inputs and/or outputs, but neither are required.","x":-286.875,"y":148,"width":218,"height":40,"color":"blue"},"y6ABH04B7X":{"id":"y6ABH04B7X","text":"Inputs and outputs are referred to as \"ports\".","x":45.125,"y":110,"width":156,"height":42,"color":"red"},"aZEqpLNSby":{"id":"aZEqpLNSby","text":"Ports are color-coded to make the rules of connections intuitive for users.","x":46.125,"y":160,"width":205,"height":55,"color":"red"}}}
      defaultNodes={[
        { type: 'homepage', x: 200, y: -150}
      ]}
      nodes={{"GMbW1Z5cc7":{"id":"GMbW1Z5cc7","x":127,"y":-134,"type":"homepage","width":160,"connections":{"inputs":{"title":[{"nodeId":"JnwVXMbVL3","portName":"string"}],"showDashboard":[{"nodeId":"MhtLSu9Q7D","portName":"isAdmin"}]},"outputs":{}},"inputData":{"title":{"string":""},"description":{"string":""},"showDashboard":{"boolean":false},"pageWidth":{"number":0}},"root":true},"JnwVXMbVL3":{"id":"JnwVXMbVL3","x":-281.5,"y":-192,"type":"string","width":200,"connections":{"inputs":{},"outputs":{"string":[{"nodeId":"GMbW1Z5cc7","portName":"title"}]}},"inputData":{"string":{"string":"Welcome to Flume!"}}},"MhtLSu9Q7D":{"id":"MhtLSu9Q7D","x":-238.875,"y":-9,"type":"user","width":120,"connections":{"inputs":{},"outputs":{"isAdmin":[{"nodeId":"GMbW1Z5cc7","portName":"showDashboard"}]}},"inputData":{}}}}
      disableZoom
    />
  )
}
