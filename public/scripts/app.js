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
      <div class="menu-item">
        <div class="card">
          <img class="menu-item-image" src="${dataObj.image_url}" alt="Card image cap">
          <div class="item-body">
            <span class="item-text">${dataObj.name}</span>
            <span class="item-price">${dataObj.price}</span>
            <div class="quantity">
            <button class="plus-btn" type="button" name="button">
              <img src="plus.svg" alt="" />
            </button>
            <input type="text" name="name" value="1">
            <button class="minus-btn" type="button" name="button">
              <img src="minus.svg" alt="" />
            </button>
          </div>
          </div>
        </div>
      </div>
    `
    return menuItem;
  };

  const renderMenuItems = (dataArr) => {
    let menuContainer = $(`.menu-container`);
    menuContainer.empty();
    dataArr.forEach(dataObj => {
      const menuItem = createMenuItem(dataObj);
      menuContainer.append(menuItem)
    });
  };

  const loadMenuItems = () => {
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
  };

  loadMenuItems();

});
