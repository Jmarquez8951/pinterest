const events = (boardId, newUrl) => {
  console.error('', newUrl);
};

const newObject = () => {
  const boardId = $('#new-pin').attr('class').toString().split(' ')[2];
  console.error(boardId);
  $('#newObjectModalLabel').html('<h2>New Pin</h2>');
  $('#newObjectBody').html('<div class="form-group"><label for="inputImgURL">New Pin Url</label><input type="text" class="form-control" id="inputImgURL" placeholder="Enter Image Url"></div>');
  const newUrl = $('#inputImgURL').val();
  $('#save-btn').on('click', events(boardId, newUrl));
};

export default { newObject };
