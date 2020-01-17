const { helpers } = ('./helpers.js')

$(document).ready(() =>{

  let globalData;

// Menu Creation Functions
  const createMenuItem = function (data) {
    const menuItem = `
      <div class="menu-item">
        <div class="card">
          <img class="menu-item-image" src="${data.image_url}" alt="Card image cap">
          <div class="item-body">
            <span class="item-text">${data.name}</span>
            <span class="item-price">$${data.price}.00</span>
            <div class="quantity" data-value="${data.id}">
              <button class="plus-btn" type="button" name="button">
                <img class="plus" src="../img/plus.png" alt="" />
              </button>
              <input class="item-num" type="text" name="name" value="0">
              <button class="minus-btn" type="button" name="button">
                <img class="minus" src="../img/minus.png" alt="" />
              </button>
              <button class="add-to-cart btn-primary" disabled>Add to Cart</button>
              <button class="remove-from-cart btn-danger" disabled>Remove from Cart</button>
            </div>
          </div>
        </div>
      </div>
    `
    return menuItem;
  };

  const createOrderItem = function (localKey) {
    const quantity = window.localStorage.getItem(localKey);
    const name = globalData.find(e => e.id == localKey).name;
    const price = globalData.find(e => e.id == localKey).price;
    const id = globalData.find(e => e.id == localKey).id;
    const totalPrice = (price * quantity);
    const orderItem = `
    <div class="each-item" data-value="${id}">
      <span class="quantity">Qty: ${quantity}</span>
      <span class="Item">${name}</span>
      <span class="price">Total: $${totalPrice}.00</span>
      <button class="delete-from-cart">
        <img class="delete-button" src="../img/delete.png" alt="" />
      </button>
    </div>

    `
    return {orderItem, totalPrice}
  };

  const renderMenuItems = (data) => {
    const domContainer = $(`.menu-container`);
    domContainer.empty();
    data.forEach(item => {
      const menuItem = createMenuItem(item);
      domContainer.append(menuItem)
    });
  };

  const renderOrderItems = (locStor) => {
    const domContainer = $('.order-items');
    domContainer.empty();
    let orderTotal = 0;
    for (let i = 0; i < locStor.length; i++) {
      const localKey = JSON.parse(locStor.key(i));
      const menuItem = createOrderItem(localKey);
      domContainer.append(menuItem.orderItem)
      orderTotal += menuItem.totalPrice;
    }
    $('#order-total').html(orderTotal);
  };


// AJAX Calls
  const loadMenuItems = (event) => {
    const get_url = `/menu`;
    const request_method = `GET`;
    $.ajax({
      url: get_url,
      method: request_method
    })
    .done((result) => {
      globalData = result.data;
      renderMenuItems(globalData);
      updateQuantity();
    })
    .catch(e => console.error(e));
  };

  const checkoutOrder = (event) => {
    event.preventDefault();
    const post_url = '/checkout';
    const request_method = 'POST';
    const checkoutCart = getPropertiesFromLocalStorage();
    $.ajax({
      url: post_url,
      method: request_method,
      data: checkoutCart
    })
    .then(() => {
      window.location.assign('/checkout');
    })
    .catch(e => console.error(e));
  };


// Twilio AJAX Calls
  const sendSms = (event) => {
    const post_url = `/send`;
    const request_method = `POST`;
    $.ajax({
      url: post_url,
      method: request_method
    })
    .catch(e => console.error(e));
  };


// Click Handlers for Menu Items
  $(document).on("click", ".add-to-cart", function() {
    const $id = $(this).closest('div.quantity').data("value");
    const $input = $(this).closest('div').find('input');
    let $quantity = parseInt($input.val());
    $quantity === 0 ? window.localStorage.removeItem($id) : JSON.stringify(localStorage.setItem($id, $quantity));
    updateCart();
    renderOrderItems(localStorage);
    $('.order-container:hidden')
    .animate({width: 'toggle'});
  });

  $(document).on("click", ".remove-from-cart", function() {
    const $this = $(this);
    const $id = $(this).closest('div.quantity').data("value");
    const $input = $(this).closest('div').find('input');
    let $quantity = parseInt($input.val());
    const $addToCartBtn = $(this).siblings(".add-to-cart");
    window.localStorage.removeItem($id);
    updateCart();
    renderOrderItems(localStorage);
    $quantity = 0;
    $($addToCartBtn).text(`Add to Cart`);
    $($addToCartBtn).attr('disabled', true)
    $input.val($quantity);
    $this.attr('disabled', true);
  });

  $(document).on('click', '.minus-btn', function(event) {
    const $id = $(this).closest('div.quantity').data("value");
    const $input = $(this).closest('div').find('input');
    let $quantity = parseInt($input.val());
    const $addToCartBtn = $(this).siblings(".add-to-cart");
    const $removeFromCartBtn = $(this).siblings(".remove-from-cart");
    if ($quantity >= 1) {
      localStorage.getItem($id) && $($addToCartBtn).text(`Update Cart`);
      $quantity--;
      if ($quantity === 0) {
        localStorage.getItem($id) && $($addToCartBtn).text(`Update Cart`);
        $($removeFromCartBtn).attr('disabled', true)
      }
    }
  $input.val($quantity);
  });

  $(document).on('click', '.plus-btn', function(event) {
    const $id = $(this).closest('div.quantity').data("value");
    const $input = $(this).closest('div').find('input');
    let $quantity = parseInt($input.val());
    const $addToCartBtn = $(this).siblings(".add-to-cart");
    const $removeFromCartBtn = $(this).siblings(".remove-from-cart");
    $($addToCartBtn).attr('disabled', false)
    $($removeFromCartBtn).attr('disabled', false)
    localStorage.getItem($id) && $($addToCartBtn).text(`Update Cart`);
    if ($quantity <= 100) {
      $quantity++;
    }
  $input.val($quantity);
  });


//Click Handlers for Order
  $(document).on('click', '.hide-cart', function(event) {

    $('.order-container')
    .animate({width: 'toggle'});
  });

  $(window).on("unload", function() {
    window.localStorage.clear();
  });

  $(".empty-cart").on('click', function(){
    if (confirm("Are you sure?")) {
      window.localStorage.clear();
      $('.order-items').empty();
      $('#order-total').text('0');
      $('div.quantity').find('input').val('0');
      $('.add-to-cart').attr('disabled', true);
      $('.remove-from-cart').attr('disabled', true);
    } else {
      return false;
    };
  });

  $(document).on("click", ".delete-from-cart", function() {
    const $id = $(this).closest('div.each-item').data("value");
    const $input = $(`div.quantity[data-value='${$id}']`).find('input');
    const $addToCartBtn = $input.siblings('.add-to-cart');
    const $removeFromCartBtn = $input.siblings('.remove-from-cart');
    let $quantity = parseInt($input.val());
    window.localStorage.removeItem($id);
    updateCart();
    renderOrderItems(localStorage);
    $quantity = 0;
    $input.val($quantity);
    $($addToCartBtn).text(`Add to Cart`);
    $($addToCartBtn).attr('disabled', true)
    $($removeFromCartBtn).attr('disabled', true)
  });

  $(document).on('click', '.checkout', function(event) {
    checkoutOrder(event);
    $('.enter-phone-number-form:hidden')
    .animate({width: 'toggle'});
  });

  $('.order-container').hide();
  loadMenuItems();
  updateCart();

});
