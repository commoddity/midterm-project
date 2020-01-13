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
              <button class="plus-btn" type="button" name="button">
              <img class="plus" src="../img/plus.png" alt="" />
              </button>
              <input type="text" name="name" value="0">
              <button class="minus-btn" type="button" name="button">
              <img class="minus" src="../img/minus.png" alt="" />
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
    })
    .catch(e => console.error(e))
  };

  const addToCart = () => {
    console.log("Add to cart function: ");
  }

  $(document).on("click", ".add-to-cart", () => {
    addToCart();
  });

  $(document).on('click', '.minus-btn', function(e) {
    e.preventDefault();
    let $this = $(this);
    let $input = $this.closest('div').find('input');
    let value = parseInt($input.val());
    if (value >= 1) {
        value = value - 1;
    } else {
        value = 0;
    }
  $input.val(value);
  });

  $(document).on('click', '.plus-btn', function(e) {
    e.preventDefault();
    let $this = $(this);
    let $input = $this.closest('div').find('input');
    let value = parseInt($input.val());
    if (value <= 100) {
      value = value + 1;
    } else {
      value = 100;
    }
  $input.val(value);
  });

  // const saveItem = () => {
  //   // var data = $("#data").val();
  //   // localStorage.setItem(name, data);
  // };

  loadMenuItems();

});
