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

  });
})
$(document).ready(function(event){
  $("#loginButton").click(function(event){
    event.preventDefault();


    var email = $("#emailLogin").val();
    var password = $("#passwordLogin").val();


    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response){
      var userId=response.user.uid;

      window.location="index.html?userId=" + userId;
    })
    
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);

    });
  });
})
