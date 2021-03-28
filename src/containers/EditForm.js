import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import QuestionLine from "../components/QuestionLine";
import QuestionInputForm from "../components/QuestionInputForm";
import saveFormUpdates_Creation from "../functions/saveFunction";
import testFunction from "../functions/testFunction";
import SwitchQuestions_Responses from "../components/SwitchQuestions_Responses";

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
      console.log(response); //response.data.message
      //Redirection vers la page home
      history.push("/");
      setIsLoading(false);
    };
    deleteForm();
  };

  const handleSave = (formData, url) => {
    console.log(formData);
    //  testFunction();
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
  const handleSwitchToQuestionsPage = () => {
    alert("questions tab");
  };

  //Switch to responses tab
  const handleSwitchToResponsesPage = () => {
    history.push(`/ResponsesTab/${id}`);
  };

  return fetchingData === true ? (
    <p>Chargement...</p>
  ) : (
    <div>
      <p> PARAMS RECU = {id}</p>
      <p>{errorMessage}</p>
      <p
        style={{
          display: displayDeletingMessage === false ? "none" : "display",
        }}
      >
        {" "}
        Suppression en cours....
      </p>
      {/* partie du haut début */}
      <div>
        <button onClick={() => history.push("/")}>Mes formulaires</button>
        <h3>{formData.form_title}</h3>
        <input
          type="text"
          value={formTitleToDisplay}
          onChange={(event) => {
            setFormTitleToDisplay(event.target.value);
            // alert("title updated");
            // event.preventDefault();
            //copy current state
            const formCopy = { ...formData };
            //modify copy
            formCopy.form_title = event.target.value;
            //setState to copy
            setFormData(formCopy);
            console.log(formCopy);
            // handleSave(formCopy, url);
          }}
        />
        {/* <button onClick={handleSubmitFormTitle}>Change title</button> */}
        <br />
        <button onClick={handleDeleteForm}>supprimmer</button>
        <button
          onClick={() => {
            history.push(`/formFrontPage/${id}`);
          }}
        >
          Répondre
        </button>
      </div>
      {/* partie du haut fin */}
      <div>
        {/* NavBar allowing to switch from questions tab to responses tab */}
        <SwitchQuestions_Responses id={id} />

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
        {/* questions à afficher fin */}
        <button onClick={handleAddTextQuestion}>
          Ajouter un question "texte"
        </button>
        <button onClick={handleAddMarkQuestion}>
          Ajouter un question "note"
        </button>
        <div>
          <button onClick={() => handleSave(formData, url)}>Sauvegarder</button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
