import { FlumeConfig, Controls, Colors } from "flume";

const config = new FlumeConfig();
config
  .addPortType({
    type: "string",
    name: "string",
    label: "String",
    color: Colors.green,
    controls: [Controls.text({ name: "string", label: "String" })]
  })
  .addPortType({
    type: "boolean",
    name: "boolean",
    label: "Boolean",
    color: Colors.blue,
    controls: [Controls.checkbox({ name: "boolean", label: "Boolean" })]
  })
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.red,
    controls: [Controls.number({ name: "number", label: "Number" })]
  })
  .addNodeType({
    type: "string",
    label: "String",
    description: "Outputs a string value",
    initialWidth: 180,
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: "boolean",
    label: "Boolean",
    description: "Outputs a boolean value",
    initialWidth: 120,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    description: "Outputs a numerical value",
    initialWidth: 120,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addNodeType({
    type: "isGreaterThan",
    label: "Is Greater Than",
    description: "Outputs if a number is greater than a second number",
    initialWidth: 120,
    inputs: ports => [
      ports.number({ name: "toCompare" }),
      ports.number({ name: "greaterThan" })
    ],
    outputs: ports => [ports.boolean({ name: "result" })]
  })
  .addNodeType({
    type: "isLessThan",
    label: "Is Less Than",
    description: "Outputs if a number is less than a second number",
    initialWidth: 120,
    inputs: ports => [
      ports.number({ name: "toCompare" }),
      ports.number({ name: "greaterThan" })
    ],
    outputs: ports => [ports.boolean({ name: "result" })]
  })
  .addNodeType({
    type: "and",
    label: "And",
    description: "Outputs if both inputs are true",
    initialWidth: 100,
    inputs: ports => [
      ports.boolean({ name: "bool1" }),
      ports.boolean({ name: "bool2" })
    ],
    outputs: ports => [ports.boolean({ name: "result" })]
  })
  .addNodeType({
    type: "or",
    label: "Or",
    description: "Outputs if either input is true",
    initialWidth: 100,
    inputs: ports => [
      ports.boolean({ name: "bool1" }),
      ports.boolean({ name: "bool2" })
    ],
    outputs: ports => [ports.boolean({ name: "result" })]
  })
  .addNodeType({
    type: "reverseBoolean",
    label: "Reverse Boolean",
    description: "Reverses the value of a boolean",
    initialWidth: 100,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "stringSwitch",
    label: "String Switch",
    description: "Outputs a string depending on the value of a given test",
    initialWidth: 180,
    inputs: ports => [
      ports.boolean({ name: "test", label: "Test" }),
      ports.string({ name: "string1", label: "Text if true" }),
      ports.string({ name: "string2", label: "Text if false" })
    ],
    outputs: ports => [ports.string({ name: "result" })]
  })
  .addNodeType({
    type: "joinStrings",
    label: "Join Strings",
    description: "Joins together two given strings",
    initialWidth: 150,
    inputs: ports => [
      ports.string({ name: "string1", label: "First string" }),
      ports.string({ name: "string2", label: "Second string" })
    ],
    outputs: ports => [ports.string({ name: "result" })]
  })
  .addNodeType({
    type: "pageAttributes",
    label: "Example Page Attributes",
    addable: false,
    deletable: false,
    description: "Represents the attributes of the current page",
    initialWidth: 160,
    inputs: ports => [
      ports.string({
        name: "pageTitle",
        label: "Page Title",
        noControls: true
      }),
      ports.string({
        name: "pageDescription",
        label: "Page Description",
        noControls: true
      }),
      ports.boolean({
        name: "showDashboard",
        label: "Show Dashboard",
        noControls: true
      }),
      ports.boolean({
        name: "showSignup",
        label: "Show Signup",
        noControls: true
      })
    ]
  })
  .addNodeType({
    type: "user",
    label: "Current User",
    description: "Represents the current user",
    initialWidth: 130,
    outputs: ports => [
      ports.boolean({ name: "isLoggedIn", label: "Is Logged-In" }),
      ports.boolean({ name: "isAdmin", label: "Is Admin" }),
      ports.string({ name: "fullName", label: "Full Name" }),
      ports.string({ name: "email", label: "Email" })
    ]
  })
  .addNodeType({
    type: "window",
    label: "Window",
    description: "Outputs attributes of the current window",
    initialWidth: 120,
    outputs: ports => [
      ports.number({ name: "width", label: "Width" }),
      ports.number({ name: "height", label: "Height" })
    ]
  });

export default config;
export const nodes = {
  vKwUIZVHKC: {
    id: "vKwUIZVHKC",
    x: 319.5,
    y: -98.484375,
    type: "pageAttributes",
    width: 160,
    connections: {
      inputs: {
        pageTitle: [{ nodeId: "v0wTiY0tkd", portName: "result" }],
        showDashboard: [{ nodeId: "Oa-DLmE0-J", portName: "result" }],
        showSignup: [{ nodeId: "Vos5ZL3HOQ", portName: "boolean" }]
      },
      outputs: {}
    },
    inputData: {
      pageTitle: { string: "" },
      pageDescription: { string: "" },
      showDashboard: { boolean: false },
      showSignup: { boolean: false }
    }
  },
  "0-C_tbjpFz": {
    id: "0-C_tbjpFz",
    x: -433.5,
    y: -198.484375,
    type: "user",
    width: 130,
    connections: {
      inputs: {},
      outputs: {
        fullName: [{ nodeId: "pLJO3-S19X", portName: "string2" }],
        isLoggedIn: [
          { nodeId: "v0wTiY0tkd", portName: "test" },
          { nodeId: "76wBOXsawD", portName: "bool1" },
          { nodeId: "Vos5ZL3HOQ", portName: "boolean" }
        ],
        isAdmin: [{ nodeId: "76wBOXsawD", portName: "bool2" }]
      }
    },
    inputData: {}
  },
  GgUjDuZ5NO: {
    id: "GgUjDuZ5NO",
    x: -425.5,
    y: -16.515625,
    type: "window",
    width: 120,
    connections: {
      inputs: {},
      outputs: { width: [{ nodeId: "nBTq1DExea", portName: "toCompare" }] }
    },
    inputData: {}
  },
  nBTq1DExea: {
    id: "nBTq1DExea",
    x: -263.5,
    y: 50.515625,
    type: "isLessThan",
    width: 120,
    connections: {
      inputs: { toCompare: [{ nodeId: "GgUjDuZ5NO", portName: "width" }] },
      outputs: { result: [{ nodeId: "Oa-DLmE0-J", portName: "bool2" }] }
    },
    inputData: { toCompare: { number: 0 }, greaterThan: { number: 960 } }
  },
  "pLJO3-S19X": {
    id: "pLJO3-S19X",
    x: -204.5,
    y: -244.484375,
    type: "joinStrings",
    width: 150,
    connections: {
      inputs: { string2: [{ nodeId: "0-C_tbjpFz", portName: "fullName" }] },
      outputs: { result: [{ nodeId: "v0wTiY0tkd", portName: "string1" }] }
    },
    inputData: { string1: { string: "Welcome " }, string2: { string: "" } }
  },
  v0wTiY0tkd: {
    id: "v0wTiY0tkd",
    x: 63.5,
    y: -243.484375,
    type: "stringSwitch",
    width: 180,
    connections: {
      inputs: {
        test: [{ nodeId: "0-C_tbjpFz", portName: "isLoggedIn" }],
        string1: [{ nodeId: "pLJO3-S19X", portName: "result" }]
      },
      outputs: { result: [{ nodeId: "vKwUIZVHKC", portName: "pageTitle" }] }
    },
    inputData: {
      test: { boolean: false },
      string1: { string: "" },
      string2: { string: "Sign up below!" }
    }
  },
  "76wBOXsawD": {
    id: "76wBOXsawD",
    x: -105.5,
    y: -39.484375,
    type: "and",
    width: 100,
    connections: {
      inputs: {
        bool1: [{ nodeId: "0-C_tbjpFz", portName: "isLoggedIn" }],
        bool2: [{ nodeId: "0-C_tbjpFz", portName: "isAdmin" }]
      },
      outputs: { result: [{ nodeId: "Oa-DLmE0-J", portName: "bool1" }] }
    },
    inputData: { bool1: { boolean: false }, bool2: { boolean: false } }
  },
  "Oa-DLmE0-J": {
    id: "Oa-DLmE0-J",
    x: 26.5,
    y: 81.515625,
    type: "and",
    width: 100,
    connections: {
      inputs: {
        bool1: [{ nodeId: "76wBOXsawD", portName: "result" }],
        bool2: [{ nodeId: "nBTq1DExea", portName: "result" }]
      },
      outputs: { result: [{ nodeId: "vKwUIZVHKC", portName: "showDashboard" }] }
    },
    inputData: { bool1: { boolean: false }, bool2: { boolean: false } }
  },
  Vos5ZL3HOQ: {
    id: "Vos5ZL3HOQ",
    x: 157.5,
    y: 1.484375,
    type: "reverseBoolean",
    width: 100,
    connections: {
      inputs: { boolean: [{ nodeId: "0-C_tbjpFz", portName: "isLoggedIn" }] },
      outputs: { boolean: [{ nodeId: "vKwUIZVHKC", portName: "showSignup" }] }
    },
    inputData: { boolean: { boolean: false } }
  }
};
