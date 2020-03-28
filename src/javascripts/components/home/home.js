import utils from '../../helpers/utils';

const loadHome = () => {
  const domString = '<div class="text-center"><h1>PINTEREST HOME PAGE</h1></div>';
  utils.printToDom('home', domString);
};

export default { loadHome };
