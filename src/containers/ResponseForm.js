import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ResponseTag from "../components/ResponseTag";
import MyFormsButton from "../components/buttons/MyFormsButton";

const ResponseForm = ({ url }) => {
  const { id } = useParams();
  const history = useHistory();
  // Fetch data via id + setdata in a local state
  const [formData, setFormData] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [responsesList, setResponsesList] = useState([]);
  const goBackToHomePage = () => {
    history.push("/");
  };

  // fetchdata form's data via id
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        const response = await axios.get(`${url}/form/${id}`);
        console.log(response.data);
        setFormData(response.data);
        setFetchingData(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmitResponses = () => {
    try {
      // alert("responses submitted");
      const newFormData = { ...formData };
      newFormData.responses = responsesList;

      //axios post update url/id + payload
      const payload = newFormData;
      // console.log("payload", payload);

      const postData = async () => {
        const response = await axios.post(`${url}/update`, payload);
      };

      postData();
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return fetchingData === true ? (
    <p>Chargement...</p>
  ) : (
    <div className="ResponseForm_globalWrapper">
      <div>
        <MyFormsButton clickHandler={goBackToHomePage} />
      </div>
      <div className="responseForm_container">
        <div className="responseFormformTitle">
          <h3>{formData.form_title}</h3>
        </div>

        <div className="carroussel">
          {/* {ResponseTagsToDisplay} */}
          {formData.questions.map((question) => {
            const questionIndex = formData.questions.indexOf(question);
            return (
              <ResponseTag
                key={question._id}
                questionData={question}
                questionIndex={questionIndex}
                responsesList={responsesList}
                setResponsesList={setResponsesList}
                data={formData}
              />
            );
          })}
          <div>
            <p className="text">
              Merci d'avoir répondu à ce formulaire, cliquez sur "Sauvegarder
              vos réponses" pour enregistrement
            </p>
            <button
              style={{ border: "none", backgroundColor: "orange" }}
              className="greenButton"
              onClick={handleSubmitResponses}
            >
              Sauvergarder vos réponses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseForm;
