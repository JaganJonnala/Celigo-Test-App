import React, { useState } from "react";
import Home from "./Home";
import AboutUs from "./AboutUs";
import SignIn from "./Sign-in";
import Company from "./Company";
import Jobs from "./Jobs";
import EditJobs from "./EditJobs";
import AppContext from "./context";
import ErrorPage from "./ErrorPage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import NavBar from "./NavBar";
import "./App.css";

// const RoutedApp = () => <BrowserRouter></BrowserRouter>;

function App() {
  const [isAuthenticated, setAuth] = useState(false);
  const [navPath, setPath] = useState("/home");

  const updateAuth = (value) => {
    setAuth(value);
  };

  const updatePath = (value) => {
    setPath(value);
  };

  const globalObject = {
    isAuthenticated: isAuthenticated,
    navPath: navPath,
    updatePath,
    updateAuth,
  };

  return (
    <AppContext.Provider value={globalObject}>
      <div className="App">
        <BrowserRouter>
          <div className="header">
            <NavBar />
          </div>
          <div className="content">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/about" component={AboutUs} />
              <Route path="/about/company" component={Company} />
              <Route path="/about/jobs" component={Jobs} />
              <Route path="/about/jobs/edit" component={EditJobs} />
              <Route path="/signin" component={SignIn} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
