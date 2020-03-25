// import boardsData from '../../helpers/data/boardsData';


const showPins = (e) => {
  const boardId = e.target.closest('.card').id;
  // boardsData.getBoards()
  //   .then((response) => {
  //   })
  //   .catch((err) => console.error(err));
  console.error(boardId);
};

export default { showPins };
