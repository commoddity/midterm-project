$(document).ready(() =>{

// Menu Creation Functions
  const createMenuItem = function (dataObj) {
    const menuItem =
    `
      <div class="menu-item">
        <div class="card">
          <img class="menu-item-image" src="${dataObj.image_url}" alt="Card image cap">
          <div class="item-body">
            <span class="item-text">${dataObj.name}</span>
            <span class="item-price">$${dataObj.price}.00</span>
            <div class="quantity" data-value="${dataObj.id}">
              <button class="plus-btn" type="button" name="button">
              <img class="plus" src="../img/plus.png" alt="" />
              </button>
              <input class="item-num" type="text" name="name" value="0">
              <button class="minus-btn" type="button" name="button">
              <img class="minus" src="../img/minus.png" alt="" />
              </button>
              <button class="add-to-cart">Add to Cart</button>
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
    .catch(e => console.error(e));
  };

  // Click Handlers for Item Quantities
  $(document).on("click", ".add-to-cart", function() {
    let $this = $(this);
    let $input = $this.closest('div.quantity').find("input");
    let $id = $this.closest('div.quantity').data("value");
    let quantity = parseInt($input.val());
    console.log("id: ", $id);
    console.log("quantity: ", quantity);
    localStorage.setItem($id, quantity);
  });

  $(document).on('click', '.minus-btn', function(event) {
    event.preventDefault();
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

  $(document).on('click', '.plus-btn', function(event) {
    event.preventDefault();
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

  loadMenuItems();

});
