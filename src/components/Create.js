import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import QuestionInputForm from "./QuestionInputForm";
import QuestionLine from "../components/QuestionLine";
import MyFormsButton from "./buttons/MyFormsButton";
import textFileGreen from "../assets/file-text-g.svg";
import starGreen from "../assets/star-g.svg";

const Create = ({
  formsList,
  setFormsList,
  isLoading,
  setIsLoading,
  url,
  refresh,
  setRefresh,
}) => {
  let history = useHistory();

  const [formTitle, setFormTitle] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [updatedQuestions, setUpdatedQuestions] = useState();

  const form = {
    form_title: formTitle,
    questions: [
      // { responseType: "text", title: "ville?", response: null },
      // { responseType: "text", title: "profession?", response: null },
      // { responseType: "mark", title: "age?", response: null },
    ],

    responses: [
      // { question: "age?", responseType: "mark", response: 2 }
    ],
  };

  const [newForm, setNewForm] = useState(form);
  const [hide, setHide] = useState(true);

  // Manage title input onChange
  const handleTitleInput = (event) => {
    setFormTitle(event.target.value);
  };

  // Save form title
  const handleSubmitFormTitle = (event) => {
    alert("Titre pris en compte");
    event.preventDefault();
    //copy current state
    const formCopy = { ...newForm };
    //modify copy
    formCopy.form_title = formTitle;
    //setState to copy
    setNewForm(formCopy);
    console.log(formCopy);
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

  //Move up question
  const handleMoveUpQuestion = (elementToReposition) => {
    // Calcul de l'index cible
    let newIndex = newForm.questions.indexOf(elementToReposition) - 1; //index actuel auquel on soustrait 1
    //Check si index cible cohérent vs longueur du tableau
    if (newIndex > newForm.questions.length - 1 || newIndex < 0) {
      return null;
    }
    //Copie du state
    let newFormCopy = { ...newForm };
    // Retirer du tableau l'élement à déplacer
    newFormCopy.questions.splice(
      newFormCopy.questions.indexOf(elementToReposition),
      1
    );
    //Positionner l'élement retiré précedemment au niveau l'index cible
    newFormCopy.questions.splice(newIndex, 0, elementToReposition);
    //Update le state
    setNewForm(newFormCopy);
  };

  //Move down question
  const handleMoveDownQuestion = (elementToReposition) => {
    // Calcul de l'index cible
    let newIndex = newForm.questions.indexOf(elementToReposition) + 1; //index actuel auquel qu'on augmente de 1
    console.log(newIndex);
    //Check si index cible cohérent vs longueur du tableau
    if (newIndex > newForm.questions.length - 1 || newIndex < 0) {
      return null;
    }
    //Copie du state
    let newFormCopy = { ...newForm };
    // Retirer du tableau l'élement à déplacer
    newFormCopy.questions.splice(
      newFormCopy.questions.indexOf(elementToReposition),
      1
    );
    //Positionner l'élement retiré précedemment au niveau l'index cible
    newFormCopy.questions.splice(newIndex, 0, elementToReposition);
    //Update le state
    setNewForm(newFormCopy);
  };

  const handleRemoveQuestion = (elementToRemove) => {
    //filter
    const filteredQuestions = newForm.questions.filter((question) => {
      return question !== elementToRemove;
    });
    //Update State
    setNewForm({ ...newForm, questions: filteredQuestions });
  };

  // MANAGE CREATING NEWFORM

  const handleSaveNewForm = (event) => {
    if (formTitle === "") {
      alert("Renseigner un titre");
    } else {
      event.preventDefault();
      // setIsLoading(true);
      alert("Questionnaire crée");
      console.log(newForm);
      const payload = newForm;
      //AXIOS POST
      const postData = async () => {
        const response = await axios.post(`${url}/create`, payload);
        console.log(response.data);
        // setIsLoading(false);
        setRefresh(!refresh);
        history.push("/");
      };

      postData();
    }
  };

  const questionsToDisplay = newForm.questions.map((question) => {
    return (
      <div key={question._id}>
        <QuestionLine
          question={question}
          formData={newForm}
          setFormData={setNewForm}
          updatedQuestions={updatedQuestions}
          setUpdatedQuestions={setUpdatedQuestions}
          create={true}
        />
      </div>
    );
  });

  const redirectHome = () => {
    history.push("/");
  };
  return (
    <div className="createForm_wrapper">
      <h3 className="title">Creation formulaire</h3>
      <MyFormsButton clickHandler={redirectHome} />

      <div className="createForm_greenPart">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // borderColor: "green",
            // borderWidth: 2,
            // borderStyle: "solid",
            // padding: 10,

            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {/* TITLE FORM */}
          <form onSubmit={handleSubmitFormTitle}>
            <p className="title">Titre: {formTitle}</p>
            <input
              type="text"
              required
              onChange={handleTitleInput}
              value={formTitle}
              placeholder="Saisir le titre et appuyer sur entrée"
              style={{ width: "300px" }}
            />
            <button>Valider titre</button>
          </form>
        </div>
        <QuestionInputForm
          hide={hide}
          setHide={setHide}
          newForm={newForm}
          setNewForm={setNewForm}
          questionType={questionType}
        />

        {/* Questions to display  */}
        <div style={{ marginTop: 20 }}>{questionsToDisplay}</div>
        <div className="CreateForm_AddButtons_wrapper">
          <button
            className="text addQuestionButton"
            onClick={handleAddTextQuestion}
          >
            <p>
              <img alt="textIcon" src={textFileGreen} />
            </p>
            <p>Ajouter une question "texte"</p>
          </button>
          <br />
          <br />
          <button
            className="text addQuestionButton"
            onClick={handleAddMarkQuestion}
           
          >
            <p>
              <img alt="textIcon" src={starGreen} />
            </p>
            <p>Ajouter une question "note"</p>
          </button>
        </div>
        <button
          style={{ border: "none" }}
          className="greenButton"
          onClick={handleSaveNewForm}
        >
          Créer le formulaire
        </button>
      </div>
    </div>
  );
};

export default Create;
