var database = firebase.database();

$(document).ready(function(){
  $(".post-button".click(function(event){
    event.preventDefault();

    var text =  $(".post").val();
    $(".post").val("");
    $(".user-posts").html(<ul>${text}</ul>);

    database.ref('post/').push({
      text:text

    });
  })
});
