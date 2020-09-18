import React from "react";
import { FlumeConfig, Colors, Controls, NodeEditor } from "flume";

const config1 = new FlumeConfig();
config1
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
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: 'compose',
    label: 'Compose',
    description: "Composes a parameterized string of text",
    initialWidth: 230,
    inputs: ports => data => {
      const template = (data && data.template && data.template.string) || '';
      const re = /\{(.*?)\}/g;
      let res, ids = []
      while ((res = re.exec(template)) !== null) {
        if (!ids.includes(res[1])) ids.push(res[1]);
      }
      return [
        ports.string({ name: "template", label: "Template", hidePort: true }),
        ...ids.map(id => ports.string({ name: id, label: id }))
      ];
    },
    outputs: ports => [ports.string({ label: 'Message' })]
  });

const config2 = new FlumeConfig();
config2
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
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: "joinText",
    label: "Required Join Text",
    description: "Combines two strings of text into one string",
    initialWidth: 160,
    inputs: ports => [
      ports.string({
        name: "string1",
        label: "First text"
      }),
      ports.string({
        name: "string2",
        label: "Second text"
      })
    ],
    outputs: ports => (data, connections) => {
      if (!data.string1.string && !connections.inputs.string1) return [];
      if (!data.string2.string && !connections.inputs.string2) return [];
      return [ports.string({ label: "Joined Text" })];
    }
  });


export const ComposeExample = () => {
  const [nodes, setNodes] = React.useState({
    cQEd3ykR61: {
      id: 'cQEd3ykR61',
      x: 60,
      y: -140,
      type: 'compose',
      width: 230,
      connections: {
        inputs: {
          Name: [{ nodeId: 'gD3aVCPepU', portName: 'string' }]
        },
        outputs: {}
      },
      inputData: {
        template: {
          string: 'Hello {Name}!\nYou are lucky number {Number}!!'
        }
      }
    },
    gD3aVCPepU: {
      id: 'gD3aVCPepU',
      x: -300,
      y: -100,
      type: 'string',
      width: 200,
      connections: {
        inputs: {},
        outputs: {
          string: [{ nodeId: 'cQEd3ykR61', portName: 'Name' }]
        }
      },
      inputData: {
        string: {
          string: 'Alice'
        }
      }
    }
  });
  return (
    <NodeEditor
      portTypes={config1.portTypes}
      nodeTypes={config1.nodeTypes}
      disableZoom
      nodes={nodes}
      onChange={setNodes}
    />
  );
};

export const RequiredExample = () => {
  return (
    <NodeEditor
      portTypes={config2.portTypes}
      nodeTypes={config2.nodeTypes}
      disableZoom
      defaultNodes={[
        {
          type: "joinText",
          x: -80,
          y: -110
        }
      ]}
    />
  );
};


export const WarningExample = () => {
  const [nodes, setNodes] = React.useState({
    m8dcIayeW_: {
      id: 'm8dcIayeW_',
      x: -364,
      y: -192,
      type: 'joinText',
      width: 160,
      connections: {
        inputs: {},
        outputs: {
          string: [
            { nodeId: 'rRjlEhFixj', portName: 'string1' },
            { nodeId: 'rRjlEhFixj', portName: 'string2' }
          ]
        }
      },
      inputData: { string1: { string: 'delete me' }, string2: { string: 'test' } }
    },
    rRjlEhFixj: {
      id: 'rRjlEhFixj',
      x: -172,
      y: -53,
      type: 'joinText',
      width: 160,
      connections: {
        inputs: {
          string1: [{ nodeId: 'm8dcIayeW_', portName: 'string' }],
          string2: [{ nodeId: 'm8dcIayeW_', portName: 'string' }]
        },
        outputs: {
          string: [
            { nodeId: 'UG1_1FT1lg', portName: 'string1' },
            { nodeId: 'UG1_1FT1lg', portName: 'string2' }
          ]
        }
      },
      inputData: { string1: { string: '' }, string2: { string: '' } }
    },
    UG1_1FT1lg: {
      id: 'UG1_1FT1lg',
      x: 23,
      y: -5,
      type: 'joinText',
      width: 160,
      connections: {
        inputs: {
          string1: [{ nodeId: 'rRjlEhFixj', portName: 'string' }],
          string2: [{ nodeId: 'rRjlEhFixj', portName: 'string' }]
        },
        outputs: {
          string: [
            { nodeId: 'a8atyks7UI', portName: 'string1' },
            { nodeId: 'a8atyks7UI', portName: 'string2' }
          ]
        }
      },
      inputData: { string1: { string: '' }, string2: { string: '' } }
    },
    a8atyks7UI: {
      id: 'a8atyks7UI',
      x: 214,
      y: 41,
      type: 'joinText',
      width: 160,
      connections: {
        inputs: {
          string1: [{ nodeId: 'UG1_1FT1lg', portName: 'string' }],
          string2: [{ nodeId: 'UG1_1FT1lg', portName: 'string' }]
        },
        outputs: {}
      },
      inputData: { string1: { string: '' }, string2: { string: '' } }
    }
  })
  return (
    <NodeEditor
      portTypes={config2.portTypes}
      nodeTypes={config2.nodeTypes}
      disableZoom
      nodes={nodes}
      onChange={setNodes}
    />
  );
};
