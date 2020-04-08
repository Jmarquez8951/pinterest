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

const createNewPin = (e) => {
  e.preventDefault();
  const currentBoardId = $('#new-pin').attr('class').toString().split(' ')[2];
  const newPin = {
    imageUrl: $('#inputImgURL').val(),
    boardId: currentBoardId,
  };
  pinsData.addPin(newPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      showPins(currentBoardId);
      utils.printToDom('selected-board', '');
    })
    .catch((err) => console.error('Could not add pin', err));
};

const newPinEvent = () => {
  $('#newObjectModalLabel').html('<h2>New Pin</h2>');
  $('#newObjectBody').html('<div class="form-group"><label for="inputImgURL">New Pin Url</label><input type="text" class="form-control" id="inputImgURL" placeholder="Enter Image Url"></div>');
  let domString = '';
  domString += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
  domString += '<button id="save-btn" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>';
  $('.modal-footer').html(domString);
  $('#save-btn').on('click', createNewPin);
};

const showBoard = () => {
  $('#boards').removeClass('hide');
  $('#selected-board').addClass('hide');
};

const pinEvents = () => {
  $('#back-btn').on('click', showBoard);
  $('#new-pin').on('click', newPinEvent);
};

const showPins = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((response) => {
      const pins = response;
      let domString = '';
      domString += '<div class="d-flex justify-content-between"><div class="p-3"><button id="back-btn" class="btn btn-dark"><i class="fas fa-arrow-circle-left"></i> Back</button></div>';
      domString += '<div class="p-3 align-self-end">';
      domString += `<button type="button" id="new-pin" class="btn btn-primary ${boardId}" data-toggle="modal" data-target="#newObjectModal"><i class="fas fa-plus"></i> New Pin</button></div></div>`;
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
      $('#boards').addClass('hide');
      pinEvents();
    })
    .catch((err) => console.error('Pins data didn\'t load right', err));
};

export default { showPins, pinEvents, newPinEvent };
