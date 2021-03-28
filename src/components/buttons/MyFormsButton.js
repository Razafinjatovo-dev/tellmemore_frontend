import React from "react";

const MyFormsButton = ({clickHandler}) => {
  return (
    <div className="myFormsButton title" onClick={clickHandler}>
      <p>{`<`}</p><p>Mes formulaires</p> 
    </div>
  );
}

export default MyFormsButton;