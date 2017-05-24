var cardNum = JSON.parse(localStorage.getItem("cardNum"));
var myIdeas = [];
// // function addFromLocal(){
var savedCards = JSON.parse(localStorage.getItem("cards")) || [];
for (var i = 0; i < savedCards.length; i++){
  addIdea(savedCards[i]);
  myIdeas.push(savedCards[i]);
}
// //   addIdea(savedCards);
// // }
// //
// // addFromLocal();
// //
// // function storeIdeas () {
//
// }

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
    cardNum++
    toggleDisabled(false);
    idea.cardNum = cardNum;
    addIdea(idea);
    myIdeas.push(idea);
    console.log(myIdeas);
    localStorage.setItem("cards", JSON.stringify(myIdeas));
    localStorage.setItem("cardNum", JSON.stringify(cardNum));
    $('#title').val('');
    $('#body').val('');
  }
}

function IdeaBox (title, body) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  console.log(this);
}

function addIdea(idea) {
  var ideaTitle = idea.title;
  var ideaBody = idea.body;
  var quality = idea.quality;
  $('#idea-area').prepend(`<div id="idea-card${idea.cardNum}" class="idea-card">
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
  var ideaCard = $(this).parent();
  var removeId = ideaCard.attr('id').replace('idea-card', "");
  var removeIndex = findIdeaCardIndexByCardNum(removeId);
  myIdeas.splice(removeIndex, 1);
  localStorage.setItem("cards", JSON.stringify(myIdeas));
  ideaCard.remove();
}

/* Up or down vote */

$('#idea-area').on('click', '.vote-up', qualityUp)

$('#idea-area').on('click', '.vote-down', qualityDown)

function qualityUp () {
  var ideaCard = $(this).parent();
  var updateId = ideaCard.attr('id').replace('idea-card', "");
  var updateIndex = findIdeaCardIndexByCardNum(updateId);
  var qualityElement = $(this).parent().find('#quality-check');
  if (qualityElement.text() === "swill") {
    qualityElement.text("plausible");
    myIdeas[updateIndex].quality = "plausible";
  } else if (qualityElement.text() === "plausible") {
    qualityElement.text("genius");
    myIdeas[updateIndex].quality = "genius";
  }
  localStorage.setItem("cards", JSON.stringify(myIdeas));
}

function qualityDown() {
  var ideaCard = $(this).parent();
  var updateId = ideaCard.attr('id').replace('idea-card', "");
  var updateIndex = findIdeaCardIndexByCardNum(updateId);
  var qualityElement = $(this).parent().find('#quality-check');
  if (qualityElement.text() === "genius") {
    qualityElement.text("plausible");
    myIdeas[updateIndex].quality = "plausible";
  } else if (qualityElement.text() === "plausible") {
    qualityElement.text("swill");
    myIdeas[updateIndex].quality = "swill";
  }
  localStorage.setItem("cards", JSON.stringify(myIdeas));
}

function findIdeaCardIndexByCardNum(cardId) {
  var ideaCardIndex = -1;
  for (var i = 0; i < myIdeas.length; i++){
    if (myIdeas[i].cardNum == cardId){
      ideaCardIndex = i;
      break;
    }
  }
  return ideaCardIndex;
}
