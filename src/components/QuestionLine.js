import React, { useState } from "react";
import axios from "axios";
import handleMoveUpQuestion from "../functions/moveUpFunction";
import handleMoveDownQuestion from "../functions/moveDownFunction";
import textFile from "../assets/file-text.svg";
import star from "../assets/star.svg";
import DeleteButton from "./buttons/DeleteButton";
import UpDownButton from "./buttons/UpDownButton";
import chevronUp from "../assets/chevron-up.svg";
import chevronDown from "../assets/chevron-down.svg";

const QuestionLine = ({
  question,
  formData,
  setFormData,
  updatedQuestions,
  setUpdatedQuestions,
  create,
  edit,
  url,
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
      console.log(response.data);
    };
  };

  return (
    <div className="QuestionLine">
      <div
        className="questionNumber"
        style={{
          backgroundColor:
            question.responseType === "text" ? "#F5BA49" : "#F09F97",
        }}
      >
        <p>
          {questionIndex + 1} <span>-</span>
        </p>
        {question.responseType === "text" ? (
          <span>
            <img alt="textIcon" src={textFile} />
          </span>
        ) : (
          <p>
            <img alt="markIcon" src={star} />
          </p>
        )}
      </div>
      {/* <p>{question.title}</p> */}
      {/* <p>{questionDisplayed}</p> */}
      <input
        type="text"
        value={question.title}
        onChange={handleQuestionChange}
      />
      <div className='UpDownDelete_Buttons_wrapper'>
        <button
          className="UpDownButton"
          onClick={() => handleMoveUpQuestion(question, formData, setFormData)}
        >
          <img alt="up" src={chevronUp} />
        </button>

        <button
          className="UpDownButton"
          onClick={() =>
            handleMoveDownQuestion(question, formData, setFormData)
          }
        >
          <img alt="down" src={chevronDown} />
        </button>

        <DeleteButton clickHandler={handleDeleteQuestion} />
      </div>
    </div>
  );
};

export default QuestionLine;
