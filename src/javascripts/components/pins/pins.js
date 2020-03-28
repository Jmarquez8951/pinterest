import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';

const showBoard = () => {
  $('#boards').removeClass('hide');
  $('#selected-board').addClass('hide');
};

const pinEvents = () => {
  $('#boards').addClass('hide');
  $('#back-btn').on('click', showBoard);
};

const showPins = (e) => {
  const boardId = e.target.closest('.card').id;
  pinsData.getPinsByBoardId(boardId)
    .then((response) => {
      const pins = response;
      let domString = '';
      domString += '<div class="p-3"><button id="back-btn" class="btn btn-dark">Back</button></div>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      pins.forEach((pin) => {
        domString += '<div class="card d-flex col-5 m-3 p-1">';
        domString += `<img src="${pin.imageUrl}" class="img-thumbnail bg-dark pin">`;
        domString += '<div class="row m-1"><button class="btn btn-danger col delete-pin"><i class="fas fa-trash delete-pin"></i></button></div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('selected-board', domString);
      $('#selected-board').removeClass('hide');
      pinEvents();
    })
    .catch((err) => console.error('Pins data didn\'t load right', err));
};

export default { showPins };
