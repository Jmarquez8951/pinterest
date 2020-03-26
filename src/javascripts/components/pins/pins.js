import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import './pins.scss';

const showPins = (e) => {
  const boardId = e.target.closest('.card').id;
  pinsData.getPins()
    .then((response) => {
      const pins = response;
      let domString = '';
      domString += '<div class="ml-auto"><button id="back-btn" class="btn btn-dark">Back</button></div>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += '<div class="col-3 m-0 p-1">';
          domString += `<img src="${pin.imageUrl}" class="img-thumbnail pin">`;
          domString += '</div>';
        }
      });
      domString += '</div>';
      utils.printToDom('selected-board', domString);
      $('#boards').addClass('hide');
    })
    .catch((err) => console.error('Pins data didn\'t load right', err));

  console.error(boardId);
};

export default { showPins };
