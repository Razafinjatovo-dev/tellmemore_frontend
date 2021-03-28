import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SwitchQuestions_Responses from "../components/SwitchQuestions_Responses";
import textFile from "../assets/file-text.svg";
import star from "../assets/star.svg";

const ResponsesTab = (props) => {
  const { id, url } = props;
  // const { id } = useParams();
  const [formData, setFormData] = useState();
  const [fetchingData, setFetchingData] = useState(true);

  // Fecth Data related to one specific form

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        const response = await axios.get(`${url}/form/${id}`);
        setFormData(response.data);
        console.log(response.data);
        // setFormTitleToDisplay(response.data.form_title);
        // setUpdatedQuestions(response.data.questions);
        setFetchingData(false);
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
      {/* <SwitchQuestions_Responses /> */}
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
                <div className="question_Response">
                  <p
                    className="questionNumber"
                    style={{
                      backgroundColor:
                        response.responseType === "text"
                          ? "#F5BA49"
                          : "#F09F97",
                    }}
                  >
                    {responseIndex + 1} -{" "}
                    {response.responseType === "text" ? (
                      <span>
                        <img alt="textIcon" src={textFile} />
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <img alt="markIcon" src={star} />
                      </span>
                    )}
                  </p>
                  <p className="questionTab_question title">
                    {" "}
                    {response.questionContent}
                  </p>
                </div>
              </div>
              <div className="questionTab_response text">
                {response.responseType === "text" ? (
                  <p> {response.responseContent}</p>
                ) : (
                  <div style={{ display: "flex" }}>
                    {[1, 2, 3, 4, 5].map((e) => {
                      if (e === Number(response.responseContent)) {
                        return (
                          <p
                            key={e}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#F09F97",
                              borderColor: "#35764B",
                              borderWidth: 1,
                              borderStyle: "solid",
                              padding: "10px",
                              width: "30px",
                              height: "30px",
                              textAlign: "center",
                            }}
                          >
                            {e}
                          </p>
                        );
                      } else {
                        return (
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#EAF9EC",
                              borderColor: "#35764B",
                              borderWidth: 1,
                              borderStyle: "solid",
                              padding: "10px",
                              width: "30px",
                              height: "30px",
                              textAlign: "center",
                            }}
                          >
                            {e}
                          </p>
                        );
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
