import React from "react";
import styles from "./Stage.css";
import { Portal } from "react-portal";
import ContextMenu from "../ContextMenu/ContextMenu";
import { NodeTypesContext, NodeDispatchContext } from "../../context";
import orderBy from "lodash/orderBy";

const Stage = ({ children, stageRef }) => {
  const nodeTypes = React.useContext(NodeTypesContext);
  const nodesDispatch = React.useContext(NodeDispatchContext)
  const wrapper = React.useRef();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuCoordinates, setMenuCoordinates] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    stageRef.current = wrapper.current.getBoundingClientRect();
  }, [stageRef]);

  const handleContextMenu = e => {
    e.preventDefault();
    setMenuCoordinates({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
    return false;
  };

  const closeContextMenu = () => {
    setMenuOpen(false);
  };

  const menuOptions = React.useMemo(
    () =>
      orderBy(
        Object.values(nodeTypes)
          .filter(node => node.addable !== false)
          .map(node => ({
            value: node.type,
            label: node.label,
            description: node.description,
            sortIndex: node.sortIndex,
            node
          })),
        ["sortIndex", "label"]
      ),
    [nodeTypes]
  );

  const addNode = ({ node }) => {
    const wrapperRect = wrapper.current.getBoundingClientRect()
    nodesDispatch({
      type: 'ADD_NODE',
      x: menuCoordinates.x - wrapperRect.x,
      y: menuCoordinates.y - wrapperRect.y,
      nodeType: node.type
    })
  };

  return (
    <div
      id="__node_editor_stage__"
      className={styles.wrapper}
      ref={wrapper}
      onContextMenu={handleContextMenu}
    >
      {menuOpen ? (
        <Portal>
          <ContextMenu
            x={menuCoordinates.x}
            y={menuCoordinates.y}
            options={menuOptions}
            onRequestClose={closeContextMenu}
            onOptionSelected={addNode}
            label="Add Node"
          />
        </Portal>
      ) : null}
      {children}
    </div>
  );
};
export default Stage;
