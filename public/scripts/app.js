// $(document).ready(function () {
//   console.log('I am running from app.js')
//   $(() => {
//     $.ajax({
//       method: "GET",
//       url: "/api/users"
//     }).done((users) => {console.log('After data is being fetched')
//       for(user of users) {
//         $("<div>").text(user.name).appendTo($("body"));
//       }
//     });;
//   });

// });

$(document).ready(() =>{

  const createMenuItem = function (dataObj) {
    const menuItem = 
    `
      <div class="container" style="display: flex; margin: auto;">
      <div class="card">
        <img class="card-img-top" src="${dataObj.image_url}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">"${dataObj.name}"</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    `
    return menuItem;
  }

  const renderMenuItems = function (dataArr) {
    let menuContainer = $(`.container`);
    menuContainer.empty();
    dataArr.forEach(dataObj => {
      const menuItem = createMenuItem(dataObj);
      menuContainer.append(menuItem)
    });
  }

  const loadMenuItems = function () {
    const get_url = `/menu`;
    const request_method = `GET`;
    $.ajax({
      url: get_url,
      method: request_method
    })
    .done((result) => {
      const data = result.data;
      renderMenuItems(data);
      console.log(data)
    })
    .catch(e => console.error(e))
  }
          
  loadMenuItems();

})