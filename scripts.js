/* Setup */

// populateIdeas();

/* Classes */

function IdeaBox (title, body) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  // this.id = Date.now();
  console.log(this);
}

/* Event listeners */

var cardNum = JSON.parse(localStorage.getItem("cardNum"));
var myIdeas = [];
var savedCards = JSON.parse(localStorage.getItem("cards")) || [];
for (var i = 0; i < savedCards.length; i++){
  addIdea(savedCards[i]);
  myIdeas.push(savedCards[i]);
}

function readyToSave (event) {
  event.preventDefault();
  var title = $('#title').val();
  var body = $('#body').val();
  readyToSubmit();
}

$('.save').on('click', readyToSave)

$('input').focus(function () {
  toggleDisabled(false);
})

$('#idea-area').on('click', '.delete', removeIdea)

$('#idea-area').on('click', '.vote-up', qualityUp)

$('#idea-area').on('click', '.vote-down', qualityDown)

/* Functions */

// function populateIdeas () {
//   for (var i = 0; i < savedCards.length; i++){
//     addIdea(savedCards[i]);
//     myIdeas.push(savedCards[i]);
//   }
// }

function localStorageSaver(x, y) {
  localStorage.setItem("cards", JSON.stringify(x));
}

function localStorageGetter(x) {
  JSON.parse(localStorage.getItem(x)) || [];
}

function findIdeaCardIndexByCardNum(cardId) {
  return myIdeas.map(function(idea){
    return idea.cardNum;
  }).indexOf(parseInt(cardId));
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
    clearInputs();
  }
}

function clearInputs () {
  $('#title').val('');
  $('#body').val('');
}

function addIdea(idea) {
  var ideaTitle = idea.title;
  var ideaBody = idea.body;
  var quality = idea.quality;
  $('#idea-area').prepend(`<div id="idea-card${idea.cardNum}" class="idea-card">
    <h4>${ideaTitle}</h4>
    <div class="card-button delete"></div>
    <p class="idea-body">${ideaBody}</p>
    <div class="card-button vote-up"></div>
    <div class="card-button vote-down"></div>
    <p class="quality">quality:<span id="quality-check" value="swill">${quality}</span></p>
    <hr />
  </div>`)
  $('#title').val('');
  $('#body').val('');
  $('h4, p.idea-body').attr('contenteditable', 'true');
}

function toggleDisabled (value) {
  $('.save').attr("disabled", value);
}

$('h4, p.idea-body').keydown(function(){

})

function removeIdea () {
  var ideaCard = $(this).parent();
  var removeId = ideaCard.attr('id').replace('idea-card', "");
  var removeIndex = findIdeaCardIndexByCardNum(removeId);
  myIdeas.splice(removeIndex, 1);
  localStorageSaver(myIdeas);
  // localStorage.setItem("cards", JSON.stringify(myIdeas));
  ideaCard.remove();
}



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
  localStorageSaver(myIdeas);
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

$('.search').on('keyup', function(e){
  var searchText = e.target.value.toUpperCase();
  var filteredArray = myIdeas.filter(function(idea) {
    return idea.title.toUpperCase().includes(searchText) || idea.body.toUpperCase().includes(searchText) || idea.quality.toUpperCase().includes(searchText);

  })
  $('#idea-area').empty()
  for (var i = 0; i < filteredArray.length; i++){
    addIdea(filteredArray[i]);
  }
})


$('#idea-area').on('keyup blur', 'h4', function(e){
  console.log(e.type);
  if( e.which === 13 || e.type === 'focusout'){
    //work on this if time alllows;
    // $(this).trigger('blur');
    var title = e.target.innerText
    // console.log(e.which);
    var ideaCard = $(this).parent()
    var updateId = ideaCard.attr('id').replace('idea-card', "");
    var updateIndex = findIdeaCardIndexByCardNum(updateId);
    // console.log(updateIndex)
    myIdeas[updateIndex].title = title;
    localStorage.setItem("cards", JSON.stringify(myIdeas));
  }

})

$('#idea-area').on('keyup blur', '.idea-body', function(e){
  console.log(e.type);
  if( e.which === 13 || e.type === 'focusout'){
    //work on this if time alllows;
    // $(this).trigger('blur');
    var body = e.target.innerText
    // console.log(e.which);
    var ideaCard = $(this).parent()
    var updateId = ideaCard.attr('id').replace('idea-card', "");
    var updateIndex = findIdeaCardIndexByCardNum(updateId);
    // console.log(updateIndex)
    myIdeas[updateIndex].body = body;
    localStorage.setItem("cards", JSON.stringify(myIdeas));
  }

})

// function bodyUpdate () {
//   var ideaCard = $(this).parent();
//   var updateId = ideaCard.attr('id').replace('idea-card', "");
//   var updateIndex = findIdeaCardIndexByCardNum(updateId);
// }
