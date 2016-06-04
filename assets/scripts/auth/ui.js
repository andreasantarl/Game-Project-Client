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

const signUpSuccess = (data) => {
  if (data) {
  console.log(data);
} else {
  console.log("WOOT!");
}
$("#sign-up").hide();
$("#sign-in").hide();
$("#new-game").show();
$("#view-games").show();
};

const failure = (error) => {
  console.error(error);
  //error message display on screen
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user);
  $("#sign-in").hide();
  $("#sign-up").hide();
  $("#new-game").show();
  $("#view-games").show();
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

const getGames = function () {
  let gamesPlayed = app.user.games.length;
  // let  array = data.games;
  // for (let i = 0; i < gamesPlayed; i++){
//    checkForWin(array[i].cells);
//  };
  $(".gameAggregate").text(gamesPlayed);
//  $(".")
};

module.exports = {
  failure,
  success,
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  createGameSuccess,
  returnGameId,
  getGames,
};
