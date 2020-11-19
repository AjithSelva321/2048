import React from "react";

function Block(props) {
  let blockStyle = {
    backgroundColor: "lightgoldenrodyellow",
    width: "90px",
    margin: "7px",
    textAlign: "center",
    lineHeight: "85px",
    fontSize: "31px",
    color: "black",
    borderRadius: "5px",
    fontWeight: "700",
  };

  let numberInString;

  if (props.number == 0) {
    blockStyle.color = "lightgoldenrodyellow";
  } else {
    switch (props.number) {
      case 128:
        blockStyle.boxShadow =
          "0 10px 20px 0 rgba(0.5, 0.5, 0.5, 0.4),0 10px 50px 0 rgba(0.5, 0.5, 0.5, 0.3)";
      case 4:
        blockStyle.backgroundColor = "#ffb3d9";
        break;
      case 256:
        blockStyle.boxShadow =
          "0 10px 20px 0 rgba(0.5, 0.5, 0.5, 0.4),0 10px 50px 0 rgba(0.5, 0.5, 0.5, 0.3)";
      case 8:
        blockStyle.backgroundColor = "#b8e994";
        break;
      case 512:
        blockStyle.boxShadow =
          "0 10px 20px 0 rgba(0.5, 0.5, 0.5, 0.4),0 10px 50px 0 rgba(0.5, 0.5, 0.5, 0.3)";
      case 16:
        blockStyle.backgroundColor = "#a29bfe";
        break;
      case 1024:
        blockStyle.boxShadow =
          "0 10px 20px 0 rgba(0.5, 0.5, 0.5, 0.4),0 10px 50px 0 rgba(0.5, 0.5, 0.5, 0.3)";
      case 32:
        blockStyle.backgroundColor = "#D980FA";
        break;
      case 2048:
        blockStyle.boxShadow =
          "0 10px 20px 0 rgba(0.5, 0.5, 0.5, 0.4),0 10px 50px 0 rgba(0.5, 0.5, 0.5, 0.3)";
      case 64:
        blockStyle.backgroundColor = "#e17055";
        break;
    }
  }
  numberInString = String(props.number);
  return <div style={blockStyle}>{numberInString}</div>;
}

export default Block;
