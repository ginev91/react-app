import React, { useState /* useEffect */ } from "react";
import { useList } from "react-firebase-hooks/database";
import TutorialDataService from "../services/TutorialService";
import Tutorial from "./Tutorial";
import firebase from "firebase";

const TutorialsList = () => {
 
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  
  const [tutorials, loading, error] = useList(TutorialDataService.getAll());
  console.log(tutorials);

 

  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    const { title, description, published, deleted, author,url } = tutorial.val();

    setCurrentTutorial({
      key: tutorial.key,
      title,
      description,
      published,
      deleted,
      author,
      url
    });

    setCurrentIndex(index);
  };



  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className="list-group">
          {!loading &&
            tutorials &&
            tutorials.map((tutorial, index) => (
              
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              > 
                {tutorial.val().title}
                {/* tutorial.title */}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;