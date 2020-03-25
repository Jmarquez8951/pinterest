import boardsData from '../../helpers/data/boardsData';
import boardsComponent from '../boards/boards';
import utils from '../../helpers/utils';

const buildBoardContainer = () => {
  boardsData.getBoards()
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="text-center">Boards</h2>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardsComponent.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error(err));
};

export default { buildBoardContainer };
