var database = firebase.database();


$(document).ready(function(event){
  $(".cadButton").click(function(event){
    event.preventDefault();

    var name = $("#nameCad").val();
    var email = $("#emailCad").val();
    var password = $("#passwordCad").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response){
      var userId=response.user.uid;

      database.ref("users/" + userId).set({
        name: name,
        email: email
      });

      window.location="index.html?userId=" + userId;



    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });

  })
  // $("#loginButton").click(function(event){
  //   event.preventDefault();
  //
  //
  //   var email = $("#passwordLogin").val();
  //   var password = $("#emailLogin").val();

  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //   .then(function(){
  //     window.location="index.html";
  //
  //     .catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     alert(errorMessage);
  //
  //   });
});
