import React, { useState } from "react";

const QuestionInputForm = ({ hide, setHide, newForm, setNewForm,questionType}) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [textInput, setTextInput] = useState("");

  const handleTextInput = (event) => {
    setTextInput(event.target.value);
    setNewQuestion({
      responseType: questionType=== "mark"? "mark" : "text", 
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
        setHide(true)
        alert("new question submitted");
        console.log(newForm);
      }}
      style={{ display: hide === false ? "" : "none" }}
    >
      <h3>Saisir votre question de type {questionType==='mark'? "note" : "texte"}</h3>
      <input
        onChange={handleTextInput}
        type="text"
        placeholder="Saisir la question ici"
        value={textInput}
      />
    </form>
  );
};

export default QuestionInputForm;
