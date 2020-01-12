$(document).ready(function () {
  console.log('I am running from app.js')
  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((users) => {console.log('After data is being fetched')
      for(user of users) {
        $("<div>").text(user.name).appendTo($("body"));
      }
    });;
  });

});
