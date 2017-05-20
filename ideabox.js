$('.save').on('click', readyToSave)

function readyToSave (event) {
  event.preventDefault();
  var title = $('#title').val();
  var body = $('#body').val();
  ideabox(title, body);
}

function ideabox(title, body) {
  $('#idea-area').prepend(`<div class="idea-card">
    <h4>${title}</h4>
    <div class="card-button delete"></div>
    <p>${body}</p>
    <div class="card-button vote-up"></div>
    <div class="card-button vote-down"></div>
    <hr />
  </div>;`)
  $('#title').val('');
  $('#body').val('');
  $('h4, p').attr('contenteditable', 'true');
}

$('#idea-area').on('click', '.delete', removeIdea)

function removeIdea () {
  $(this).parent().remove();
}
