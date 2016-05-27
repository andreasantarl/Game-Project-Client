'use strict';

const app = require ('../app.js');

const success = (data) => {
  if (data) {
  console.log(data);
} else {
  console.log("WOOT!");
}
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user);
};

const signOutSuccess = () => {
  app.user = null;
  console.log(app);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
};
