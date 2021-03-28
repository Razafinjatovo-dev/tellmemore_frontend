import React, { useState } from "react";

import TextArea from "./TextArea";
import Marks from "./Marks";
import MyFormsButton from "./buttons/MyFormsButton";

const ResponseTag = ({
  questionData,
  questionIndex,
  responsesList,
  setResponsesList,
}) => {
  const [responseTyped, setResponseTyped] = useState();

  const handleSubmitQuestionResponse = (event) => {
    event.preventDefault();
    alert("Réponse prise en compte")
    //Create response to add
    let responseToAdd = {
      questionId: questionData._id,
      questionContent: questionData.title,
      responseType: questionData.responseType,
      responseContent: responseTyped,
    };

    // if responselist empty
    if (responsesList.length === 0) {
      // alert("responses List vide");
      //Copy responsesList
      let newResponsesList = [...responsesList, responseToAdd];
      //Add the new response in responses list without any further check
      return setResponsesList(newResponsesList);
    } else {
      //otherwise check inside responsesList if this question already answered
      for (let i = 0; i < responsesList.length; i++) {
        //If the questionId from this responseToAdd match with  the questionId from an existing response => it means this question is already answered
        if (responsesList[i].questionId === responseToAdd.questionId) {
          // alert("question already answered");
          //Copy responsesList
          let newResponsesList = [...responsesList];
          // replace the existing response by the new one
          const indexOfQuestionToReplace = newResponsesList.indexOf(
            responsesList[i]
          );
          newResponsesList.splice(indexOfQuestionToReplace, 1, responseToAdd);
          //step1 remove the existing one
          //Step2 push the new one
          setResponsesList(newResponsesList);
          return;
        } else {
          // alert("no existing response for this question");

          //if not yet answered, add the additionnal response to the existing responsesList
          const newResponsesList = [...responsesList, responseToAdd];
          setResponsesList(newResponsesList);

        }
      }
      // );
    }
  };

  return (
    <div>
      <div>
        {/* <MyFormsButton clickHandler={goBackToHomePage} /> */}
        {/* <button onClick={() => history.push("/")}>Mes formulaires</button> */}
      </div>
      <h3 className="responseForm_questionNumber title">
        QUESTION {questionIndex + 1}
      </h3>
      <h3 className="responseForm_questionContent title">
        {questionData.title}
      </h3>
      {questionData.responseType === "text" ? (
        <form onSubmit={handleSubmitQuestionResponse}>
          {/* <p>Votre réponse:</p> */}
          {/* <p>{responseTyped}</p> */}
          <TextArea
            // questionData={questionData}
            // responsesList={responsesList}
            // setResponsesList={setResponsesList}
            // responseTyped={responseTyped}
            setResponseTyped={setResponseTyped}
          />
          <button
            style={{ border: "none", marginTop: "20px" }}
            className="greenButton"
            type="submit"
          >
            Valider
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitQuestionResponse}>
          <Marks
            // questionData={questionData}
            // responsesList={responsesList}
            // setResponsesList={setResponsesList}
            // responseTyped={responseTyped}
            setResponseTyped={setResponseTyped}
          />
          <p>Votre réponse: {responseTyped}</p>
          {/* <button type="submit">Valider réponse</button> */}
        </form>
      )}
    </div>
  );
};

export default ResponseTag;

//responses:[{},{}]

//  {
//   questionId: "feczecezc",
//   questionContent: "name",
//   responseType: "text"
//   responseContent: "Dupont"
// }

//  {
//   questionId: "feczecezc",
//   questionContent: "age",
//   responseType: "mark"
//   responseContent: "10"
// }
