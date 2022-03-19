import React from "react";
import Modal from "./Modal";
import { NodeEditor } from "node-editor";

const LogicEditor = ({
  isOpen,
  onCloseRequested,
  nodeTypes,
  inputTypes,
  defaultNodes,
  nodes,
  onChange,
  context = {}
}) => {
  const nodeEditor = React.useRef();

  const saveNodes = () => {
    const nodes = nodeEditor.current.getNodes();
    onChange(nodes);
    onCloseRequested()
  };

  return isOpen ? (
    <Modal onCloseRequested={onCloseRequested}>
      <div className="flex-column">
        <div className="flex-row" style={{ marginTop: -5, marginBottom: 15 }}>
          <h2>Logic Editor</h2>
          <button
            className="attribute-button align-right small"
            onClick={saveNodes}
          >
            Save
          </button>
        </div>
        <div style={{ width: 1200, height: 850 }}>
          <NodeEditor
            context={context}
            nodeTypes={nodeTypes}
            portTypes={inputTypes}
            defaultNodes={defaultNodes}
            nodes={nodes}
            ref={nodeEditor}
          />
        </div>
      </div>
    </Modal>
  ) : (
    false
  );
};

export default LogicEditor;