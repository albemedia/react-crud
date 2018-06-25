import React from "react";

const iconStyle = {
  width: 30,
  height: 30
};

const Loading = ({ text }) => {
  return (
    <div>
      <img
        className="mr-2 ml-2 float-left"
        style={iconStyle}
        src={window.location.origin + "/loading_icon.gif"}
        alt="{text}"
      />
      <span className="align-middle text-muted">{text}</span>
    </div>
  );
};

export default Loading;
