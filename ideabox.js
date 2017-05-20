$('.save').on('click', readyToSave)

var cardCounter = 0;

function readyToSave (event) {
  event.preventDefault();
  cardCounter++;
  var title = $('#title').val();
  var body = $('#body').val();
  ideabox(title, body);
}

function ideabox(title, body,) {
  $('#idea-area').prepend(`<div class="idea-card">
    <h4>${title}</h4>
    <div class="card-button delete"></div>
    <p>${body}</p>
    <div class="card-button vote-up"></div>
    <div class="card-button vote-down"></div>
    <p class="quality">quality:<span id="quality-check" value="swill">${voteTotal[0]}</span></p>
    <hr />
  </div>`)
  $('#title').val('');
  $('#body').val('');
  $('h4, p').attr('contenteditable', 'true');
}

$('#idea-area').on('click', '.delete', removeIdea)

function removeIdea () {
  $(this).parent().remove();
}

var voteTotal = [' swill', ' plausible', ' genius'];
var i = 0;

$('#idea-area').on('click', '.vote-up', function() {
  this.i = i;
  i++;
  $(this).parent().find('#quality-check').text(voteTotal[i]);
})
