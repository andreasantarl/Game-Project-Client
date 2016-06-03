'use strict';

const app = require ('../app.js');

let gameIdentifier = 0;

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

const createGameSuccess = (data) => {
  gameIdentifier = data.game.id;
};

const returnGameId = function (){
  return gameIdentifier;
};

const getGames = function (data) {
  let gamesPlayed = data.games.length;
  $(".gameAggregate").val(gamesPlayed);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  createGameSuccess,
  returnGameId,
  getGames,
};
