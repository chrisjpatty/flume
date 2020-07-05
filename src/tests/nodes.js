export const exampleNodes = {
  "5nCLb85WDw": {
    id: "5nCLb85WDw",
    x: 134.5,
    y: -90,
    type: "addNumbers",
    width: 150,
    connections: {
      inputs: {
        num1: [],
        num2: []
      },
      outputs: {}
    },
    inputData: { num1: { number: 0 }, num2: { number: 0 } }
  },
  vRPQ06k4nT: {
    id: "vRPQ06k4nT",
    x: -182.5,
    y: -176,
    type: "number",
    width: 150,
    connections: {
      inputs: {},
      outputs: { number: [] }
    },
    inputData: { number: { number: 0 } }
  },
  BDhQ98lTfw: {
    id: "BDhQ98lTfw",
    x: -181.5,
    y: -42,
    type: "number",
    width: 150,
    connections: {
      inputs: {},
      outputs: { number: [] }
    },
    inputData: { number: { number: 0 } }
  }
};

export const portTypes = {
  number: {
    label: "Number",
    name: "number",
    acceptTypes: ["number"],
    color: "red",
    controls: [
      {
        type: "number",
        name: "number",
        label: "Number",
        defaultValue: 0
      }
    ]
  }
};

export const nodeTypes = {
  number: {
    type: "number",
    label: "Number",
    initialWidth: 150,
    inputs: [{ type: "number", name: "number" }],
    outputs: [
      {
        type: "number",
        name: "number"
      }
    ]
  },
  addNumbers: {
    type: "addNumbers",
    label: "Add Numbers",
    initialWidth: 150,
    inputs: [
      {
        type: "number",
        name: "num1"
      },
      {
        type: "number",
        name: "num2"
      }
    ],
    outputs: [{ type: "number", name: "result" }]
  }
};
