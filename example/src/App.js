import React from "react";
import "normalize.css";
import {
  NodeEditor,
  FlumeConfig,
  Controls,
  Colors,
  RootEngine,
  useRootEngine
} from "node-editor";

const colors = [
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "orange", label: "Orange" }
];

const flumeConfig = new FlumeConfig();
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
    controls: [Controls.checkbox({ name: "boolean", label: "True/False" })]
  })
  .addPortType({
    type: "color",
    name: "color",
    label: "Color",
    color: Colors.blue,
    controls: [
      Controls.select({
        name: "color",
        getOptions: () => {
          return colors.map(color => color);
        }
      })
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
        options: [
          "Cow",
          "Snake",
          "Butterfly",
          "Horse",
          "Lizard",
          "Tiger"
        ].map(animal => ({ value: animal.toLowerCase(), label: animal }))
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
        placeholder: "[Select an Option]",
        options: []
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
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number({ name: "result" })]
  })
  .addNodeType({
    type: "boolean",
    label: "True/False",
    initialWidth: 150,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "color",
    label: "Color",
    initialWidth: 170,
    inputs: ports => [ports.color()],
    outputs: ports => [ports.color()]
  })
  .addNodeType({
    type: "text",
    label: "Text",
    initialWidth: 170,
    inputs: ports => [ports.text()],
    outputs: ports => [ports.text()]
  })
  .addNodeType({
    type: "animals",
    label: "Animals",
    initialWidth: 160,
    inputs: ports => [ports.animals()],
    outputs: ports => [ports.animals()]
  })
  .addNodeType({
    type: "stringEquals",
    label: "Text Equals",
    description: "Outputs if text equals another string of text.",
    initialWidth: 170,
    sortIndex: 33,
    inputs: ports => [
      ports.text({ name: "string1", label: "First String" }),
      ports.text({ name: "string2", label: "Second String" }),
      ports.boolean({
        name: "caseSensitive",
        controls: [
          Controls.checkbox({
            label: "Case Sensitive",
            name: "boolean",
            defaultValue: true
          })
        ]
      })
    ],
    outputs: ports => [ports.boolean({ name: "result" })]
  })
  .addNodeType({
    type: "noOptions",
    label: "No Options",
    description: "This node shows the empty state",
    initialWidth: 170,
    deletable: false,
    inputs: ports => [ports.noOptions()]
  })
  .addNodeType({
    type: "homePage",
    label: "Home Page Attributes",
    description: "Represents the resulting home page",
    deletable: false,
    addable: false,
    root: true,
    inputs: ports => [
      ports.text({ label: "Homepage Title", name: "homepageTitle" }),
      ports.text({ label: "Homepage Subtitle", name: "homepageSubtitle" }),
      ports.boolean({ label: "Show Dashboard", name: "showDashboard" }),
      ports.boolean({ label: "Show Contact Form", name: "showContactForm" }),
      ports.boolean({ label: "Show Login Button", name: "showLoginButton" })
    ]
  })
  .addNodeType({
    type: "user",
    label: "Current User",
    description: "Represents the current user",
    initialWidth: 130,
    outputs: ports => [
      ports.text({ name: "firstName", label: "First Name" }),
      ports.text({ name: "lastName", label: "Last Name" }),
      ports.boolean({ name: "isAdmin", label: "Is Logged-in" })
    ]
  });

const engine = new RootEngine(
  flumeConfig,
  (type, data) => {
    switch (type) {
      case "text":
        return data.text;
      case "boolean":
        return data.boolean;
      case "number":
        return data.number;
      default:
        return {};
    }
  },
  (node, inputValues, nodeType, context) => {
    switch (node.type) {
      case "text":
        return { text: inputValues.text };
      case "boolean":
        return { boolean: inputValues.boolean };
      case "number":
        return { number: inputValues.number };
      default:
        return {};
    }
  }
);

export default () => {
  const [nodes, setNodes] = React.useState({});
  return (
    <div className="wrapper" style={{ lineHeight: 1.8 }}>
      <NodeEditor
        portTypes={flumeConfig.portTypes}
        nodeTypes={flumeConfig.nodeTypes}
        nodes={nodes}
        onChange={nodes => {
          setNodes(nodes);
        }}
        defaultNodes={[
          {
            type: "homePage",
            x: 400,
            y: -200
          }
        ]}
        debug
      />
      <div style={{ marginTop: 30 }}>
        <Website nodes={nodes} />
      </div>
    </div>
  );
};

const Website = ({ nodes }) => {
  const {
    homepageTitle,
    homepageSubtitle,
    showDashboard,
    showContactForm,
    showLoginButton
  } = useRootEngine(nodes, engine, { someContext: true });

  return (
    <div className="website-wrapper">
      <h1>{homepageTitle}</h1>
      <p>{homepageSubtitle}</p>
      {showDashboard && <div>Dashboard</div>}
      {showContactForm && <div>Contact Form</div>}
      {showLoginButton && <button>Login</button>}
    </div>
  );
};
