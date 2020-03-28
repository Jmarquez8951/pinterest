import boardsData from '../../helpers/data/boardsData';
import boardsComponent from '../boards/boards';
import pins from '../pins/pins';
import utils from '../../helpers/utils';

const buildBoardContainer = () => {
  boardsData.getUserBoardsByUid()
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="text-center">Boards</h2>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardsComponent.buildBoards(board);
      });
      domString += '<button id="test">Test</button>';
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('body').on('click', '.board-card', pins.showPins);
    })
    .catch((err) => console.error(err));
};

export default { buildBoardContainer };
