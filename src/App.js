import React, {useState } from "react"
import { Switch, Route, Link,useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./contexts/AuthContext"
import firebase from "firebase";


import AddTutorial from "./components/AddTutorial";
import TutorialsList from "./components/TutorialsList";
import MyTutorials from "./components/MyTutorials";

  
function App() {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }
  
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
            <Link to={"/MyTutorials"} className="nav-link">
              My tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Deleted tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>

          
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
            <button className="nav-item" onClick={handleLogout} type="submit">
              Log Out
              </button>
            </Link>
          </li>
        <li className="nav-item">
            <Link to={"/Login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Register"} className="nav-link">
            Register
            </Link>
          </li>
          
     
        
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Tutorials app</h2>
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/MyTutorials" component={MyTutorials} />
        </Switch>
      </div>
    </div>
  );

}

export default App;

