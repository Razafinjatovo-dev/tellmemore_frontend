import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import QuestionLine from "../components/QuestionLine";
import QuestionInputForm from "../components/QuestionInputForm";
import saveFormUpdates_Creation from "../functions/saveFunction";
import testFunction from "../functions/testFunction";
import SwitchQuestions_Responses from "../components/SwitchQuestions_Responses";
import GreenButton from "../components/buttons/GreenButton";
import DeleteButton from "../components/buttons/DeleteButton";
import MyFormsButton from "../components/buttons/MyFormsButton";
import ResponsesTab from "./ResponsesTab";
import textFileGreen from "../assets/file-text-g.svg";
import starGreen from "../assets/star-g.svg";

const EditForm = ({ url, isLoading, setIsLoading, refresh, setRefresh }) => {
  let history = useHistory();
  const { id } = useParams();
  const [formData, setFormData] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [payload, setPayload] = useState();
  const [displayDeletingMessage, setDisplayDeletingMessage] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [formTitleToDisplay, setFormTitleToDisplay] = useState();
  const [updatedQuestions, setUpdatedQuestions] = useState();
  const [hide, setHide] = useState(true);
  const [questionType, setQuestionType] = useState("text");
  const [displayResponses, setDisplayResponses] = useState(false);
  const [disabledResponsesTab, setDisabledResponsesTab] = useState(true);
  const [disabledQuestionsTab, setDisabledQuestionsTab] = useState(false);

  // Fecth Data related to one specific form
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        const response = await axios.get(`${url}/form/${id}`);
        setFormData(response.data);
        // console.log(response.data);
        setFormTitleToDisplay(response.data.form_title);
        setUpdatedQuestions(response.data.questions);
        setFetchingData(false);
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteForm = () => {
    const deleteForm = async () => {
      setDisplayDeletingMessage(true);
      setIsLoading(true);
      const response = await axios.post(`${url}/delete/${id}`);
      console.log(response); 
      history.push("/");
      setIsLoading(false);
    };
    deleteForm();
  };

  const handleSave = (formData, url) => {
    console.log(formData);
    setIsLoading(true);

    // Update title  in formData
    let formDataCopy = { ...formData };
    if (formData.form_title !== formTitleToDisplay) {
      formDataCopy.form_title = formTitleToDisplay;
      setFormData(formDataCopy);
    }
    //update questions
    if (formDataCopy.questions !== updatedQuestions) {
      formDataCopy.questions = updatedQuestions;
      setFormData(formDataCopy);
    }

    //Save changes in db
    saveFormUpdates_Creation(formData, url);
    // setIsLoading(false);
    setRefresh(!refresh);
    history.push("/");
  };

  //Add text question
  const handleAddTextQuestion = () => {
    // Au clic affiche le formulaire de saisie
    setHide(false);
    setQuestionType("text");
  };

  //Add mark question
  const handleAddMarkQuestion = () => {
    // Au clic affiche le formulaire de saisie
    setHide(false);
    setQuestionType("mark");
  };

  //Switch to questions tab
  // const handleSwitchToQuestionsPage = () => {
  //   alert("questions tab");
  // };

  //Switch to responses tab
  // const handleSwitchToResponsesPage = () => {
  //   history.push(`/ResponsesTab/${id}`);
  // };

  return fetchingData === true ? (
    <p>Chargement...</p>
  ) : (
    <div className="EditForm_Wrapper">
      <p>{errorMessage}</p>
      <p
        style={{
          display: displayDeletingMessage === false ? "none" : "display",
        }}
      >
        Suppression en cours....
      </p>
      {/* Edit Page Header start */}
      <div className="EditPage_Header">
        {/* <button onClick={() => history.push("/")}>Mes formulaires</button> */}
        <MyFormsButton clickHandler={() => history.push("/")} />

        {/* <h3>{formData.form_title}</h3> */}
        <input
          className="EditPage_Header_title_Input"
          type="text"
          value={formTitleToDisplay}
          onChange={(event) => {
            setFormTitleToDisplay(event.target.value);
            // event.preventDefault();
            //copy current state
            const formCopy = { ...formData };
            //modify copy
            formCopy.form_title = event.target.value;
            //set state to copy
            setFormData(formCopy);
            console.log(formCopy);
            // handleSave(formCopy, url);
          }}
        />
        {/* <button onClick={handleSubmitFormTitle}>Change title</button> */}
        <br />
        <div className="EditPage_Header_RightButtons">
          <DeleteButton clickHandler={handleDeleteForm} />
          <GreenButton
            text="Répondre"
            clickHandler={() => {
              history.push(`/formFrontPage/${id}`);
            }}
          />
        </div>
      </div>
      {/* Edit Page Header end */}
      <div className="EditForm_greenPart"> 
        <div className="switch_Questions_Responses text">
          {/* NavBar allowing to switch from questions tab to responses tab */}
          {/* <SwitchQuestions_Responses id={id} /> */}
          <p
            className={
              disabledQuestionsTab === true ? "switchTab" : "disabledSwitchTab"
            }
            onClick={() => {
              setDisplayResponses(!displayResponses);
              setDisabledQuestionsTab(!disabledQuestionsTab);
              setDisabledResponsesTab(!disabledResponsesTab);
            }}
          >
            Questions
          </p>
          <p
            style={{ marginLeft: "30px" }}
            className={
              disabledResponsesTab === true ? "switchTab" : "disabledSwitchTab"
            }
            onClick={() => {
              setDisplayResponses(!displayResponses);
              setDisabledQuestionsTab(!disabledQuestionsTab);
              setDisabledResponsesTab(!disabledResponsesTab);
            }}
          >
            Réponses
          </p>
        </div>

        {displayResponses == true ? (
          <ResponsesTab url={url} id={id} />
        ) : (
          <div>
            <QuestionInputForm
              hide={hide}
              setHide={setHide}
              newForm={formData}
              setNewForm={setFormData}
              questionType={questionType}
            />
            <br></br>
            {/* questions à afficher début */}
            <div>
              {formData.questions.map((question) => {
                return (
                  <QuestionLine
                    key={question._id}
                    question={question}
                    formData={formData}
                    setFormData={setFormData}
                    updatedQuestions={updatedQuestions}
                    setUpdatedQuestions={setUpdatedQuestions}
                    edit={true}
                    url={url}
                  />
                );
              })}
            </div>
            {/* Questions to display below */}
            <div style={{display:'flex'}}>
              <button
                className="text addQuestionButton"
                onClick={handleAddTextQuestion}
              >
                <p>
                  <img alt="textIcon" src={textFileGreen} />
                </p>
                <p>Ajouter une question "Texte"</p>
              </button>
              <button
                className="addQuestionButton"
                onClick={handleAddMarkQuestion}
              >
                <p>
                  <img alt="textIcon" src={starGreen} />
                </p>
                <p>Ajouter une question "Note"</p>
              </button>
            </div>

            <div className="saveButtonWrapper">
              <button
                style={{ border: "none" }}
                className="greenButton"
                onClick={() => handleSave(formData, url)}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditForm;
