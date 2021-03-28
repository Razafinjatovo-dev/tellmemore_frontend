import React from "react";

const EditButton = ({clickHandler}) => {
  return (
    <div className="editButton" onClick={clickHandler}>
      <p>Editer</p> 
    </div>
  );
};

export default EditButton;