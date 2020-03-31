const buildBoards = (board) => {
  let domString = '';
  domString += '<div class="col-4 m-3">';
  domString += `<div id="${board.id}" class="card board-card">`;
  domString += '<div class="card-header d-flex flex-wrap">';
  domString += `<div class="align-self-center text-center col">${board.name}</div>`;
  domString += '<button class="btn btn-danger delete-board"><i class="fas fa-trash"></i></button>';
  domString += '</div>';
  domString += '<div class="card-body">';
  domString += `<p class="text-center">${board.description}</p>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildBoards };
