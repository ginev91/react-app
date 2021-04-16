import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import firebase from "firebase";



const AddTutorial = () => {
  let user = firebase.auth().currentUser;
  const initialTutorialState = {
    title: "",
    description: "",
    published: false,
    deleted: false,
    author: "",
    url : ""
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    let data = {
      title: tutorial.title,
      description: tutorial.description,
      published: false,
      deleted: false,
      author: user.email,
      url: tutorial.url

    };
   

    TutorialDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add  New Tutorial
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group flex">
            <label htmlFor="description">Description</label>
            <textarea  multiline="true" numberoflines={10} numberofcols={5} style={{height:300}}
              type="textarea"
              className="form-control"
              required
              id="description"
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Tutorial URL</label>
            <input
              type="text"
              className="form-control"
              id="url"
              required
              value={tutorial.url}
              onChange={handleInputChange}
              name="url"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
