import React, { useState } from "react";
import TextArea from "./TextArea";
import Marks from "./Marks";

const ResponseTag = ({
  questionData,
  questionIndex,
  responsesList,
  setResponsesList,
}) => {
  //   console.log(questionData);
  const [responseTyped, setResponseTyped] = useState();

  const handleSubmitQuestionResponse = (event) => {
    event.preventDefault();
    // alert("response submitted");
    //Create response to add
    let responseToAdd = {
      questionId: questionData._id,
      questionContent: questionData.title,
      responseType: questionData.responseType,
      responseContent: responseTyped,

      
    };

    // if responselist empty
    if (responsesList.length === 0) {
      alert("responses List vide");
      //Copy responsesList
      let newResponsesList = [...responsesList, responseToAdd];
      //Add the new response in responses list without any further check
      return setResponsesList(newResponsesList);
    } else {
      //otherwise check inside responsesList if this question already answered
      for (
        let i = 0;
        i < responsesList.length;
        i++ // responsesList.forEach((response) =>
      ) {
        //If the questionId from this responseToAdd match with  the questionId from an existing response => it means this question already answered
        if (responsesList[i].questionId === responseToAdd.questionId) {
          alert("question already answered");
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
          alert("no existing response for this question");
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
      <h6>Question {questionIndex + 1}</h6>
      <h3>{questionData.title}</h3>
      {questionData.responseType === "text" ? (
        <form onSubmit={handleSubmitQuestionResponse}>
          <TextArea
            // questionData={questionData}
            // responsesList={responsesList}
            // setResponsesList={setResponsesList}
            // responseTyped={responseTyped}
            setResponseTyped={setResponseTyped}
          />
          <button type="submit">Valider réponse</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitQuestionResponse}>
          <p>Réponse: {responseTyped}</p>
          <Marks
            // questionData={questionData}
            // responsesList={responsesList}
            // setResponsesList={setResponsesList}
            // responseTyped={responseTyped}
            setResponseTyped={setResponseTyped}
          />
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
//   responseContent: "Billy"
// }

//  {
//   questionId: "feczecezc",
//   questionContent: "age",
//   responseType: "mark"
//   responseContent: "10"
// }
