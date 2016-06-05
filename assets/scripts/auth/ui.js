'use strict';

const app = require ('../app.js');
const events = require ('./events.js');

let gameIdentifier = 0;

const success = (data) => {
//   if (data) {
//   console.log(data);
// } else {
//   console.log("WOOT!");
// }
};

const signUpSuccess = (data) => {
//   if (data) {
//   console.log(data);
// } else {
//   console.log("WOOT!");
// }
$("#sign-up").hide();
$("#sign-in").hide();
$("#change-password").show();
$("#sign-out").show();
$("#new-game").show();
$("#view-games").show();
events.printResults = ("Let player x begin!");
$(".next-player").show().text(events.printResults);
};

const failure = (error) => {
  console.table(app.user);
  console.error(error);
  //error message display on screen
};

const signInSuccess = (data) => {
   app.user = data.user;
  // console.log(app.user);
  $("#sign-in").hide();
  $("#sign-up").hide();
  $("#change-password").show();
  $("#sign-out").show();
  $("#new-game").show();
  $("#view-games").show();
  // events.printResults = ("Let player x begin!");
  // $(".next-player").show().text(events.printResults);
};

const signOutSuccess = () => {
  app.user = null;
//  console.log(app);
    $("#open-login").show();
    $("#change-password").hide();
    $("#sign-out").hide();
    $("#sign-in").hide();
    $("#sign-up").hide();
    $("#new-game").hide();
    $("#view-games").hide();
};

const createGameSuccess = (data) => {
  gameIdentifier = data.game.id;
  events.printResults = ("Let player x begin!");
  $(".next-player").show().text(events.printResults);
};

const returnGameId = function (){
  return gameIdentifier;
};

const getGames = function (data) {
  let gamesData = data;
  let gamesPlayed = gamesData.games.length;
//  console.log(gamesPlayed);
  $(".gameAggregate").val(gamesPlayed);
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
