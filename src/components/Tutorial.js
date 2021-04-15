import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import firebase from "firebase";

const Tutorial = (props) => {

  let user = firebase.auth().currentUser;
  const initialTutorialState = {
    key: null,
    title: "",
    description: "",
    published: false,
    deleted: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const { tutorial } = props;
  if (currentTutorial.key !== tutorial.key) {
    setCurrentTutorial(tutorial);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = (status) => {
    TutorialDataService.update(currentTutorial.key, { published: status })
      .then(() => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    const data = {
      title: currentTutorial.title,
      description: currentTutorial.description,
    };

    TutorialDataService.update(currentTutorial.key, data)
      .then(() => {
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = (status) => {
    TutorialDataService.remove(currentTutorial.key, { deleted: status })
      .then(() => {
        setCurrentTutorial({ ...currentTutorial, deleted: status });
        setMessage("The status was deleted successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
 <div>
    {user !== null && user.email === tutorial.author ? 
        <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentTutorial.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </div>
  
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>
  
            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}
  
  {currentTutorial.deleted ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => deleteTutorial(false)}
              >
                Restore
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => deleteTutorial(true)}
              >
                Delete
              </button>
            )}
            
  
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateTutorial}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div> :

<div>
{currentTutorial ? (
  <div className="edit-form">
    <h4>Tutorial</h4>
    
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={currentTutorial.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={currentTutorial.description}
          onChange={handleInputChange}
        />
      </div>

  </div>
) : (
  <div>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
)}
</div>
  }
   
    </div>
  );
};

export default Tutorial;
