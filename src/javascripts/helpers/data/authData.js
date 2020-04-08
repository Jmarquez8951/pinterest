import firebase from 'firebase/app';
import 'firebase/auth';
import boardsContianer from '../../components/boardsContainer/boardsContainer';
import pins from '../../components/pins/pins';

const authDiv = $('#auth');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutBtn = $('#navbar-logout');
const selectedBoard = $('#selected-board');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutBtn.removeClass('hide');
      selectedBoard.addClass('hide');
      boardsContianer.buildBoardContainer();
      pins.newPinEvent();
    } else {
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutBtn.addClass('hide');
      selectedBoard.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
