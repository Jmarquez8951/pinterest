import firebase from 'firebase/app';
import 'firebase/auth';

import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCurrentUser = () => {
  const myUid = firebase.auth().currentUser.uid;
  return myUid;
};

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

export default { getUserBoardsByUid };
