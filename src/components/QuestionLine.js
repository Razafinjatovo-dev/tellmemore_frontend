import React, { useState } from "react";
import axios from "axios";
import handleMoveUpQuestion from "../functions/moveUpFunction";
import handleMoveDownQuestion from "../functions/moveDownFunction";

const QuestionLine = ({
  question,
  formData,
  setFormData,
  updatedQuestions,
  setUpdatedQuestions,
  create,
  edit,
  url
}) => {
  const questionIndex = formData.questions.indexOf(question);

  const [questionDisplayed, setQuestionDisplayed] = useState(question.title);

  const handleQuestionChange = async (event) => {
    // update question displayed on screen
    console.log(formData);
    setQuestionDisplayed(event.target.value);
    // update questions inside updatedQuestions in order to inform <EditForm/>
    let newQuestionsList = formData.questions;
    // console.log(newQuestionsList)
    if (edit === true) {
      newQuestionsList.forEach((elem) => {
        if (elem._id === question._id) {
          elem.title = event.target.value;
          setUpdatedQuestions(newQuestionsList);
        }
      });
    }

    if (create === true) {
      newQuestionsList.forEach((elem) => {
        console.log(formData.questions);
        let elemIndex = newQuestionsList.indexOf(elem);
        //si l'indexOf de elem et indexOf de question sont les mêmes
        if (elemIndex === questionIndex) {
          elem.title = event.target.value;
          setUpdatedQuestions(newQuestionsList);
        }
      });
    }
  };

  const handleDeleteQuestion = () => {
    //define the updated payload which is the current form minus the question we want to remove
    let questionsList = [...formData.questions];
    let newQuestionsList = questionsList.filter((elem) => {
      return elem._id !== question._id;
    });
    let updatedForm = { ...formData };
    updatedForm.questions = newQuestionsList;
    setFormData(updatedForm);
    const payload = updatedForm;

    // axios post update
    const PostDelete = async () => {
      const response = await axios.post(`${url}/update`, payload);
      console.log(response.data)
    };
  };

  return (
    <div className="QuestionLine">
      <div>
        {questionIndex + 1}-{" "}
        {question.responseType === "text" ? (
          <span>text-icon</span>
        ) : (
          <span>mark-icon</span>
        )}
      </div>
      <p>{question.title}</p>
      {/* <p>{questionDisplayed}</p> */}
      <input
        type="text"
        value={question.title}
        onChange={handleQuestionChange}
      />
      <div>
        <button
          onClick={() => handleMoveUpQuestion(question, formData, setFormData)}
        >
          up
        </button>
        <button
          onClick={() =>
            handleMoveDownQuestion(question, formData, setFormData)
          }
        >
          down
        </button>
        <button onClick={handleDeleteQuestion}>Supprimmer</button>
      </div>
    </div>
  );
};

export default QuestionLine;
