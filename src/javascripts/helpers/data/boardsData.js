import firebase from 'firebase/app';
import 'firebase/auth';

import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCurrentUser = () => {
  const myUid = firebase.auth().currentUser.uid;
  return myUid;
};

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const theBoards = response.data;
      const boards = [];
      Object.keys(theBoards).forEach((boardId) => {
        theBoards[boardId].id = boardId;
        boards.push(theBoards[boardId]);
      });
      resolve(boards);
    })
    .catch((err) => reject(err));
});

const getUserBoardsByUid = () => new Promise((resolve, reject) => {
  const myUid = getCurrentUser();
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${myUid}"`)
    .then((response) => {
      const allBoards = response.data;
      const userBoards = [];
      Object.keys(allBoards).forEach((allBoardIds) => {
        allBoards[allBoardIds].id = allBoardIds;
        userBoards.push(allBoards[allBoardIds]);
      });
      resolve(userBoards);
    })
    .catch((err) => reject(err));
});

export default { getBoards, getUserBoardsByUid };
