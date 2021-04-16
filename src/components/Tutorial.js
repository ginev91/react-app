import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import firebase from "firebase";
import ReactPlayer from "react-player";

const Tutorial = (props) => {

  let user = firebase.auth().currentUser;
  const initialTutorialState = {
    key: null,
    title: "",
    description: "",
    published: false,
    deleted: false,
    author : ""
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

  const deleteTutorial = (status , status1) => {
    TutorialDataService.remove(currentTutorial.key, { deleted: status , published: status1 })
      .then(() => {
        setCurrentTutorial({ ...currentTutorial, deleted: status , published: status1});
        setMessage("The status was deleted successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
 <div>
    {user !== null && user.email === currentTutorial.author ? 
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
              <div className="form-group" >
                <label htmlFor="description">Description</label>
                <textarea 
                  type="textarea"
                  className="form-control"
                  rows={15}
                  cols={12}
                  id="description"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Video Url</label>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  name="url"
                  value={currentTutorial.url}
                  onChange={handleInputChange}
                />
              </div>
              <div >
                <label htmlFor="url">Turorial video</label>
                
                <ReactPlayer
              url={currentTutorial.url}
              />
              </div>
  
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            
  
            {currentTutorial.published  ? (
              <a>
                {!currentTutorial.deleted ? 
               <button
               className="badge badge-primary mr-2"
               onClick={() => updatePublished(false)}
             >
               UnPublish
             </button>  : null}
              
              </a>
            ) : (

              <a>
                {!currentTutorial.deleted ? 
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true )}
              >
                Publish
              </button> : null }
              </a>
            )}
  
  {currentTutorial.deleted ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() =>deleteTutorial(false, false)}
                              
                  
                               
              >
                Restore
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() =>deleteTutorial(true, false)}
                              
                           
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

            <div><p>Author:   {currentTutorial.author}</p></div>
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
          readOnly
          name="title"
          value={currentTutorial.title}
          onChange={handleInputChange}
        />
        
      </div>
      {!currentTutorial.deleted ?
      
      <div className="form-group">
      <label htmlFor="description">Description</label>
      <textarea
        type="textarea"
        className="form-control"
       rows={15}
        cols={12}
        id="description"
        readOnly
        name="description"
        value={currentTutorial.description}
        onChange={handleInputChange}
      />



{user ? 
<div>
              <div className="form-group">
                <label htmlFor="title">Video Url</label>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  name="url"
                  readOnly
                  value={currentTutorial.url}
                  onChange={handleInputChange}
                />
              </div>
              <div >
                <label htmlFor="url">Turorial video</label>
                
                <ReactPlayer
              url={currentTutorial.url}
              />
              </div>
      <div><p>Author:   {currentTutorial.author}</p></div>
      </div> :
 
      <div><h1>In order to see the videos please login or register.</h1></div>}
 
    </div> 
    
    
        :

        <div className="form-group">
        <label htmlFor="title">The tutorial has been deleted you can only access the URL</label>
        <input
          type="text"
          className="form-control"
          id="url"
          name="url"
          readOnly
          value={currentTutorial.url}
          onChange={handleInputChange}
        />
      </div> }
    

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
