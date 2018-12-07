/*
 * Name: Patrick J. Wurth
 * Email: wurthp@oregonstate.edu
 */
function insertNewTopic() {
  var topic = document.getElementById('input-author-titel').value.trim();
  var author = document.getElementById('input-author-txt').value.trim();
  var text = document.getElementById('input-post-txt').value.trim();
  var ran = "" + Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000 + "";

  if (!topic || !author || !text) {
    alert("You must fill in all of the fields!");
  } else {

    var postRequest = new XMLHttpRequest();
    postRequest.open('POST', '/newTopic');

    var requestBody = JSON.stringify({
      random: ran,
      titel: topic,
      author: author,
      date: gettime(),
      text: text
    });    
    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);

    var newTopicContext = {
      id:ran,
      titel: topic,
      author: author,
      date: gettime(),
      text: text
    };

    var newTopicHTML = Handlebars.templates.newTopic(newTopicContext);
    var topicContainer = document.getElementById('posts');
    topicContainer.insertAdjacentHTML('beforeend',newTopicHTML);

  };
}
function insertNewPost() {
  var path = window.location.pathname;
  var pathParts = path.split('/');
  var urlid = pathParts[2].toString();

  var author = document.getElementById('input-author-txt').value.trim();
  var text = document.getElementById('input-post-txt').value.trim();
  var creator = "";
  if(document.getElementById('creator').innerHTML == "by " + author){
    creator = "1";
  }
  
  if (!author || !text) {
    alert("You must fill in all of the fields!");
  } else {

    var postRequest = new XMLHttpRequest();
    postRequest.open('POST', '/newPost');

    var requestBody = JSON.stringify({
      urlid: urlid,
      author: author,
      creator: creator,
      date: gettime(),
      text: text  
    }); 

    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);

    var newPostContext = {
      pauthor: author,
      creator:creator,
      date: gettime(),
      text: text
    };

    if(creator == "1"){
      var newPostHTML = Handlebars.templates.newauthor(newPostContext);
    }else{
      var newPostHTML = Handlebars.templates.newPost(newPostContext);
    }
    
    var postContainer = document.getElementById('posts');
    postContainer.insertAdjacentHTML('beforeend',newPostHTML);
  }
}

function handlebuttontopic() {  
  
  insertNewTopic();

  document.getElementById('input-author-txt').value = "";
  document.getElementById('input-post-txt').value = "";
  document.getElementById('input-author-titel').value = "";
}

function handlebuttonpost() {

  insertNewPost();

  document.getElementById('input-author-txt').value = "";
  document.getElementById('input-post-txt').value = "";
}

function gettime() {    
  var currentdate = new Date(); 
  var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate() + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  return datetime;
}


window.addEventListener('DOMContentLoaded', function () {
  var topicButton = document.getElementById('open-window-topic');
  if (topicButton) {
    topicButton.addEventListener('click', handlebuttontopic);
  }
  var postButton = document.getElementById('open-window-post');
  if (postButton) {
    postButton.addEventListener('click', handlebuttonpost);
  }
});