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

/*
const setGameArray = function (id, move) {
  let location = id;
  let value = move;

    if (i === location) {
      if (gameBoard[i] !== '') {
        console.log(value + 'already has this spot!');
      } else {
        gameBoard[i] = value;
      }
    }
  }
  console.log(gameBoard);
};
*/

  const setGameArray = function (id, move) {
    let location = id;
    let value = move;
    // console.log(location);
    // console.log(value);
    if (location === "box1"){
      if (gameBoard[0] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[0] = value;
      }
    } else if (location === "box2"){
      if (gameBoard[1] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[1] = value;
      }
    } else if (location === "box3"){
      if (gameBoard[2] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[2] = value;
      }
    } else if (location === "box4"){
      if (gameBoard[3] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[3] = value;
      }
    } else if (location === "box5"){
      if (gameBoard[4] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[4] = value;
      }
    } else if (location === "box6"){
      if (gameBoard[5] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[5] = value;
      }
    } else if (location === "box7"){
      if (gameBoard[6] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[6] = value;
      }
    } else if (location === "box8"){
      if (gameBoard[7] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[7] = value;
      }
    } else {
      if (gameBoard[8] !== '') {
        console.log(move + 'already has this spot!');
      } else {
        gameBoard[8] = value;
      }
    }
    console.log(gameBoard);
    // return gameBoard;
  };


//set value of text to play move
const playerMove = function (event) {
    event.preventDefault();
    let move = setTurn();
    $(this).text(move);
    let id = $(this).attr('id');

    setGameArray(id, move);
  };

//set index of array based on div clicked and player turn

/*
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#new-game').on('submit', onNewGame);
  $('#view-games').on('submit', onViewGames);
  $('#box1').on('click', playerMove);
  $('#box2').on('click', playerMove);
  $('#box3').on('click', playerMove);
  $('#box4').on('click', playerMove);
  $('#box5').on('click', playerMove);
  $('#box6').on('click', playerMove);
  $('#box7').on('click', playerMove);
  $('#box8').on('click', playerMove);
  $('#box9').on('click', playerMove);
};
*/

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#new-game').on('submit', onNewGame);
  $('#view-games').on('submit', onViewGames);
  $('#box1').on('click', playerMove);
  $('#box2').on('click', playerMove);
  $('#box3').on('click', playerMove);
  $('#box4').on('click', playerMove);
  $('#box5').on('click', playerMove);
  $('#box6').on('click', playerMove);
  $('#box7').on('click', playerMove);
  $('#box8').on('click', playerMove);
  $('#box9').on('click', playerMove);

//  $('.box').on('click', setGameArray);
};

$(document).ready(function () {
  console.log(gameBoard);
});

module.exports = {
  addHandlers,
};
