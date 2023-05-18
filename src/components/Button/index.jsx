import React from "react";
import "./style.css";

const Button = ({ position, label, value, onClick, backgroundColor }) => {
  const { rowStart, rowEnd, colStart, colEnd } = position;

  return (
    <button
      value={value}
      style={{
        gridColumnStart: colStart,
        gridColumnEnd: colEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        backgroundColor,
      }}
      className="keypad__button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
