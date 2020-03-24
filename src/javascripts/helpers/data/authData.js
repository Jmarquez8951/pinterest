import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutBtn = $('#navbar-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutBtn.removeClass('hide');
    } else {
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutBtn.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
