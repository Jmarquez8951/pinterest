import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

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

export default { getBoards };
