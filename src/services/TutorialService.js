import firebase from "../firebase";

const db = firebase.ref("/tutorials");

const getAll = () => {
  return db;
};

const create = (data) => {
  return db.push(data);
};

const update = (key, data) => {
  return db.child(key).update(data);
};

const remove = (key,data) => {
  return db.child(key).update(data);
};

const removeAll = () => {
  return db.update();
};

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
};
