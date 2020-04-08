
const newObject = () => {
  const currentBoardId = $('#new-pin').attr('class').toString().split(' ')[2];
  const newPin = {
    imageUrl: $('#inputImgURL').val(),
    boardId: currentBoardId,
  };
  console.error('newPin', newPin);
};

const events = () => {
  $('#newObjectModalLabel').html('<h2>New Pin</h2>');
  $('#newObjectBody').html('<div class="form-group"><label for="inputImgURL">New Pin Url</label><input type="text" class="form-control" id="inputImgURL" placeholder="Enter Image Url"></div>');
  $('#save-btn').on('click', newObject);
};

export default { newObject, events };
