import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = '<div class="text-center"><button id="google-auth" class="btn btn-danger m-3 col-2">Google Login</button></div>';
  utils.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
