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
  "#2196f3",
  "#3f51b5",
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722"
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

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
    label: "Boolean",
    color: Colors.blue,
    controls: [Controls.checkbox({ name: "boolean", label: "Boolean" })]
  })
  .addPortType({
    type: "car",
    name: "car",
    label: "Car",
    color: Colors.yellow
  })
  .addPortType({
    type: "employeeType",
    name: "employeeType",
    label: "Employee Type",
    color: Colors.purple,
    controls: [
      Controls.select({
        name: "employeeType",
        label: "Employee Type",
        options: [
          { value: "finance", label: "Finance" },
          { value: "management", label: "Management" },
          { value: "fryCook", label: "Fry Cook" },
          { value: "director", label: "Director" }
        ]
      })
    ]
  })
  .addPortType({
    type: "shader",
    name: "shader",
    label: "Shader",
    color: Colors.pink,
    controls: [
      Controls.custom({
        name: "shader",
        render: () => {
          return (
            <div
              style={{
                width: 110,
                height: 110,
                background: getRandomColor(),
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "100%",
                  background: getRandomColor(),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "100%",
                    background: getRandomColor()
                  }}
                ></div>
              </div>
            </div>
          );
        }
      })
    ]
  })
  .addPortType({
    type: "animal",
    name: "animal",
    label: "Animal",
    color: Colors.orange,
    controls: [
      Controls.select({
        name: "animalURL",
        label: "Animal",
        options: [
          { value: "D6TqIa-tWRY", label: "Giraffe" },
          { value: "DfKZs6DOrw4", label: "Tiger" },
          { value: "o_QTeyGVWjQ", label: "Dog" },
          { value: "_9a-3NO5KJE", label: "Panda" },
          { value: "KdZvvyemkPM", label: "Rooster" },
          { value: "Ay67yB6vmF8", label: "Elephant" },
          { value: "pKoKW6UQOuk", label: "Eagle" },
          { value: "QjLPLZsSl4I", label: "Yak" },
          { value: "hvvNY6b8pE0", label: "Monkey" }
        ]
      }),
      Controls.custom({
        name: "animal",
        render: (_, $, $$, $$$, $$$$, inputData) => {
          const url = inputData.animalURL;
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {url && (
                <img
                  style={{ width: "100%" }}
                  src={`https://source.unsplash.com/${url}/200x200`}
                  alt=""
                />
              )}
            </div>
          );
        }
      })
    ]
  })
  .addPortType({
    type: "color",
    name: "color",
    label: "Color",
    color: Colors.grey,
    controls: [
      Controls.select({
        name: "color",
        label: "Hex Color",
        options: colors.map(color => ({ value: color, label: color }))
      }),
      Controls.custom({
        name: "colorRender",
        render: (_, $, $$, $$$, $$$$, inputData) => {
          return (
            <div
              style={{
                background: inputData.color,
                borderRadius: 4,
                width: "100%",
                height: 60
              }}
            />
          );
        }
      })
    ]
  })
  .addPortType({
    type: "multiColor",
    name: "multiColor",
    label: "Multicolor",
    multiColor: Colors.grey,
    controls: [
      Controls.multiselect({
        name: "multiColor",
        label: "Hex Color",
        options: colors.map(color => ({ value: color, label: color }))
      }),
      Controls.custom({
        name: "colorRender",
        render: (_, $, $$, $$$, $$$$, inputData) => {
          return (
            <div
              style={{
                background: `linear-gradient(to right, ${inputData.multiColor.join(
                  ", "
                )})`,
                borderRadius: 4,
                width: "100%",
                height: 60
              }}
            />
          );
        }
      })
    ]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    description: "Outputs a number",
    initialWidth: 150,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addNodeType({
    type: "addNumbers",
    label: "Add Numbers",
    description: "Adds two numbers together",
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number({ name: "result" })]
  })
  .addNodeType({
    type: "subtractNumbers",
    label: "Subtract Numbers",
    description: "Subtracts one number from another",
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number({ name: "result" })]
  })
  .addNodeType({
    type: "divideNumbers",
    label: "Divide Numbers",
    description: "Divides one number by another",
    initialWidth: 150,
    inputs: ports => [
      ports.number({ name: "num1" }),
      ports.number({ name: "num2" })
    ],
    outputs: ports => [ports.number({ name: "result" })]
  })
  .addNodeType({
    type: "multiplyNumbers",
    label: "Multiply Numbers",
    description: "Multiplies one number by another",
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
    description: "Outputs a boolean value",
    initialWidth: 150,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "text",
    label: "Text",
    description: "Outputs a text value",
    initialWidth: 170,
    inputs: ports => [ports.text()],
    outputs: ports => [ports.text()]
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
      ports.boolean({ name: "caseSensitive" })
    ],
    outputs: ports => [ports.boolean({ name: "result" })]
  })
  .addNodeType({
    type: "user",
    label: "Current User",
    description: "Represents the current user",
    initialWidth: 130,
    outputs: ports => [
      ports.text({ name: "firstName", label: "First Name" }),
      ports.text({ name: "lastName", label: "Last Name" }),
      ports.boolean({ name: "isLoggedIn", label: "Is Logged-in" }),
      ports.boolean({ name: "isAdmin", label: "Is Admin" })
    ]
  })
  .addNodeType({
    type: "window",
    label: "Window",
    description: "Represents the current browser window",
    initialWidth: 130,
    outputs: ports => [
      ports.number({ name: "width", label: "Width" }),
      ports.number({ name: "height", label: "Height" }),
      ports.number({ name: "scrollPosition", label: "Scroll Position" }),
      ports.boolean({ name: "isFocused", label: "Is Focused" })
    ]
  })
  .addNodeType({
    type: "joinText",
    label: "Join Text",
    description: "Joins two strings into one string",
    initialWidth: 180,
    inputs: ports => [
      ports.text({ name: "string1", label: "First half" }),
      ports.text({ name: "string2", label: "Second half" })
    ],
    outputs: ports => [ports.text({ name: "result", label: "Joined Text" })]
  })
  .addNodeType({
    type: "textSwitch",
    label: "Text Switch",
    description: "Outputs one string if true, or a different string if false",
    initialWidth: 180,
    inputs: ports => [
      ports.boolean({ name: "test", label: "Test" }),
      ports.text({ name: "string1", label: "Text if true" }),
      ports.text({ name: "string2", label: "Text if false" })
    ],
    outputs: ports => [ports.text({ name: "result" })]
  })
  .addNodeType({
    type: "and",
    label: "And",
    description: "Outputs if two booleans are true",
    initialWidth: 150,
    inputs: ports => [
      ports.boolean({ name: "bool1" }),
      ports.boolean({ name: "bool2" })
    ],
    outputs: ports => [ports.boolean({ name: "result" })]
  })
  .addNodeType({
    type: "or",
    label: "Or",
    description: "Outputs if either boolean is true",
    initialWidth: 150,
    inputs: ports => [
      ports.boolean({ name: "bool1" }),
      ports.boolean({ name: "bool2" })
    ],
    outputs: ports => [ports.boolean({ name: "result" })]
  })
  .addNodeType({
    type: "car",
    label: "Car",
    description: "Represents a car",
    initialWidth: 150,
    inputs: ports => [
      ports.text({ name: "make", label: "Make" }),
      ports.text({ name: "model", label: "Model" }),
      ports.number({ name: "year", label: "Year" })
    ],
    outputs: ports => [ports.car({ name: "car" })]
  })
  .addNodeType({
    type: "combineCars",
    label: "Combine Cars",
    description: "Combines 10 cars",
    initialWidth: 150,
    inputs: ports => [
      ports.car({ name: "car1" }),
      ports.car({ name: "car2" }),
      ports.car({ name: "car3" }),
      ports.car({ name: "car4" }),
      ports.car({ name: "car5" }),
      ports.car({ name: "car6" }),
      ports.car({ name: "car7" }),
      ports.car({ name: "car8" }),
      ports.car({ name: "car9" }),
      ports.car({ name: "car10" })
    ]
  })
  .addNodeType({
    type: "shader",
    label: "Shader",
    description: "Outputs a shader",
    initialWidth: 130,
    inputs: ports => [ports.shader()],
    outputs: ports => [ports.shader()]
  })
  .addNodeType({
    type: "shaderNexus",
    label: "Shader Nexus",
    description: "the nexus of the shaders",
    initialWidth: 130,
    inputs: ports => [
      ports.shader({ name: "shader1", noControls: true }),
      ports.shader({ name: "shader2", noControls: true }),
      ports.shader({ name: "shader3", noControls: true }),
      ports.shader({ name: "shader4", noControls: true }),
      ports.shader({ name: "shader5", noControls: true }),
      ports.shader({ name: "shader6", noControls: true }),
      ports.shader({ name: "shader7", noControls: true }),
      ports.shader({ name: "shader8", noControls: true })
    ],
    outputs: ports => [
      ports.shader({ name: "shader1" }),
      ports.shader({ name: "shader2" }),
      ports.shader({ name: "shader3" }),
      ports.shader({ name: "shader4" }),
      ports.shader({ name: "shader5" }),
      ports.shader({ name: "shader6" }),
      ports.shader({ name: "shader7" }),
      ports.shader({ name: "shader8" })
    ]
  })
  .addNodeType({
    type: "checkout",
    label: "Calculate Checkout",
    description: "Calculates the attributes of a checkout",
    initialWidth: 160,
    inputs: ports => [
      ports.number({ name: "subtotal", label: "Sub-Total" }),
      ports.number({ name: "taxRate", label: "Tax Rate" }),
      ports.boolean({ name: "taxExempt", label: "Is Tax Exempt" }),
      ports.text({ name: "discountCode", label: "Discount Code" }),
      ports.boolean({ name: "qualifies", label: "Qualifies for Discount" })
    ],
    outputs: ports => [ports.number({ label: "Total" })]
  })
  .addNodeType({
    type: "generateSchedule",
    label: "Generate Schedule",
    description: "Generates a schedule",
    initialWidth: 160,
    inputs: ports => [
      ports.text({ name: "employeeName", label: "Employee Name" }),
      ports.employeeType({ name: "employeeType", label: "Employee Type" }),
      ports.number({ name: "startYear", label: "Start Year" }),
      ports.number({ name: "endYear", label: "End Year" })
    ],
    outputs: ports => [ports.boolean({ label: "Employee Schedule" })]
  })
  .addNodeType({
    type: "mathResult",
    label: "Math Result",
    description: "Calculates a math result",
    initialWidth: 130,
    inputs: ports => [ports.number()]
  })
  .addNodeType({
    type: "animal",
    label: "Animal",
    description: "Outputs an animal",
    initialWidth: 180,
    inputs: ports => [ports.animal()],
    outputs: ports => [ports.animal()]
  })
  .addNodeType({
    type: "animalMaker",
    label: "Unholy Animal Maker",
    description: "Creates an unholy animal from 10 animals",
    initialWidth: 180,
    inputs: ports => [
      ports.animal({ name: "animal1" }),
      ports.animal({ name: "animal2" }),
      ports.animal({ name: "animal3" }),
      ports.animal({ name: "animal4" }),
      ports.animal({ name: "animal5" }),
      ports.animal({ name: "animal6" }),
      ports.animal({ name: "animal7" }),
      ports.animal({ name: "animal8" }),
      ports.animal({ name: "animal9" }),
      ports.animal({ name: "animal10" })
    ]
  })
  .addNodeType({
    type: "color",
    label: "Color",
    description: "Outputs a color",
    initialWidth: 160,
    inputs: ports => [ports.color()],
    outputs: ports => [ports.color()]
  })
  .addNodeType({
    type: "multiColor",
    label: "Multicolor",
    description: "Outputs multiple colors",
    initialWidth: 160,
    inputs: ports => [ports.multiColor()],
    outputs: ports => [ports.multiColor()]
  })
  .addNodeType({
    type: "blendColors",
    label: "Blend Colors",
    description: "Blends two colors together",
    initialWidth: 160,
    inputs: ports => [ports.color(), ports.color({ name: "color2" })],
    outputs: ports => [ports.color()]
  })
  .addNodeType({
    type: "recolorAnimal",
    label: "Recolor Animal",
    description: "Recolors an animal",
    initialWidth: 160,
    inputs: ports => [ports.color(), ports.animal()]
  })
  .addNodeType({
    type: "recolorCar",
    label: "Recolor Car",
    description: "Recolors a car",
    initialWidth: 160,
    inputs: ports => [ports.car(), ports.color()],
    outputs: ports => [ports.car()]
  })
  .addRootNodeType({
    type: "websiteAttributes",
    label: "Website Attributes",
    description: "Accepts the attributes of the website",
    initialWidth: 160,
    inputs: ports => [
      ports.text({ name: "title", label: "Title" }),
      ports.text({ name: "description", label: "Description" }),
      ports.boolean({ name: "showLogin", label: "Show Login" }),
      ports.boolean({ name: "showDashboard", label: "Show Dashboard" }),
      ports.boolean({ name: "showBody", label: "Show Home Body" }),
      ports.number({ name: "bodyWidth", label: "Body Width" }),
      ports.number({ name: "bodyHeight", label: "Body Height" })
    ]
  })
  .addNodeType({
    type: "employee",
    label: "Employee",
    inputs: ports => [ports.employeeType()],
    outputs: ports => [ports.employeeType()]
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

const App = () => {
  const [nodes, setNodes] = React.useState({});
  const [comments, setComments] = React.useState({});
  return (
    <div className="wrapper" style={{ lineHeight: 1.8 }}>
      <NodeEditor
        portTypes={flumeConfig.portTypes}
        nodeTypes={flumeConfig.nodeTypes}
        nodes={nodes}
        comments={comments}
        onChange={setNodes}
        onCommentsChange={setComments}
        // disableZoom
        defaultNodes={[
          {
            type: "websiteAttributes",
            x: 400,
            y: -200
          }
        ]}
        renderNodeHeader={(Wrapper, nodeType, actions) => {
          return (
            <Wrapper style={{ display: "flex" }}>
              {nodeType.label}
              {nodeType.type === "employee" ? (
                <button
                  style={{
                    margin: -4,
                    marginLeft: "auto",
                    marginRight: 2,
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: 14,
                    color: '#222'
                  }}
                  onClick={actions.openMenu}
                >
                  ☰
                </button>
              ) : null}
            </Wrapper>
          );
        }}
        // debug
      />
      <div style={{ marginTop: 30 }}>
        <Website nodes={nodes} />
      </div>
    </div>
  );
};

export default App;

const useInfiniteEngine = (nodes, engine, context, options = {}) =>
  Object.keys(nodes).length ? engine.resolveRootNode(nodes, { context, ...options }) : {};

const Website = ({ nodes }) => {
  const {
    title,
    description,
    showDashboard,
    showContactForm,
    showLoginButton
  } = useInfiniteEngine(nodes, engine, { someContext: true }, { maxLoops: 10 });

  return (
    <div className="website-wrapper">
      <h1>{title}</h1>
      <p>{description}</p>
      {showDashboard && <div>Dashboard</div>}
      {showContactForm && <div>Contact Form</div>}
      {showLoginButton && <button>Login</button>}
    </div>
  );
};
