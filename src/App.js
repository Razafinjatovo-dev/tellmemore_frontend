import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

//Dependencies
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Components
import Header from "./components/Header";
import Home from "./containers/Home";
import FormDetails from "./containers/EditForm";
import Create from "./components/Create";
import FormFrontPage from "./components/FormFrontPage";
import ResponseForm from "./containers/ResponseForm";
import EditForm from "./containers/EditForm";
import ResponsesTab from "./containers/ResponsesTab";

function App() {
  const url = "http://localhost:3100";
  const [formsList, setFormsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setFormsList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [isLoading, refresh]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home
            formsList={formsList}
            setFormsList={setFormsList}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/create">
          <Create
            formsList={formsList}
            setFormsList={setFormsList}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            url={url}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Route>
        <Route path="/formFrontPage/:id">
          <FormFrontPage
            formsList={formsList}
            setFormsList={setFormsList}
            url={url}
          />
        </Route>
        <Route path="/ResponseForm/:id">
          <ResponseForm formsList={formsList} url={url} />
        </Route>
        <Route path="/EditForm/:id">
          <EditForm
            url={url}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Route>
        <Route path="/FormDetails/:id">
          <FormDetails path="/form/:id" />
        </Route>
        <Route path="/ResponsesTab/:id">
          <ResponsesTab url={url}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
