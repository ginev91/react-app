import React, {useState } from "react"
import { Switch, Route, Link,useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "../contexts/AuthContext"


import AddTutorial from "./components/AddTutorial";
import TutorialsList from "./components/TutorialsList";

  function Logout() {
  const { logout } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

 async function handleSubmit(e) {
  e.preventDefault()

  try {
    setError("")
    setLoading(true)
    await logout()
    history.push("/")
  } catch {
    setError("Failed to log out")
  }

  setLoading(false)

}
}

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
            <Link to={"/tutorials"} className="nav-link">
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
            <button onClick={handleSubmit} type="submit">
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
        </Switch>
      </div>
    </div>
  );

}

export default App;

