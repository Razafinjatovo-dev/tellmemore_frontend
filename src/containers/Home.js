import React from "react";
import {Link} from 'react-router-dom'
import FormTag from "../components/FormTag";

const Home = ({formsList, setFormsList, isLoading}) => {
  console.log(formsList)
  const formTagToDisplay = formsList.map((form, index) => { 
    return ( <FormTag key={index} form={form}/>)
  })
  return isLoading === true? (<p>Chargement...</p>):(
    <div>
      <h2>Mes formulaires</h2>
      <Link to="/Create">
        <button>+ Nouveau formulaire</button>
      </Link>
      <br></br>
    {formTagToDisplay}
    </div>
  );
};

export default Home;
