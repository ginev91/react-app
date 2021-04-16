import React, { Component  } from "react";
import TutorialDataService from "../services/TutorialService";
import firebase from "firebase";
import ReactPlayer from "react-player";
import TutorialsList from "../components/TutorialsList";


class AboutUs extends Component {
  
    render() {
      return (
        <div>
              <div className="container mt-3">
              <h1 className="text-center">React is cool but takes time to master!</h1>
            
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
            <TutorialsList />


        </div>
      );
    }
  }
  
  export default AboutUs;

 