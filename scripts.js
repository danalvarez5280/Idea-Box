$('.save').on('click', readyToSave)

function readyToSave (event) {
  event.preventDefault();
  var title = $('#title').val();
  var body = $('#body').val();
  readyToSubmit();
}

function readyToSubmit () {
  var title = $('#title').val();
  var body = $('#body').val();
  var idea = new IdeaBox(title, body);
  if (title === "" || body === "") {
    toggleDisabled(true);
  }
  else {
    toggleDisabled(false);
    addIdea(idea);
    $('#title').val('');
    $('#body').val('');
  }
}

function IdeaBox (title, body) {
  this.title = title;
  this.body = body;
  this.quality = "swill"
  console.log(this);
}

function addIdea(idea) {
  var ideaTitle = idea.title;
  var ideaBody = idea.body;
  var quality = idea.quality
  $('#idea-area').prepend(`<div class="idea-card">
    <h4>${ideaTitle}</h4>
    <div class="card-button delete"></div>
    <p>${ideaBody}</p>
    <div class="card-button vote-up"></div>
    <div class="card-button vote-down"></div>
    <p class="quality">quality:<span id="quality-check" value="swill">${quality}</span></p>
    <hr />
  </div>`)
  $('#title').val('');
  $('#body').val('');
  $('h4, p').attr('contenteditable', 'true');
}

function toggleDisabled (value) {
  $('.save').attr("disabled", value);
}

$('input').focus(function () {
  toggleDisabled(false);
})

/*Delete button*/

$('#idea-area').on('click', '.delete', removeIdea)

function removeIdea () {
  $(this).parent().remove();
}

/* Up or down vote */

$('#idea-area').on('click', '.vote-up', qualityUp)

$('#idea-area').on('click', '.vote-down', qualityDown)

function qualityUp () {
  var qualityElement = $(this).parent().find('#quality-check');
  if (qualityElement.text() === "swill") {
    qualityElement.text("plausible");
  } else if (qualityElement.text() === "plausible") {
    qualityElement.text("genius");
  }
}

function qualityDown() {
  var qualityElement = $(this).parent().find('#quality-check');
  if (qualityElement.text() === "genius") {
    qualityElement.text("plausible");
  } else if (qualityElement.text() === "plausible") {
    qualityElement.text("swill");
  }
}
