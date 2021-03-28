import React, { useState } from "react";
import { useHistory} from "react-router-dom";

const SwitchQuestions_Responses = ({ id }) => {
  const history = useHistory();
  const formId = id;
  return (
    <nav
      style={{
        display: "flex",
        borderColor: "green",
        borderWidth: "2px",
        borderStyle: "solid",
        padding: "30px",
        margin: "10px",
      }}
    >
   
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        Questions
      </button>
      <button
        onClick={() => {
          history.push(`/ResponsesTab/${id}`);
        }}
      >
        Réponses
      </button>
    </nav>
  );
};

export default SwitchQuestions_Responses;
