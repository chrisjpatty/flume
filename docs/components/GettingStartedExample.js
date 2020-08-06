import React from "react";
import {
  FlumeConfig,
  Colors,
  Controls,
  NodeEditor,
  RootEngine,
  useRootEngine
} from "flume";

const simpleConfig = new FlumeConfig();
simpleConfig
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
  .addNodeType({
    type: "string",
    label: "Text",
    description: "Outputs a string of text",
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  });

const simpleConfig2 = new FlumeConfig();
simpleConfig2
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
  .addNodeType({
    type: "string",
    label: "Text",
    description: "Outputs a string of text",
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: "boolean",
    label: "True/False",
    description: "Outputs a true/false value",
    initialWidth: 140,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    description: "Outputs a numeric value",
    initialWidth: 160,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addRootNodeType({
    type: "homepage",
    label: "Homepage",
    initialWidth: 170,
    inputs: ports => [
      ports.string({
        name: "title",
        label: "Title"
      }),
      ports.string({
        name: "description",
        label: "Description"
      }),
      ports.boolean({
        name: "showSignup",
        label: "Show Signup"
      }),
      ports.number({
        name: "copyrightYear",
        label: "Copyright Year"
      })
    ]
  });

const simpleConfig3 = new FlumeConfig();
simpleConfig3
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
  .addNodeType({
    type: "string",
    label: "Text",
    description: "Outputs a string of text",
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: "boolean",
    label: "True/False",
    description: "Outputs a true/false value",
    initialWidth: 140,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    description: "Outputs a numeric value",
    initialWidth: 160,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addRootNodeType({
    type: "homepage",
    label: "Homepage",
    initialWidth: 170,
    inputs: ports => [
      ports.string({
        name: "title",
        label: "Title"
      }),
      ports.string({
        name: "description",
        label: "Description"
      }),
      ports.boolean({
        name: "showSignup",
        label: "Show Signup"
      }),
      ports.number({
        name: "copyrightYear",
        label: "Copyright Year"
      })
    ]
  })
  .addNodeType({
    type: "user",
    label: "User",
    initialWidth: 130,
    description: "Outputs attributes of the current user",
    outputs: ports => [
      ports.string({
        name: "firstName",
        label: "First Name"
      }),
      ports.string({
        name: "lastName",
        label: "Last Name"
      }),
      ports.boolean({
        name: "isLoggedIn",
        label: "Is Logged-In"
      }),
      ports.boolean({
        name: "isAdmin",
        label: "Is Admin"
      })
    ]
  });

const simpleConfig4 = new FlumeConfig();
simpleConfig4
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
  .addNodeType({
    type: "string",
    label: "Text",
    description: "Outputs a string of text",
    inputs: ports => [ports.string()],
    outputs: ports => [ports.string()]
  })
  .addNodeType({
    type: "boolean",
    label: "True/False",
    description: "Outputs a true/false value",
    initialWidth: 140,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  })
  .addNodeType({
    type: "number",
    label: "Number",
    description: "Outputs a numeric value",
    initialWidth: 160,
    inputs: ports => [ports.number()],
    outputs: ports => [ports.number()]
  })
  .addRootNodeType({
    type: "homepage",
    label: "Homepage",
    initialWidth: 170,
    inputs: ports => [
      ports.string({
        name: "title",
        label: "Title"
      }),
      ports.string({
        name: "description",
        label: "Description"
      }),
      ports.boolean({
        name: "showSignup",
        label: "Show Signup"
      }),
      ports.number({
        name: "copyrightYear",
        label: "Copyright Year"
      })
    ]
  })
  .addNodeType({
    type: "user",
    label: "User",
    initialWidth: 130,
    description: "Outputs attributes of the current user",
    outputs: ports => [
      ports.string({
        name: "firstName",
        label: "First Name"
      }),
      ports.string({
        name: "lastName",
        label: "Last Name"
      }),
      ports.boolean({
        name: "isLoggedIn",
        label: "Is Logged-In"
      }),
      ports.boolean({
        name: "isAdmin",
        label: "Is Admin"
      })
    ]
  })
  .addNodeType({
    type: "joinText",
    label: "Join Text",
    description: "Combines two strings of text into one string",
    initialWidth: 160,
    inputs: ports => [
      ports.string({
        name: "string1",
        label: "First text"
      }),
      ports.string({
        name: "string2",
        label: "Second text"
      })
    ],
    outputs: ports => [
      ports.string({
        name: "joinedText",
        label: "Joined Text"
      })
    ]
  })
  .addNodeType({
    type: "reverseBoolean",
    label: "Reverse True/False",
    description: "Reverses a true/false value",
    initialWidth: 140,
    inputs: ports => [ports.boolean()],
    outputs: ports => [ports.boolean()]
  });

const resolvePorts = (portType, data) => {
  switch (portType) {
    case "string":
      return data.string;
    case "boolean":
      return data.boolean;
    case "number":
      return data.number;
    default:
      return data;
  }
};

const resolveNodes = (node, inputValues, nodeType, context) => {
  switch (node.type) {
    case "string":
      return { string: inputValues.string };
    case "boolean":
      return { boolean: inputValues.boolean };
    case "number":
      return { number: inputValues.number };
    case "user":
      return context.user;
    case "joinText":
      return { joinedText: inputValues.string1 + inputValues.string2 };
    case "reverseBoolean":
      return { boolean: !inputValues.boolean };
    default:
      return inputValues;
  }
};

const engine = new RootEngine(simpleConfig4, resolvePorts, resolveNodes);

export const SimpleEditor = () => {
  return (
    <NodeEditor
      portTypes={simpleConfig.portTypes}
      nodeTypes={simpleConfig.nodeTypes}
      defaultNodes={[
        {
          type: "string",
          x: -100,
          y: -80
        }
      ]}
    />
  );
};

export const SimpleEditor2 = () => {
  return (
    <NodeEditor
      portTypes={simpleConfig2.portTypes}
      nodeTypes={simpleConfig2.nodeTypes}
      defaultNodes={[
        {
          type: "string",
          x: -300,
          y: -240
        },
        {
          type: "boolean",
          x: -80,
          y: -80
        },
        {
          type: "number",
          x: 100,
          y: 50
        }
      ]}
    />
  );
};

export const SimpleEditor3 = () => {
  return (
    <NodeEditor
      portTypes={simpleConfig2.portTypes}
      nodeTypes={simpleConfig2.nodeTypes}
      disableZoom
      defaultNodes={[
        {
          type: "homepage",
          x: 190,
          y: -150
        }
      ]}
    />
  );
};

export const SimpleEditor4 = () => {
  return (
    <NodeEditor
      portTypes={simpleConfig3.portTypes}
      nodeTypes={simpleConfig3.nodeTypes}
      disableZoom
      defaultNodes={[
        {
          type: "homepage",
          x: 190,
          y: -150
        },
        {
          type: "user",
          x: -300,
          y: -80
        }
      ]}
    />
  );
};

export const SimpleEditor5 = () => {
  return (
    <NodeEditor
      portTypes={simpleConfig4.portTypes}
      nodeTypes={simpleConfig4.nodeTypes}
      disableZoom
      defaultNodes={[
        {
          type: "homepage",
          x: 190,
          y: -150
        },
        {
          type: "joinText",
          x: -300,
          y: -120
        }
      ]}
    />
  );
};

export const SimpleEditor6 = () => {
  return (
    <NodeEditor
      portTypes={simpleConfig4.portTypes}
      nodeTypes={simpleConfig4.nodeTypes}
      disableZoom
      defaultNodes={[
        {
          type: "homepage",
          x: 190,
          y: -150
        },
        {
          type: "reverseBoolean",
          x: -240,
          y: -70
        }
      ]}
    />
  );
};

const fakeUser = {
  firstName: "Bustopher",
  lastName: "Jones",
  isLoggedIn: true,
  isAdmin: false
};

const nullUser = {
  firstName: "",
  lastName: "",
  isLoggedIn: false,
  isAdmin: false
};

const initialNodes = {
  ROk0lkW8E0: {
    id: "ROk0lkW8E0",
    x: 120,
    y: -150,
    type: "homepage",
    width: 170,
    connections: {
      inputs: {
        title: [{ nodeId: "6lOQCgJlQQ", portName: "joinedText" }],
        showSignup: [{ nodeId: "2B9OGjkXAQ", portName: "boolean" }]
      },
      outputs: {}
    },
    inputData: {
      title: { string: "" },
      description: { string: "Thanks for visiting my website!" },
      showSignup: { boolean: false },
      copyrightYear: { number: 2020 }
    },
    root: true
  },
  "IdAyF5-Jyr": {
    id: "IdAyF5-Jyr",
    x: -286.1979166666667,
    y: -91.11111111111111,
    type: "user",
    width: 130,
    connections: {
      inputs: {},
      outputs: {
        firstName: [{ nodeId: "6lOQCgJlQQ", portName: "string2" }],
        isLoggedIn: [{ nodeId: "2B9OGjkXAQ", portName: "boolean" }]
      }
    },
    inputData: {}
  },
  "6lOQCgJlQQ": {
    id: "6lOQCgJlQQ",
    x: -96.19791666666667,
    y: -182.22222222222223,
    type: "joinText",
    width: 160,
    connections: {
      inputs: { string2: [{ nodeId: "IdAyF5-Jyr", portName: "firstName" }] },
      outputs: { joinedText: [{ nodeId: "ROk0lkW8E0", portName: "title" }] }
    },
    inputData: { string1: { string: "Welcome " }, string2: { string: "" } }
  },
  "2B9OGjkXAQ": {
    id: "2B9OGjkXAQ",
    x: -86.19791666666667,
    y: 23.333333333333336,
    type: "reverseBoolean",
    width: 140,
    connections: {
      inputs: { boolean: [{ nodeId: "IdAyF5-Jyr", portName: "isLoggedIn" }] },
      outputs: { boolean: [{ nodeId: "ROk0lkW8E0", portName: "showSignup" }] }
    },
    inputData: { boolean: { boolean: false } }
  }
}

export const HomepageExample = () => {
  const [user, setUser] = React.useState(fakeUser);
  const [nodes, setNodes] = React.useState(initialNodes);
  const { title, description, showSignup, copyrightYear } = useRootEngine(
    nodes,
    engine,
    {
      user
    }
  );

  const login = () => setUser(fakeUser);
  const logout = () => setUser(nullUser);

  return (
    <div style={{ width: "100%", display: "flex", minHeight: 500 }}>
      <div
        style={{
          flex: "1 1 auto",
          color: "#000",
          overflow: "hidden",
          borderRadius: 8
        }}
      >
        <NodeEditor
          nodes={nodes}
          onChange={setNodes}
          initialScale={0.9}
          portTypes={simpleConfig4.portTypes}
          nodeTypes={simpleConfig4.nodeTypes}
          defaultNodes={[
            {
              type: "homepage",
              x: 120,
              y: -150
            }
          ]}
        />
      </div>
      <div
        style={{
          minWidth: 200,
          width: "30%",
          borderRadius: 8,
          background: "rgb(127, 250, 184)",
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          color: "#000",
          padding: 10
        }}
      >
        <h1 style={{ fontSize: 20, margin: 0, marginBottom: 10, textAlign: "center" }}>
          {title}
        </h1>
        <p style={{ textAlign: "center", lineHeight: 1 }}>{description}</p>
        {user.isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
        {showSignup && (
          <form style={{marginTop: 10}}>
            <p style={{ margin: 0 }}>Fill out the form to signup!</p>
            <input type="email" />
            <button>Signup!</button>
          </form>
        )}
        <footer style={{ marginTop: "auto" }}>© flume {copyrightYear}</footer>
      </div>
    </div>
  );
};

const initialNodes2 = {"ROk0lkW8E0":{"id":"ROk0lkW8E0","x":196.64930555555557,"y":-107.77777777777779,"type":"homepage","width":170,"connections":{"inputs":{"title":[{"nodeId":"6lOQCgJlQQ","portName":"joinedText"}],"showSignup":[{"nodeId":"2B9OGjkXAQ","portName":"boolean"}]},"outputs":{}},"inputData":{"title":{"string":""},"description":{"string":"Thanks for visiting my website!"},"showSignup":{"boolean":false},"copyrightYear":{"number":2020}},"root":true},"IdAyF5-Jyr":{"id":"IdAyF5-Jyr","x":-350.66840277777777,"y":-78.88888888888889,"type":"user","width":130,"connections":{"inputs":{},"outputs":{"firstName":[{"nodeId":"6lOQCgJlQQ","portName":"string2"}],"isLoggedIn":[{"nodeId":"2B9OGjkXAQ","portName":"boolean"}]}},"inputData":{}},"6lOQCgJlQQ":{"id":"6lOQCgJlQQ","x":-96.24131944444444,"y":-190,"type":"joinText","width":160,"connections":{"inputs":{"string2":[{"nodeId":"IdAyF5-Jyr","portName":"firstName"}]},"outputs":{"joinedText":[{"nodeId":"ROk0lkW8E0","portName":"title"}]}},"inputData":{"string1":{"string":"Welcome "},"string2":{"string":""}}},"2B9OGjkXAQ":{"id":"2B9OGjkXAQ","x":-88.44618055555556,"y":88.88888888888889,"type":"reverseBoolean","width":140,"connections":{"inputs":{"boolean":[{"nodeId":"IdAyF5-Jyr","portName":"isLoggedIn"}]},"outputs":{"boolean":[{"nodeId":"ROk0lkW8E0","portName":"showSignup"}]}},"inputData":{"boolean":{"boolean":false}}}}

export const CommentsEditor = () => {

  return (
    <NodeEditor
      initialScale={0.9}
      portTypes={simpleConfig4.portTypes}
      nodeTypes={simpleConfig4.nodeTypes}
      nodes={initialNodes2}
      comments={{"lQxzhUQGnr":{"id":"lQxzhUQGnr","text":"Add the user's first name to the title","x":-102.08333333333334,"y":-245.55555555555557,"width":173.62847222222223,"height":41.439208984375,"color":"blue"},"bLkYimKb6F":{"id":"bLkYimKb6F","text":"If the user is NOT logged in, show the signup.","x":-104.296875,"y":31.111111111111114,"width":180.10240342881946,"height":43.444417317708336,"color":"green"}}}
      defaultNodes={[
        {
          type: "homepage",
          x: 240,
          y: -150
        }
      ]}
    />
  )
}

export const RootNodeEditor = () => {

  return (
    <NodeEditor
      initialScale={0.9}
      portTypes={simpleConfig4.portTypes}
      nodeTypes={simpleConfig4.nodeTypes}
      nodes={initialNodes2}
      disableZoom
      defaultNodes={[
        {
          type: "homepage",
          x: 240,
          y: -150
        }
      ]}
    />
  )
}
