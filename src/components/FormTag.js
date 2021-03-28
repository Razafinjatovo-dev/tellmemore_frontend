import React from "react";
import { useHistory } from "react-router-dom";
import EditButton from "./buttons/EditButton";
import GreenButton from "./buttons/GreenButton";

const FormTag = ({ form }) => {
  let history = useHistory();
  const handleEditClick = () => {
    // console.log(form._id)
    history.push(`/EditForm/${form._id}`);
  };

  const handleResponseClick = () => {
    history.push(`/formFrontPage/${form._id}`);
  };

 
  return (
    <div className="FormTag">
      <p className="title FormTagTitle">FORMULAIRE</p>
      <h3 className='text'>{form.form_title}</h3>
      {/* <button onClick={handleEditClick}>Editer</button>
      <button onClick={handleResponseClick}>Répondre</button> */}
      <div>
        <EditButton clickHandler={handleEditClick} />
        <GreenButton clickHandler={handleResponseClick} text="Répondre" />
      </div>
    </div>
  );
};

export default FormTag;
