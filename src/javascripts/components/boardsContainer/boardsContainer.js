import boardsData from '../../helpers/data/boardsData';
import boardsComponent from '../boards/boards';
import pins from '../pins/pins';
import utils from '../../helpers/utils';

const selectedBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  pins.showPins(boardId);
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
    })
    .catch((err) => console.error(err));
};

export default { buildBoardContainer };
