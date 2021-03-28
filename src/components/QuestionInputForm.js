import React, { useState } from "react";

const QuestionInputForm = ({
  hide,
  setHide,
  newForm,
  setNewForm,
  questionType,
}) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [textInput, setTextInput] = useState("");

  const handleTextInput = (event) => {
    setTextInput(event.target.value);
    setNewQuestion({
      responseType: questionType === "mark" ? "mark" : "text",
      title: event.target.value,
      // response: null,
    });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // state copy
        let newFormCopy = { ...newForm };
        // push the additional question
        newFormCopy.questions.push(newQuestion);

        //Update le state
        setNewForm(newFormCopy);
        setTextInput("");
        // Hide the form
        setHide(true);
        // alert("Question prise en compte");
        console.log(newForm);
      }}
      style={{ display: hide === false ? "" : "none" }}
    >
      <h3 className="text">
        Saisir votre question de type{" "}
        {questionType === "mark" ? "note" : "texte"}
      </h3>
      <textarea
        onChange={handleTextInput}
        type="text"
        placeholder="Saisir la question et appuyer sur entrée"
        value={textInput}
        style={{ width: "300px", height: "100px" }}
        rows={50}
      />
      <button
        type="submit"
        className="greenButton"
        style={{ outline: "none", borde: "none" }}
      >
        Ajouter
      </button>
    </form>
  );
};

export default QuestionInputForm;
