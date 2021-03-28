import React from "react";
import trash from "../../assets/trash.svg";

const DeleteButton = ({ clickHandler }) => {
  return (
    <div className="deleteButton" onClick={clickHandler}>
        <img alt="trash" src={trash} />
    </div>
  );
};

export default DeleteButton;
