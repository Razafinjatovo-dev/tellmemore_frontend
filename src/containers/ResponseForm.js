import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ResponseTag from "../components/ResponseTag";

const ResponseForm = ({ url }) => {
  const { id } = useParams();
  const history = useHistory();
  // Fetch data via id + setdata in a local state
  const [formData, setFormData] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [responsesList, setResponsesList] = useState([]);
  console.log(responsesList);

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
      console.log("payload",payload);

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
    <div>
      <h3>ResponseForm</h3>
      <h3>Titre du formulaire: {formData.form_title}</h3>
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
              data = {formData}
            />
          );
        })}
        <div>
          <p>Merci d'avoir répondu à ce formulaire</p>
          <button onClick={handleSubmitResponses}>
            Accéder à mes formulaires
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseForm;
