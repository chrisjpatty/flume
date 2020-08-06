import React from "react";

const colors = [
  {
    label: "yellow",
    color: "linear-gradient(to bottom, #d6bf47, #9d8923)"
  },
  {
    label: "orange",
    color: "linear-gradient(to bottom, #fa7841, #c94b23)"
  },
  {
    label: "red",
    color: "linear-gradient(to bottom, #fa4a6f, #c22e4d)"
  },
  {
    label: "pink",
    color: "linear-gradient(to bottom, #fe8aeb, #e046c3)"
  },
  {
    label: "purple",
    color: "linear-gradient(to bottom, #9e55fb, #6024b6)"
  },
  {
    label: "blue",
    color: "linear-gradient(to bottom, #4284f7, #2867d4)"
  },
  {
    label: "green",
    color: "linear-gradient(to bottom, #31dd9f, #11ad7a)"
  },
  {
    label: "grey",
    color: "linear-gradient(to bottom, #acb1b4, #919699)"
  }
];

export default () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginLeft: -8,
      marginRight: -8
    }}
  >
    {colors.map(color => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          margin: 8
        }}
        key={color.color}
      >
        <div
          style={{
            background: color.color,
            borderRadius: 6,
            width: 60,
            height: 60
          }}
        ></div>
        <label>{color.label}</label>
      </div>
    ))}
  </div>
);
