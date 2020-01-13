$(document).ready(() =>{

  const createMenuItem = function (dataObj) {
    const menuItem =
    `
      <div class="menu-item">
        <div class="card">
          <img class="menu-item-image" src="${dataObj.image_url}" alt="Card image cap">
          <div class="item-body">
            <span class="item-text">${dataObj.name}</span>
            <span class="item-price">$${dataObj.price}.00</span>
            <div class="quantity">
              <button onclick="myFunction()"><img class="plus" src="/../img/plus.png"></button>
              <input class="quantity-field" type="text" name="name" value="1">
              <button onclick="myFunction()"><img class="minus" src="/../img/minus.png"></button>
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
    })
    .catch(e => console.error(e))
  };

  loadMenuItems();

});
