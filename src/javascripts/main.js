import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import authData from './helpers/data/authData';
import auth from './components/auth/auth';
import myNavbar from './components/myNavbar/myNavbar';

import '../styles/main.scss';
import 'bootstrap';
import home from './components/home/home';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
  home.loadHome();
  $('body').on('mouseenter', '.board-card', (e) => e.target.closest('.card').classList.add('bg-warning'));
  $('body').on('mouseleave', '.board-card', (e) => e.target.closest('.card').classList.remove('bg-warning'));
};

init();
