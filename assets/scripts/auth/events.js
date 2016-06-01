'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let turn = 0;
let move = '';
let player = '';

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
    .done(ui.success)
    .fail(ui.failure);
};

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
    .done(ui.signInSuccess)
    .fail(ui.failure);
};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut()
    .done(ui.signOutSuccess)
    .fail(ui.failure);
};

const onChangePassword = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
    .done(ui.success)
    .fail(ui.failure);
};

//create new game
const onNewGame = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.newGame(data)
    .done(ui.success)
    .fail(ui.failure);
};

const onViewGames = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.viewGames(data)
    .done(ui.success)
    .fail(ui.failure);
};

//alternate between x and o
const setTurn = function () {
  if (turn % 2 === 0 ) {
      move = 'x';
      player = "Player 1";
      turn++;
    } else {
      move = 'o';
      player = "Player 2";
      turn++;
    }
    // console.log(move);
    return move;
  };


const setGameArray = function (id, move) {
  let location = parseInt(id);
  let value = move;
  if (gameBoard[location] !== '') {
    console.log(value + 'already has this spot!');
  } else {
    gameBoard[location] = value;
    }
  console.log(gameBoard);
};

//set value of text to play move
const playerMove = function (event) {
    event.preventDefault();
    let move = setTurn();
    $(this).text(move);
    let id = $(this).attr('id');

    setGameArray(id, move);
  };

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#new-game').on('submit', onNewGame);
  $('#view-games').on('submit', onViewGames);
  $('#0').on('click', playerMove);
  $('#1').on('click', playerMove);
  $('#2').on('click', playerMove);
  $('#3').on('click', playerMove);
  $('#4').on('click', playerMove);
  $('#5').on('click', playerMove);
  $('#6').on('click', playerMove);
  $('#7').on('click', playerMove);
  $('#8').on('click', playerMove);
};

$(document).ready(function () {
  console.log(gameBoard);
});

module.exports = {
  addHandlers,
};
