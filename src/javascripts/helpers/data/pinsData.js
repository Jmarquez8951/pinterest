import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const thePins = response.data;
      const pins = [];
      Object.keys(thePins).forEach((pinId) => {
        thePins[pinId].id = pinId;
        pins.push(thePins[pinId]);
      });
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const thePins = response.data;
      const pins = [];
      if (thePins) {
        Object.keys(thePins).forEach((pinId) => {
          thePins[pinId].id = pinId;
          pins.push(thePins[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const updatePin = (pinId, newBoard) => axios.patch(`${baseUrl}/pins/${pinId}.json`, { boardId: newBoard });

export default {
  getPins,
  getPinsByBoardId,
  deletePin,
  addPin,
  updatePin,
};
