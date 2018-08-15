var config = {
  apiKey: "AIzaSyCCDmW8UvUpzHbPo7p-h0UcTcy8Nkm3SYk",
  authDomain: "snout-book-lab.firebaseapp.com",
  databaseURL: "https://snout-book-lab.firebaseio.com",
  projectId: "snout-book-lab",
  storageBucket: "snout-book-lab.appspot.com",
  messagingSenderId: "179038112155"
};

firebase.initializeApp(config);

$(document).ready(function(){
  $("#cadButton").click(function(event){
    event.preventDefault();

    var name = $("#nameCad").val();
    var email = $("#emailCad").val();
    var password = $("#passwordCad").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      window.location="index.html";
      name: name

    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });

  })
  $("#loginButton").click(function(event){
    event.preventDefault();


    var email = $("#passwordLogin").val();
    var password = $("#emailLogin").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
      window.location="index.html";

      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);

    });
  })
})
