var database = firebase.database();
var USER_ID = window.location.search.match(/\?userId=(.*)/)[1];


$(document).ready(function() {
  database.ref("users/" + USER_ID).once("value")
  .then(function(snapshot) {
    var userInfo = snapshot.val();
    $(".user-name").text(userInfo.name)
  })

  database.ref("users").once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createUsers(childData.name, childKey);
    });
  })

  database.ref('posts/' + USER_ID).once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      createPost(childData.text, childKey);
    });
  });

  $(".button-post").click(function(event) {
    event.preventDefault();

    var text = $(".input-post").val();
    $(".input-post").val("");

    var newPostInDB = database.ref('posts/' + USER_ID).push({
      text: text
    });

    createPost(text, newPostInDB.key);

  })
});

function createPost(text, key) {
  $(".post-place").append(`<li><span data-text-id="${key}" >${text}</span><button data-edit-id="${key}" >Editar</button><button data-delete-id="${key}" >Excluir</button></li>`);

  $(`button[data-delete-id=${key}]`).click(function() {
    $(this).parent().remove();
    database.ref('posts/'+ USER_ID + "/" + key).remove();
  });

  $(`button[data-edit-id=${key}]`).click(function() {
    var newText = prompt(`Edite aqui: ${text}`);
    $(`span[data-text-id=${key}]`).text(newText);
    database.ref(`posts/${USER_ID}/${key}`).update({
      text: newText
    })

  });

}

function createUsers(name, key) {
  if (key !== USER_ID) {
    $(".users-list").append(`
      <li>
        <span>${name}</span>
        <button data-user-id="${key}">seguir</button>
      </li>
    `);
  }

  $(`button[data-user-id=${key}]`).click(function () {
    database.ref('friendship/' + USER_ID).push({
      friendId: key
    });
  })

}
