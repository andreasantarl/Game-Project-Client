'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let turn = 0;
let move = '';
let player = '';
let winner = false;

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


//allow game moves to be made if not already done
const setGameArray = function (id, move) {
  let location = parseInt(id);
  let value = move;
  if (gameBoard[location] !== '') {
    console.log(value + 'already has this spot!');
    } else {
      gameBoard[location] = value;
    }
//      checkForWin(gameBoard);
};



//checks if a user has won the game
const checkForWin = function (gameBoard) {
//  event.preventDefault();
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
          // console.log("The winner is: x");
          // console.log("Winner value " + winner);
        } else if (((gameBoard[0] === gameBoard[1]) && (gameBoard[2] === gameBoard[0]) && gameBoard[0] ==='o') ||
      ((gameBoard[3] === gameBoard[4]) && (gameBoard[5] === gameBoard[3]) && gameBoard[3] ==='o') ||
      ((gameBoard[6] === gameBoard[7]) && (gameBoard[8] === gameBoard[6]) && gameBoard[6] ==='o') ||
      ((gameBoard[0] === gameBoard[3]) && (gameBoard[6] === gameBoard[0]) && gameBoard[0] ==='o') ||
      ((gameBoard[1] === gameBoard[4]) && (gameBoard[7] === gameBoard[1]) && gameBoard[1] ==='o') ||
      ((gameBoard[2] === gameBoard[5]) && (gameBoard[8] === gameBoard[2]) && gameBoard[2] ==='o') ||
      ((gameBoard[0] === gameBoard[4]) && (gameBoard[8] === gameBoard[0]) && gameBoard[0] ==='o') ||
      ((gameBoard[2] === gameBoard[4]) && (gameBoard[6] === gameBoard[2]) && gameBoard[2] ==='o')) {
          winner = true;
      //    $(document).text("<div>Player O won the game!</div>");
          //div in HTML with this junk and then hide on document load and then show when win/loss/tie occurs
          // console.log("The winner is: o");
          // console.log("Winner value " + winner);
        } else if (gameBoard.indexOf('') === -1) {
          window.alert("It's a tie!");
          // console.log ("The game continues");
          // console.log("Winner value " + winner);
        } else {

          // console.log("Winner value " + winner);
        }
        // for (let i = 0; i < gameBoard.length; i++) {
        //   if (gameBoard[i] !== '') {
        //
        //   }
        //}
//      console.log(gameBoard);
//    return winner;
};

//set value of text to play move
const playerMove = function (event) {
    event.preventDefault();

    let move = setTurn();  //should be 'x' or 'o'
    console.log("move " + move);
    if (winner) {
      $('.box').off('click');
    } else {
        if ($(this).text('')) {
          $(this).text(move);
          let id = $(this).attr('id');
          setGameArray(id, move);
        } else {
          $(this).off('click');
        }
            checkForWin(gameBoard);
console.log("gameBoard after move " + gameBoard);
    }
  };

  const onRestartGame = function (){
    event.preventDefault();
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    console.log("Gameboard after restart: " + gameBoard);
    turn = 0;
    console.log("turn after restart: " + turn);
    move = '';
    console.log("move after restart: " + move);
    player = '';
    console.log("player after restart: " + player);
  //  $(".box").on('click');
    if (!$(".box").text('')){
     $('.box').on('click', playerMove);
      // $('#1').on('click', playerMove);
      // $('#2').on('click', playerMove);
      // $('#3').on('click', playerMove);
      // $('#4').on('click', playerMove);
      // $('#5').on('click', playerMove);
      // $('#6').on('click', playerMove);
      // $('#7').on('click', playerMove);
      // $('#8').on('click', playerMove);
   } else {
      $(".box").text('');
    }
    winner = false;
   console.log("winner: " + winner);
//   playerMove();
  };

  //create new game
  const onNewGame = function (event) {
    event.preventDefault();
    //let data = getFormFields(event.target);
    api.newGame()
      .done(ui.success)
      .fail(ui.failure);
      onRestartGame();
  };


const addHandlers = () => {
    //$('#restart-game').on('click', onRestartGame);
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
