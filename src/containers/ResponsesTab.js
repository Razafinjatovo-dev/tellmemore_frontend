import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SwitchQuestions_Responses from "../components/SwitchQuestions_Responses";

const ResponsesTab = ({ url }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState();
  const [fetchingData, setFetchingData] = useState(true);

  // Fecth Data related to one specific form
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        const response = await axios.get(`${url}/form/${id}`);
        setFormData(response.data);
        // console.log(response.data);
        // setFormTitleToDisplay(response.data.form_title);
        // setUpdatedQuestions(response.data.questions);
        setFetchingData(false);
        console.log(formData);
      } catch (error) {
        // setErrorMessage(error.message);
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  return fetchingData === true ? (
    <p>Chargement...</p>
  ) : (
    <div>
      <h3>ResponsesTab listing Questions & Responses</h3>
      <div>
        NAV BAR AVEC LE TITRE ET LES BOUTTONS A CREER EN COMPONENT (mutualisé
        avec edit form){" "}
      </div>
      <SwitchQuestions_Responses />
      <div>
        {/* Liste des questions réponses ici */}
        {formData.responses.map((response) => {
          const responseIndex = formData.responses.indexOf(response);
          return (
            <div
              key={response._id}
              style={{
                justifyContent: "space-between",
                borderColor: "green",
                borderWidth: 2,
                borderStyle: "solid",
                padding: 10,
                marginBottom: "20px",
              }}
            >
              <div>
                <p>
                  {responseIndex + 1} -{" "}
                  {response.responseType === "text" ? (
                    <span>text-icon</span>
                  ) : (
                    <span>mark-icon</span>
                  )}
                </p>
                <p> {response.questionContent}</p>
                <hr></hr>
              </div>
              <div>
                {response.responseType === "text" ? (
                  <p> {response.responseContent}</p>
                ) : (
                  <div style={{display:"flex"}}>
                    {[1, 2, 3, 4, 5].map((e) => {
                      if (e === Number(response.responseContent)) {
                        return <p style={{backgroundColor: "lightGrey", borderColor: "black", borderWidth: 2, borderStyle: "solid", padding: "10px"}}>{e}</p>;
                      }else{
                          return <p style={{borderColor: "black", borderWidth: 2, borderStyle: "solid", padding: "10px"}}>{e}</p>
                      }
                      
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResponsesTab;
