import React, {useState } from "react"
import { Switch, Route, Link,useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./contexts/AuthContext"
import firebase from "firebase";
import AddTutorial from "./components/AddTutorial";
import AboutUs from "./components/AboutUs";
import MyTutorials from "./components/MyTutorials";
import DeletedTutorials from "./components/DeletedTutorials";
import TutorialsList from "./components/TutorialsList";


  
function App() {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/tutorials")
    } catch {
      setError("Failed to log out")
    }
  }

  let user = firebase.auth().currentUser;
  
  return (
    
    <div>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark container-fluid ">
        <a href="/AboutUs" className="navbar-brand">
          About the App
        </a>

        {user  ?

<div className=" container-fluid navbar-nav mr-auto">
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
  <Link to={"/DeletedTutorials"} className="nav-link">
    Deleted tutorials
  </Link>
</li>
<li className="nav-item">
  <Link to={"/add"} className="nav-link">
    Add
  </Link>
</li>

<li className="ml-auto nav-item" >
  <Link to={"/tutorials"} className="nav-link" >
  <button  className="nav-item btn btn-danger" onClick={handleLogout} type="submit">
    Log Out
    </button>
  </Link>
</li>



</div>
       :
       
       <div className="navbar-nav mr-auto">
<li className="nav-item">
  <Link to={"/tutorials"} className="nav-link">
    Tutorials
  </Link>
</li>

<li className="nav-item">
  <Link to={"/DeletedTutorials"} className="nav-link">
    Deleted tutorials
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
}
        
      </nav>

      <div className="container mt-3">
        <h2>Tutorials app</h2>
        <Switch>
           <Route exact path={["/", "/tutorials"]} component={TutorialsList} />  
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route exact path="/add" component={AddTutorial} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/MyTutorials" component={MyTutorials} />
          <Route exact path="/DeletedTutorials" component={DeletedTutorials} />
        </Switch>
      </div>
    </div>
  );

}

export default App;

