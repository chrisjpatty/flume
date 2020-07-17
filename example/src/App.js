import React from "react";
import "normalize.css";

import { NodeEditor, FlumeConfig, Controls, Colors } from "node-editor";

const BusinessRules = ({rules, onChange, context, redraw}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const fruit = React.useRef();

  const handleChange = e => {
    const value = e.target.value;
    onChange({fruit: value});
  }

  React.useEffect(() => {
    redraw()
  }, [modalOpen, redraw])

  return (
    <div>
      <button onClick={() => setModalOpen(x => !x)}>Business Rules</button>
      {
        modalOpen &&
        <div>
          The modal is open
          <input onMouseDown={e => e.stopPropagation()} ref={fruit} type="text" onChange={handleChange} />
        </div>
      }
    </div>
  )
}

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
  .addPortType({
    type: "businessRules",
    name: "businessRules",
    label: "Business Rules",
    controls: [
      Controls.custom({
        name: "businessRules",
        label: "Custom Business Rules",
        defaultValue: {},
        render: (data, onChange, context, redraw) => (
          <BusinessRules rules={data} onChange={onChange} context={context} redraw={redraw} />
        )
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
  .addNodeType({
    type: "businessRules",
    label: "Business Rules",
    description: "Lets you choose alternative business rules",
    inputs: ports => [
      ports.businessRules()
    ],
    outputs: ports => [
      ports.businessRules()
    ]
  })
  .addNodeType({
    type: "homePage",
    label: "Home Page Attributes",
    description: "Represents the resulting home page",
    inputs: ports => [
      ports.text({ label: "Homepage Title", name: "homepageTitle", noControls: true }),
      ports.text({ label: "Homepage Subtitle", name: "homepageSubtitle", noControls: true }),
      ports.boolean({ label: "Show Dashboard", name: "showDashboard", noControls: true }),
      ports.boolean({ label: "Show Contact Form", name: "showContactForm", noControls: true }),
      ports.boolean({ label: "Show Login Button", name: "showLoginButton", noControls: true }),
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
