import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const theUsers = response.data;
      const users = [];
      Object.keys(theUsers).forEach((userId) => {
        theUsers[userId].id = userId;
        users.push(theUsers[userId]);
      });
      resolve(users);
    })
    .catch((err) => reject(err));
});

const getUserById = (userId) => axios.get(`${baseUrl}/users/${userId}.json`);

export default { getUsers, getUserById };
