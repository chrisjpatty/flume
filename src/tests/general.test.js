import 'expect-puppeteer'
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { exampleNodes, nodeTypes, portTypes } from "./nodes";
import { NodeEditor } from "../";

const CONSOLE_OUTPUT = [];
const Log = console.log;
const mockedConsoleLog = log => CONSOLE_OUTPUT.unshift(log);

describe("<NodeEditor/>", () => {
  test("Component is defined", () => {
    expect(NodeEditor).toBeDefined();
  });

  test("Component renders", async () => {
    render(
      <NodeEditor
        nodes={exampleNodes}
        nodeTypes={nodeTypes}
        portTypes={portTypes}
      />
    );
  });
});

describe("<Node/>", () => {
  beforeEach(() => console.log = mockedConsoleLog)

  test("Can input numbers", async () => {
    const { container, getByText } = render(
      <div style={{width: 900, height: 700}}>
        <NodeEditor
          nodes={exampleNodes}
          nodeTypes={nodeTypes}
          portTypes={portTypes}
          debug
        />
      </div>
    );
    const numberNodeId = "vRPQ06k4nT"
    const numberNode = container.querySelector(`[data-node-id="${numberNodeId}"] input`)
    fireEvent.change(numberNode, { target: { value: '100' }})
    expect(numberNode.value).toBe('100')
    getByText("Log Nodes").click();
    expect(CONSOLE_OUTPUT[0][numberNodeId].inputData.number.number).toBe(100)
  });

  afterEach(() => console.log = Log)
});
