const { helpers } = "./helpers.js";

$(document).ready(() => {
  let globalData;

  // Menu Creation Functions
  const createMenuItem = function(menuItems) {
    const menuItem = `
      <div class="menu-item">
        <div class="menu-image-div">
          <img class="menu-item-image" src="${menuItems.image_url}" alt="Card image cap">
        </div>
        <div class="item-header">
          <div>
            <p class="item-name">${menuItems.name}</p>
          </div>
          <div>
            <p class="item-price">$${menuItems.price}.00</p>
          </div>
          <div class="quantity" data-value="${menuItems.id}">
            <button class="plus" type="button" name="button">
            </button>
            <input class="item-num" type="text" name="name" value="0">
            <button class="minus" type="button" name="button">
            </button>
            <button class="add-to-cart" disabled>
            </button>
            <button class="remove-from-cart" disabled>
            </button>
          </div>
        </div>
        <div class="item-blurb">
          <p>${menuItems.blurb}</p>
        </div>
      </div>
    `;
    return menuItem;
  };

  const createOrderItem = function(localKey) {
    const quantity = window.localStorage.getItem(localKey);
    const name = globalData.menuItems.find(e => e.id == localKey).name;
    const price = globalData.menuItems.find(e => e.id == localKey).price;
    const id = globalData.menuItems.find(e => e.id == localKey).id;
    const totalPrice = price * quantity;
    const orderItem = `
    <div class="each-item" data-value="${id}">
      <span class="quantity">Qty: ${quantity}</span>
      <span class="Item">${name}</span>
      <span class="price">Total: $${totalPrice}.00</span>
      <button class="delete-from-cart">
      </button>
    </div>
    `;
    return { orderItem, totalPrice };
  };

  const createRestaurantInfo = function(restaurants) {
    const restaurantInfo = `
    <div id="restaurant-info">
      <div id="restaurant-location">
        <h3>Our Location</h3>
        <p>${restaurants.street_address}</p>
        <p>${restaurants.city}</p>
        <p>${restaurants.postal_code}</p>
        <p>${restaurants.phone_number}</p>
        <p>${restaurants.email}</p>
      </div>
      <div id="restaurant-hours">
        <h3>Restaurant Hours</h3>
        <p>Mon - Fri: 9:00AM - 10:00PM</p>
        <p>Saturday:        10:00AM - 9:00PM</p>
        <p>Sunday:          8:00AM - 5:00PM</p>
      </div>
    </div>
    `;
    return restaurantInfo;
  };

  const renderMenuItems = (menuItems, restaurants) => {
    const domContainer = $(`.menu-container`);
    domContainer.empty();
    const restaurantInfo = createRestaurantInfo(restaurants);
    if ($(window).width() > 1024) {
      $(".restaurant-info-container").append(restaurantInfo);
    }
    menuItems.forEach(item => {
      const menuItem = createMenuItem(item);
      domContainer.append(menuItem);
    });
  };

  const renderOrderItems = locStor => {
    const domContainer = $(".order-items");
    domContainer.empty();
    let orderTotal = 0;
    for (let i = 0; i < locStor.length; i++) {
      const localKey = JSON.parse(locStor.key(i));
      const menuItem = createOrderItem(localKey);
      domContainer.append(menuItem.orderItem);
      orderTotal += menuItem.totalPrice;
    }
    $("#order-total").html(orderTotal);
  };

  // AJAX Calls
  const loadMenuItems = event => {
    const get_url = `/menu`;
    const request_method = `GET`;
    $.ajax({
      url: get_url,
      method: request_method
    })
      .done(result => {
        globalData = result;
        menuItems = globalData.menuItems;
        restaurants = globalData.restaurants[0];
        renderMenuItems(menuItems, restaurants);
        updateQuantity();
      })
      .catch(e => console.error(e));
  };

  const checkoutOrder = event => {
    event.preventDefault();
    const post_url = "/checkout";
    const request_method = "POST";
    const checkoutCart = getPropertiesFromLocalStorage();
    $.ajax({
      url: post_url,
      method: request_method,
      data: checkoutCart
    })
      .then(() => {
        window.location.assign("/checkout");
      })
      .catch(e => console.error(e));
  };

  // Click Handlers for Menu Items
  $(document).on("click", ".add-to-cart", function() {
    const $id = $(this)
      .closest("div.quantity")
      .data("value");
    const $input = $(this)
      .closest("div")
      .find("input");
    let $quantity = parseInt($input.val());
    $quantity === 0
      ? window.localStorage.removeItem($id)
      : JSON.stringify(localStorage.setItem($id, $quantity));
    updateCart();
    renderOrderItems(localStorage);
    $("#cart-background").effect("bounce", { times: 3 }, "slow");
  });

  $(document).on("click", ".remove-from-cart", function() {
    const $this = $(this);
    const $id = $(this)
      .closest("div.quantity")
      .data("value");
    const $input = $(this)
      .closest("div")
      .find("input");
    let $quantity = parseInt($input.val());
    const $addToCartBtn = $(this).siblings(".add-to-cart");
    window.localStorage.removeItem($id);
    updateCart();
    renderOrderItems(localStorage);
    $quantity = 0;
    $("#cart-background").effect("bounce", { times: 3 }, "fast");
    $($addToCartBtn).attr("disabled", true);
    $input.val($quantity);
    $this.attr("disabled", true);
  });

  $(document).on("click", ".minus", function(event) {
    const $input = $(this)
      .closest("div")
      .find("input");
    let $quantity = parseInt($input.val());
    const $removeFromCartBtn = $(this).siblings(".remove-from-cart");
    if ($quantity >= 1) {
      $quantity--;
      if ($quantity === 0) {
        $($removeFromCartBtn).attr("disabled", true);
      }
    }
    $input.val($quantity);
  });

  $(document).on("click", ".plus", function(event) {
    const $input = $(this)
      .closest("div")
      .find("input");
    let $quantity = parseInt($input.val());
    const $addToCartBtn = $(this).siblings(".add-to-cart");
    const $removeFromCartBtn = $(this).siblings(".remove-from-cart");
    $($addToCartBtn).attr("disabled", false);
    $($removeFromCartBtn).attr("disabled", false);
    if ($quantity <= 100) {
      $quantity++;
    }
    $input.val($quantity);
  });

  $(document).on("click", "#cart-background", function(event) {
    $(".order-container:hidden").animate({ width: "toggle" });
  });

  //Click Handlers for Order
  $(document).on("click", ".hide-cart", function(event) {
    $(".order-container").animate({ width: "toggle" });
  });

  $(window).on("unload", function() {
    window.localStorage.clear();
  });

  $(".empty-cart").on("click", function() {
    if (confirm("Are you sure?")) {
      window.localStorage.clear();
      $(".order-items").empty();
      $("#order-total").text("0");
      $("div.quantity")
        .find("input")
        .val("0");
      $(".add-to-cart").attr("disabled", true);
      $(".remove-from-cart").attr("disabled", true);
      $("#cart-background").effect("bounce", { times: 3 }, "fast");
      updateCart();
    } else {
      return false;
    }
  });

  $(document).on("click", ".delete-from-cart", function() {
    const $id = $(this)
      .closest("div.each-item")
      .data("value");
    const $input = $(`div.quantity[data-value='${$id}']`).find("input");
    const $addToCartBtn = $input.siblings(".add-to-cart");
    const $removeFromCartBtn = $input.siblings(".remove-from-cart");
    let $quantity = parseInt($input.val());
    window.localStorage.removeItem($id);
    $("#cart-background").effect("bounce", { times: 3 }, "fast");
    updateCart();
    renderOrderItems(localStorage);
    $quantity = 0;
    $input.val($quantity);
    $($addToCartBtn).attr("disabled", true);
    $($removeFromCartBtn).attr("disabled", true);
  });

  $(document).on("click", ".checkout", function(event) {
    checkoutOrder(event);
    $(".enter-phone-number-form:hidden").animate({ width: "toggle" });
  });

  $(".order-container").hide();
  loadMenuItems();
  updateCart();
});
