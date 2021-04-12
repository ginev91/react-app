import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import TutorialsList from "./components/TutorialsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <a href="/tutorials" className="navbar-brand">
          Exam-tutorials
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          
          <a href="/tutorials" className="navbar-brand right">
          LOG OUT
        </a>
        <a href="/tutorials" className="navbar-brand right">
         Log In
        </a>
        <a href="/tutorials" className="navbar-brand right">
          Register
        </a>
        
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Tutorials app</h2>
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
