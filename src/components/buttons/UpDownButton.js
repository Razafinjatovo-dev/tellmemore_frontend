import React from "react";
import trash from "../../assets/trash.svg";
import chevronUp from '../../assets/chevron-up.svg';
import chevronDown from '../../assets/chevron-down.svg';

const UpDownButton = ({ clickHandler, direction, question, formData, setFormData }) => {
  return (
    <div className="UpDownButton" onClick={clickHandler(question, formData, setFormData)}>
        <img alt="trash" src={direction==="up" ?chevronUp:chevronDown} />
    </div>
  );
};

export default UpDownButton;