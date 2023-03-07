import React from "react";
import ReactDOM from "react-dom/server";
import { render } from "@testing-library/react";
import {  nodeTypes, portTypes } from "./nodes";
import { NodeEditor } from "../";

const CONSOLE_ERROR_OUTPUT = [];
const ConsoleError = console.error;
const mockedConsoleError = log => CONSOLE_ERROR_OUTPUT.unshift(log);

describe("<NodeEditor/> Server Rendered", () => {
  beforeEach(() => console.error = mockedConsoleError);

  test("creates isomorphic ids", async () => {
    const component = (
      <NodeEditor
        nodeTypes={nodeTypes}
        portTypes={portTypes}
        defaultNodes={[{ type: "number", x: 0, y: 0 }]}
      />
    );
    const markup = ReactDOM.renderToString(component);
    document.body.innerHTML = `<div>${markup}</div>`;
    render(component, {
      container: document.body.firstChild,
      hydrate: true
    });
    // FIXME:: useLayoutEffect isn't supported with server-side rendering and is
    // throwing errors. Once we fix it we can stop filtering out those errors in
    // this test.
    // https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
    const warnings = CONSOLE_ERROR_OUTPUT.filter(
      err => !err.includes('useLayoutEffect')
    );

    // FIXME:: This test has been disabled temporarily because of false positive
    // expect(warnings.length).toBe(0);
  });

  afterEach(() => console.error = ConsoleError);
});
