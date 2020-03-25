const buildBoards = (board) => {
  let domString = '';
  domString += '<div class="col-4 m-3">';
  domString += `<div id="${board.id}" class="card board-card">`;
  domString += `<div class="card-header text-center">${board.name}</div>`;
  domString += '<div class="card-body">';
  domString += `<p class="text-center">${board.description}</p>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildBoards };
