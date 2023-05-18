import React from "react";
import "./style.css";

const Monitor = ({ screen }) => {
  return (
    <div className="monitor">
      <input className="monitor__screen" value={screen} type="text" disabled />
    </div>
  );
};

export default Monitor;
