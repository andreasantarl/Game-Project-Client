'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let turn = 0;
let move = '';
let player = '';
let winner = '';

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
        player = "Player1";
      } else {
        move = 'o';
        player = "Player2";
      }
      turn++;
    return move;
};

const checkForWin = function (gameBoard) {
  event.preventDefault();
  console.log('Gameboard' + gameBoard);
  //let arrayGame = array;

  if (
      ((gameBoard[0] === gameBoard[1]) && (gameBoard[2] === gameBoard[0]) && gameBoard[0] ==='x') ||
      ((gameBoard[3] === gameBoard[4]) && (gameBoard[5] === gameBoard[3]) && gameBoard[3] ==='x') ||
      ((gameBoard[6] === gameBoard[7]) && (gameBoard[8] === gameBoard[6]) && gameBoard[6] ==='x') ||
      ((gameBoard[0] === gameBoard[3]) && (gameBoard[6] === gameBoard[0]) && gameBoard[0] ==='x') ||
      ((gameBoard[1] === gameBoard[4]) && (gameBoard[7] === gameBoard[1]) && gameBoard[1] ==='x') ||
      ((gameBoard[2] === gameBoard[5]) && (gameBoard[8] === gameBoard[2]) && gameBoard[2] ==='x') ||
      ((gameBoard[0] === gameBoard[4]) && (gameBoard[8] === gameBoard[0]) && gameBoard[0] ==='x') ||
      ((gameBoard[2] === gameBoard[4]) && (gameBoard[6] === gameBoard[2]) && gameBoard[2] ==='x')) {
        console.log(gameBoard[0]);
          //winner = 'PlayerX';
          console.log("player X wins!");
    /*
    if ((gameBoard[0] === gameBoard[1]) && (gameBoard[1] === gameBoard[2]) && (gameBoard[0] ==='x')) {
      console.log(gameBoard[0]);
        //winner = 'PlayerX';
        console.log("player X wins!");
      } else if ((gameBoard[0] === gameBoard[1]) && (gameBoard[1] === gameBoard[2]) && (gameBoard[0] ==='o')) {
        console.log(gameBoard[0]);
          //winner = 'PlayerX';
          console.log("player o wins!");
        }
      */
    } else if (((gameBoard[0] === gameBoard[1] === gameBoard[2]) && gameBoard[0] ==='o') ||
      ((gameBoard[3] === gameBoard[4] === gameBoard[5]) && gameBoard[3] ==='o') ||
      ((gameBoard[6] === gameBoard[7] === gameBoard[8]) && gameBoard[6] ==='o') ||
      ((gameBoard[0] === gameBoard[3] === gameBoard[6]) && gameBoard[0] ==='o') ||
      ((gameBoard[1] === gameBoard[4] === gameBoard[7]) && gameBoard[1] ==='o') ||
      ((gameBoard[2] === gameBoard[5] === gameBoard[8]) && gameBoard[2] ==='o') ||
      ((gameBoard[0] === gameBoard[4] === gameBoard[8]) && gameBoard[0] ==='o') ||
      ((gameBoard[2] === gameBoard[4] === gameBoard[6]) && gameBoard[2] ==='o')) {
        winner = 'PlayerO';
        console.log("player O wins!");
      } else {
      //  console.log ("Game over!");
    }

};


const setGameArray = function (id, move) {
  let location = parseInt(id);
  let value = move;
  if (gameBoard[location] !== '') {
    console.log(value + 'already has this spot!');
  } else {
    gameBoard[location] = value;
    }
//  console.log(gameBoard);
  checkForWin(gameBoard);
};

//set value of text to play move
const playerMove = function (event) {
    event.preventDefault();
    let move = setTurn();
    if (move === ''){
        console.log("You already picked something!");
        $(this).off('click');
      } else {
        $(this).text(move);
        $(this).off('click');
      }
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
//  console.log(gameBoard);
});

module.exports = {
  addHandlers,
};
