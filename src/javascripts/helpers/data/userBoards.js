import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo=${uid}`)
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
