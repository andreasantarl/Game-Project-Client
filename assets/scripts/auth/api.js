'use strict';

const app = require('../app.js');
const ui = require('./ui');

const signUp = (data) => {
  return $.ajax({
    url: app.host + '/sign-up',
    method: 'POST',
    data: data,
  });
};

const signIn = (data) => {
  return $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data: data,
  });
};

const signOut = () => {
  return $.ajax({
    url: app.host + '/sign-out/' + app.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const changePassword = (data) => {
  return $.ajax({
    url: app.host + '/change-password/' + app.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

//new Game created
const newGame = () => {
  return $.ajax({
    url: app.host + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {},
  });
};

<<<<<<< HEAD
//make get request for number of games
const gamesPlayed = () => {
  return $.ajax({
    url: app.host + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};


// //new view games
// const viewGames = (data) => {
//   return $.ajax({
//     url: app.host + '/games/' + app.games.id,
//     method: 'PATCH',
//     headers: {
//       Authorization: 'Token token=' + app.user.token,
//     },
//     data: data,
//   });
// };

=======
>>>>>>> master
const updateGames = (gameMoveIndex, gameMove, gameOver) => {
  return $.ajax({
    url: app.host + '/games/' + ui.returnGameId(),
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": gameMoveIndex,
          "value": gameMove,
        },
        "over": gameOver,
      }
    }
  });
};

//get stored data
const viewGames = () => {
  return $.ajax({
    url: app.host + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};


module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  newGame,
<<<<<<< HEAD
  gamesPlayed,
=======
  viewGames,
>>>>>>> master
  updateGames,
};
