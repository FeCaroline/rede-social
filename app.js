var database = firebase.database();
var USER_ID = window.location.search.match(/\?userId=(.*)/)[1];

var typePost = "public";
$(".public-post").click(function(event){
  typePost = "public";
});
$(".friends-post").click(function(event){
  typePost = "friends";
});

$(document).ready(function() {

  database.ref('/posts/' + USER_ID).once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    createPost(childData.text, childKey);
  });
});

  $(".button-post").click(function(event){
    event.preventDefault();

    var text = $(".input-post").val();
    if(text !== ""){
      $(".input-post").val("");
      var newPostDB = database.ref('posts/' + USER_ID).push({
        text: text,
        type: typePost
      });
      createPost(text, newPostDB.key);
    }
  });
});
function createPost(text, key){
  console.log(key);
  // $(".post-place").append('<li><span>${"text"}</span><button class="edit-post" data-edit-id="${key}"><i class="fas fa-edit"></i></button><button class="delete-post" data-delete-id="'"+key+"'"><i class="fas fa-trash-alt"></i></button></li>');
  // $("button[data-delete-id="'"+key+"'"]").click(function(){
  //   console.log(text);
  // })
  // $(".edit-post").click(function(){
  //   console.log("general");
  // })
}
