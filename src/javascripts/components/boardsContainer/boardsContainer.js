import boardsData from '../../helpers/data/boardsData';
import boardsComponent from '../boards/boards';
import utils from '../../helpers/utils';
import pinsComponent from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';

const removeBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  boardsData.deleteBoard(boardId)
    .then(() => {
      pinsData.getPinsByBoardId(boardId)
        .then((response) => {
          const pins = response;
          pins.forEach((pin) => {
            const pinId = pin.id;
            pinsData.deletePin(pinId)
              .then(() => {
                // eslint-disable-next-line no-use-before-define
                buildBoardContainer();
              });
          });
        });
    })
    .catch((err) => console.error('Error removing board.', err));
};

const selectedBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  pinsComponent.showPins(boardId);
};

const buildBoardContainer = () => {
  boardsData.getUserBoardsByUid()
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="text-center">Boards</h2>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardsComponent.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.board-card', selectedBoard);
      $('body').on('click', '.delete-board', removeBoard);
    })
    .catch((err) => console.error(err));
};

export default { buildBoardContainer };
