import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SwitchQuestions_Responses = ({ id }) => {
  const history = useHistory();
  const formId = id;

  const [disableQuestionsButton, setDisableQuestionsButton] = useState(false);
  const [disableResponsesButton, setDisableResponsesButton] = useState(false);

  const handleClickQuestionsTab = () => {};
  const handleClickResponsesTab = () => {
    setDisableResponsesButton(true);
    history.push(`/ResponsesTab/${id}`);
  };

  return (
    <nav
      style={{
        display: "flex",
        borderColor: "green",
        borderWidth: "2px",
        borderStyle: "solid",
        marginTop: "20px",
      }}
    >
      <p>Questions</p>

      <div>
        {disableResponsesButton === false ? (
          <button onClick={handleClickResponsesTab}>Responses Actif</button>
        ) : (
          <p>Responses Inactif</p>
        )}
      </div>

      {/* <button
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
      </button> */}
    </nav>
  );
};

export default SwitchQuestions_Responses;
