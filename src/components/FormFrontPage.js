import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const FormFrontPage = ({ formsList, setFormsList, url }) => {
  const history = useHistory();
  const { id } = useParams();
  const [formData, setFormData] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  
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

  return fetchingData === true ? (
    <p>Chargement...</p>
  ) : (
    <div>
      <button onClick={() => history.push("/")}>Mes formulaires</button>
      <h3>Titre du questionnaire {formData.form_title}</h3>
      <p>{formData.questions.length} - questions</p>
      <button
        onClick={() => {
          history.push(`/ResponseForm/${id}`);
        }}
      >
        Commencer
      </button>
    </div>
  );
};

export default FormFrontPage;
