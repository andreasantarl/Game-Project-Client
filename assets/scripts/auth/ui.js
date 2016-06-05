'use strict';

const app = require ('../app.js');
const events = require ('./events.js');

let gameIdentifier = 0;

const success = (data) => {
};

const signUpSuccess = (data) => {
$("#sign-up").hide();
$("#sign-in").hide();
$("#sign-out").show();
$(".changePasswordButton").show();
$("#new-game").show();
$("#view-games").show();
events.printResults = ("Let player X begin!");
};

const failure = (error) => {
};

const signInSuccess = (data) => {
   app.user = data.user;
  $("#sign-in").hide();
  $("#sign-up").hide();
  $("#sign-out").show();
  $(".changePasswordButton").show();
  $("#new-game").show();
  $("#view-games").show();
};

const signOutSuccess = () => {
  app.user = null;
    $("#open-login").show();
    $("#change-password").hide();
    $("#sign-out").hide();
    $("#sign-in").hide();
    $("#sign-up").hide();
    $("#new-game").hide();
    $("#view-games").hide();
    $(".changePasswordButton").hide();
    $(".box").addClass('noClick');
    if (!$(".box").text('')){
    } else {
      $(".box").text('');
    }
    $(".next-player").hide().text(events.printResults);
};

const createGameSuccess = (data) => {
  gameIdentifier = data.game.id;
  events.printResults = ("Let player X begin!");
  $(".next-player").show().text(events.printResults);
    $(".box").removeClass('noClick');
};

const returnGameId = function (){
  return gameIdentifier;
};

const getGames = function (data) {
  let gamesData = data;
  let gamesPlayed = gamesData.games.length;
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
