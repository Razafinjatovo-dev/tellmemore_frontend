import React from "react";
import { useHistory } from "react-router-dom";

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
      <h4>FORMULAIRE</h4>
      <h3>{form.form_title}</h3>
      <button onClick={handleEditClick}>Editer</button>
      <button onClick={handleResponseClick}>Répondre</button>
    </div>
  );
};

export default FormTag;
