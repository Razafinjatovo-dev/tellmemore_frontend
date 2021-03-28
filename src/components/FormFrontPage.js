import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import MyFormsButton from "./buttons/MyFormsButton";

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

  const goBackToHomePage = () => {
    history.push("/");
  };
  return fetchingData === true ? (
    <p>Chargement...</p>
  ) : (
    <div className='responseForm_FrontPage_container'>
      <div>
        <MyFormsButton clickHandler={goBackToHomePage} />
        {/* <button onClick={() => history.push("/")}>Mes formulaires</button> */}
      </div>
      <div className='responseForm_FrontPage_headlines title'>
        <h3>{formData.form_title}</h3>
        <p>{formData.questions.length} questions</p>
        <button
          style={{ border: "none" }}
          className="greenButton"
          onClick={() => {
            history.push(`/ResponseForm/${id}`);
          }}
        >
          Commencer
        </button>
      </div>
    </div>
  );
};

export default FormFrontPage;
