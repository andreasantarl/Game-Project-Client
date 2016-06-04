'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
//const app = require('../app.js');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let turn = 0;
let move = '';
let player = '';
let winner = false;
let arrayIndex = '';
$("#change-password").hide();
$("#sign-out").hide();
$("#sign-in").hide();
$("#sign-up").hide();
$("#new-game").hide();
$("#view-games").hide();

$("#open-login").on("click", function(){
  event.preventDefault();
  $("#sign-in").show();
  $("#sign-up").show();
  $("#open-login").hide();
});

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
    .done(ui.signUpSuccess)
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

//alternate between x and o
const setTurn = function () {
    if (turn % 2 === 0 ) {
        move = 'x';
        player = "Player1";
      } else {
        move = 'o';
        player = "Player2";
      }
    //  turn++;
      console.log(turn);
    return move;
};

//allow game moves to be made if not already done
const setGameArray = function (id, move) {
  let location = parseInt(id);
  let value = move;
  if (gameBoard[location] !== '') {
    console.log(value + 'already has this spot!');
    } else {
      gameBoard[location] = value;
    }
  arrayIndex = gameBoard[location];
};

//checks if a user has won the game
const checkForWin = function (gameBoard) {
  console.log('Gameboard' + gameBoard);
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
          winner = true;
          window.alert("Player X won the game!");
        } else if (((gameBoard[0] === gameBoard[1]) && (gameBoard[2] === gameBoard[0]) && gameBoard[0] ==='o') ||
      ((gameBoard[3] === gameBoard[4]) && (gameBoard[5] === gameBoard[3]) && gameBoard[3] ==='o') ||
      ((gameBoard[6] === gameBoard[7]) && (gameBoard[8] === gameBoard[6]) && gameBoard[6] ==='o') ||
      ((gameBoard[0] === gameBoard[3]) && (gameBoard[6] === gameBoard[0]) && gameBoard[0] ==='o') ||
      ((gameBoard[1] === gameBoard[4]) && (gameBoard[7] === gameBoard[1]) && gameBoard[1] ==='o') ||
      ((gameBoard[2] === gameBoard[5]) && (gameBoard[8] === gameBoard[2]) && gameBoard[2] ==='o') ||
      ((gameBoard[0] === gameBoard[4]) && (gameBoard[8] === gameBoard[0]) && gameBoard[0] ==='o') ||
      ((gameBoard[2] === gameBoard[4]) && (gameBoard[6] === gameBoard[2]) && gameBoard[2] ==='o')) {
          winner = true;
          //div in HTML with this junk and then hide on document load and then show when win/loss/tie occurs
           console.log("The winner is: o");
        } else if (gameBoard.indexOf('') === -1) {
          window.alert("It's a tie!");
        } else {

        }
};

const onUpdateGames = function (gameMoveIndex, gameMove, gameOver) {
  gameMove = move;
  gameMoveIndex = arrayIndex;
  gameOver = winner;
  event.preventDefault();
  api.updateGames(gameMoveIndex, gameMove, gameOver)
    .done(ui.displayGames)
    .fail(ui.failure);
};

//set value of text to play move
const playerMove = function (event) {
    event.preventDefault();
    let move = setTurn();  //should be 'x' or 'o'
    console.log("move " + move);
    if (winner) {
      $('.box').addClass('noClick');
    } else {
        if ($(this).hasClass('noClick')) {
          console.log('cant click here');
        } else {
          $(this).text(move);
          $(event.target).addClass('noClick');
          let id = $(this).attr('id');
          turn++;
          setGameArray(id, move);
        }
        checkForWin(gameBoard);
    }
    onUpdateGames(setGameArray, move, winner);
  };

  const onRestartGame = function (){
    winner = false;
    console.log("winner: " + winner);
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    console.log("Gameboard after restart: " + gameBoard);
    turn = 0;
    console.log("turn after restart: " + turn);
    move = '';
    console.log("move after restart: " + move);
    player = '';
    console.log("player after restart: " + player);
    arrayIndex = '';
     $('.box').removeClass('noClick');
    if (!$(".box").text('')){
    } else {
      $(".box").text('');
    }
  };

  //create new game
  const onNewGame = function (event) {
    event.preventDefault();
    api.newGame()
      .done(ui.createGameSuccess)
      .then(onRestartGame())
      .fail(ui.failure);
  };

  const onViewGames = function () {
    event.preventDefault();
    api.viewGames()
      .done(ui.getGames)
      .fail(ui.failure);
          console.log(ui.getGames());
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

module.exports = {
  addHandlers,
};
