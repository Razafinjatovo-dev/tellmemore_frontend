import React from "react";
import { Link } from "react-router-dom";
// import GreenButton from "../components/buttons/GreenButton";
import FormTag from "../components/FormTag";

const Home = ({ formsList, setFormsList, isLoading }) => {
  // console.log(formsList);
  const formTagToDisplay = formsList.map((form, index) => {
    return <FormTag key={index} form={form} />;
  });
  return isLoading === true ? (
    <p>Chargement...</p>
  ) : (
    <div className="HomePage-Wrapper">
      <h2 className='title'>Mes formulaires</h2>
      

      <div className="formsList-container">
        <Link
          style={{ textDecoration: "none" }}
          className="buttonNewForm text"
          to="/Create"
        >
          <div>
            <span>+</span> <p>Nouveau formulaire</p>
          </div>
        </Link>

        {formTagToDisplay}
      </div>
    </div>
  );
};

export default Home;
