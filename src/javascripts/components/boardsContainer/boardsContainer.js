import boardsData from '../../helpers/data/boardsData';
import boardsComponent from '../boards/boards';
import utils from '../../helpers/utils';
import pinsComponent from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';

const removeBoard = (e) => {
  const boardId = e.target.closest('.removed-board').id;
  boardsData.deleteBoard(boardId)
    .then(() => {
      pinsData.getPinsByBoardId(boardId)
        .then((response) => {
          const pins = response;
          pins.forEach((pin) => {
            const pinId = pin.id;
            pinsData.deletePin(pinId);
          });
        });
      // eslint-disable-next-line no-use-before-define
      buildBoardContainer();
    })
    .catch((err) => console.error('Error removing board.', err));
};

const createNewBoard = () => {
  const newBoard = {
    description: $('#inputDescription').val(),
    name: $('#inputBoardName').val(),
    uid: boardsData.getCurrentUser(),
  };
  boardsData.addBoard(newBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoardContainer();
      utils.printToDom('boards', '');
    })
    .catch((err) => console.error('Could not add board', err));
};

const newBoardEvent = () => {
  let domString = '';
  domString += '<div class="form-group">';
  domString += '<label for="inputBoardName">New Board Name</label>';
  domString += '<input type="text" class="form-control m-1" id="inputBoardName" placeholder="Enter Board Name">';
  domString += '<label for="inputDescription">Description</label>';
  domString += '<input type="text" class="form-control m-1" id="inputDescription" placeholder="Description">';
  domString += '</div>';
  $('#newObjectModalLabel').html('<h2>New Board</h2>');
  $('#newObjectBody').html(domString);
  domString = '';
  domString += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
  domString += '<button id="board-save-btn" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>';
  $('.modal-footer').html(domString);
};

const selectedBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  pinsComponent.showPins(boardId);
};

const events = () => {
  $('body').on('click', '#add-board', newBoardEvent);
  $('body').on('click', '.board-card', selectedBoard);
  $('body').on('click', '.delete-board', removeBoard);
  $('body').on('click', '#board-save-btn', createNewBoard);
};

const buildBoardContainer = () => {
  boardsData.getUserBoardsByUid()
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="text-center">Boards</h2>';
      domString += '<div class="d-flex justify-content-end">';
      domString += '<button id="add-board" class="btn btn-dark" data-toggle="modal" data-target="#newObjectModal"><i class="fas fa-plus"></i> Add Board</button>';
      domString += '</div>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardsComponent.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error(err));
};

export default { buildBoardContainer, events };
