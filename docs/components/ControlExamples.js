import React from "react";
import { FlumeConfig, NodeEditor, Controls, Colors } from "flume";

const animalIds = [
  "D6TqIa-tWRY",
  "DfKZs6DOrw4",
  "o_QTeyGVWjQ",
  "_9a-3NO5KJE",
  "KdZvvyemkPM",
  "Ay67yB6vmF8",
  "pKoKW6UQOuk",
  "QjLPLZsSl4I",
  "hvvNY6b8pE0",
];

const getRandomId = () => animalIds[Math.floor(Math.random() * animalIds.length)];

const RandomPhotoComponent = ({ url, onChange }) => {
  return (
    <div>
      <button style={{marginBottom: 10}} onClick={() => onChange(getRandomId())}>
        Get Random Photo
      </button>
      <img
        style={{ borderRadius: 6 }}
        src={`https://source.unsplash.com/${url}/180x180`}
        alt=""
      />
    </div>
  );
};

const config = new FlumeConfig()
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
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.red,
    controls: [
      Controls.number({
        name: "number",
        label: "Number"
      })
    ]
  })
  .addPortType({
    type: "boolean",
    name: "boolean",
    label: "True/False",
    color: Colors.blue,
    controls: [
      Controls.checkbox({
        name: "boolean",
        label: "True/False"
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
        name: "animal",
        label: "Animal",
        options: [
          { value: "cow", label: "Cow" },
          { value: "horse", label: "Horse" },
          { value: "pig", label: "Pig" },
          { value: "elephant", label: "Elephant" },
          { value: "snake", label: "Snake" }
        ]
      })
    ]
  })
  .addPortType({
    type: "colors",
    name: "colors",
    label: "Colors",
    color: Colors.purple,
    controls: [
      Controls.multiselect({
        name: "colors",
        label: "Colors",
        options: [
          { value: "red", label: "Red" },
          { value: "blue", label: "Blue" },
          { value: "yellow", label: "Yellow" },
          { value: "green", label: "Green" },
          { value: "orange", label: "Orange" },
          { value: "purple", label: "Purple" }
        ]
      })
    ]
  })
  .addPortType({
    type: "randomPhoto",
    name: "randomPhoto",
    label: "Random Photo",
    color: Colors.pink,
    controls: [
      Controls.custom({
        name: "randomPhoto",
        label: "Random Photo",
        defaultValue: "D6TqIa-tWRY",
        render: (data, onChange) => (
          <RandomPhotoComponent url={data} onChange={onChange} />
        )
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
    type: "number",
    label: "Number",
    description: "Outputs a numeric value",
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addNodeType({
    type: "boolean",
    label: "True/False",
    description: "Outputs a true/false value",
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "animal",
    label: "Animal",
    description: "Outputs a selected animal",
    inputs: ports => [ports.animal()],
    outputs: ports => [ports.animal()]
  })
  .addNodeType({
    type: "colors",
    label: "Colors",
    description: "Outputs a set of selected colors",
    inputs: ports => [ports.colors()],
    outputs: ports => [ports.colors()]
  })
  .addNodeType({
    type: "randomPhoto",
    label: "Random Photo",
    description: "Outputs a random photo from Unsplash",
    inputs: ports => [ports.randomPhoto()],
    outputs: ports => [ports.randomPhoto()]
  });

export const TextControlGraph = () => (
  <div style={{ width: "100%", height: 400, color: "#000" }}>
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      disableZoom
      defaultNodes={[{ type: "string", x: -100, y: -80 }]}
    />
  </div>
);

export const NumberGraph = () => (
  <div style={{ width: "100%", height: 400, color: "#000" }}>
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      disableZoom
      defaultNodes={[{ type: "number", x: -100, y: -80 }]}
    />
  </div>
);

export const BooleanGraph = () => (
  <div style={{ width: "100%", height: 400, color: "#000" }}>
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      disableZoom
      defaultNodes={[{ type: "boolean", x: -100, y: -60 }]}
    />
  </div>
);

export const SelectGraph = () => (
  <div style={{ width: "100%", height: 400, color: "#000" }}>
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      disableZoom
      defaultNodes={[{ type: "animal", x: -100, y: -70 }]}
    />
  </div>
);

export const MultiselectGraph = () => (
  <div style={{ width: "100%", height: 400, color: "#000" }}>
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      disableZoom
      defaultNodes={[{ type: "colors", x: -100, y: -70 }]}
    />
  </div>
);

export const RandomPhotoGraph = () => (
  <div style={{ width: "100%", height: 400, color: "#000" }}>
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      disableZoom
      defaultNodes={[{ type: "randomPhoto", x: -100, y: -160 }]}
    />
  </div>
);
