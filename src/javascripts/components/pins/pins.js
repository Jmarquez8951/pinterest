import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';

const removePin = (e) => {
  const pinId = e.target.closest('.card').id;
  const boardId = e.target.closest('.board-id').id;
  pinsData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      showPins(boardId);
    })
    .catch((err) => console.error('Could not remove pin', err));
};

const showBoard = () => {
  $('#boards').removeClass('hide');
  $('#selected-board').addClass('hide');
};

const pinEvents = () => {
  $('#boards').addClass('hide');
  $('#back-btn').on('click', showBoard);
};

const showPins = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((response) => {
      const pins = response;
      let domString = '';
      domString += '<div class="p-3"><button id="back-btn" class="btn btn-dark">Back</button></div>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      pins.forEach((pin) => {
        domString += `<div class="card col-4 m-3 p-1" id="${pin.id}">`;
        domString += `<div class="board-id" id="${pin.boardId}">`;
        domString += `<img src="${pin.imageUrl}" class="img-thumbnail bg-dark pin">`;
        domString += '<div class="row m-1"><button class="btn btn-danger col delete-pin"><i class="fas fa-trash"></i></button></div>';
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('selected-board', domString);
      $('body').on('click', '.delete-pin', removePin);
      $('#selected-board').removeClass('hide');
      pinEvents();
    })
    .catch((err) => console.error('Pins data didn\'t load right', err));
};

export default { showPins };
