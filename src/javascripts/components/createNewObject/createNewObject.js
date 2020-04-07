const newObject = () => {
  console.error($('#new-pin').attr('class').toString().split(' ')[2]);
  $('#newObjectModalLabel').html('New header');
  $('#newObjectBody').html('Test');
};

export default { newObject };
