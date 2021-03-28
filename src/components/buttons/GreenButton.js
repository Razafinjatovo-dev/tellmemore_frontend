import React from "react";

const GreenButton = ({clickHandler, text}) => {
  return (
    <div className="greenButton" onClick={clickHandler}>
      <p>{text}</p> 
    </div>
  );
};

export default GreenButton;
