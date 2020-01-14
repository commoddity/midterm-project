const { helpers } = ('./helpers.js')

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
              <button class="add-to-cart" disabled>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `
    return menuItem;
  };

  const renderMenuItems = (dataArr) => {
    const menuContainer = $(`.menu-container`);
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
      updateQuantity();
    })
    .catch(e => console.error(e));
  };

  // Click Handlers for Item Quantities
  $(document).on("click", ".add-to-cart", function() {
    const $this = $(this);
    const $input = $this.closest('div.quantity').find("input");
    const $id = $this.closest('div.quantity').data("value");
    const quantity = parseInt($input.val());
    JSON.stringify(localStorage.setItem($id, quantity));
    updateCart();
  });

  $(document).on('click', '.minus-btn', function(event) {
    event.preventDefault();
    const $this = $(this);
    const $input = $this.closest('div').find('input');
    let value = parseInt($input.val());
    const $addToCartBtn = $(this).siblings("button")[1];
    if (value >= 1) {
      $($addToCartBtn).text(`Update Cart`);
      value = value - 1;
      if (value === 0) {
        // $($addToCartBtn).attr('disabled', true);
        $($addToCartBtn).text(`Update Cart`);
      }
    }
  $input.val(value);
  });

  $(document).on('click', '.plus-btn', function(event) {
    event.preventDefault();
    const $this = $(this);
    const $input = $this.closest('div').find('input');
    let value = parseInt($input.val());
    const $addToCartBtn = $(this).siblings("button")[1];
    $($addToCartBtn).attr('disabled', false)
    if (value <= 100) {
      value = value + 1;
    } else if(value === 0){
      // $($addToCartBtn).attr('disabled', true);
      // value = 100;
    }
  $input.val(value);
  });

  loadMenuItems();
  updateCart();

});
