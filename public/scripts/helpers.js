const getSumOfLocalStorage = () => {
  let sum = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    let storageKey = window.localStorage.key(i);
    let storageValue = window.localStorage.getItem(storageKey);
    sum += parseInt(storageValue);
  }
  return sum;
};

const updateCart = () => {
  $(".qtyVal").html(getSumOfLocalStorage());
};

const updateQuantity = () => {
  $(".item-num").prop("readonly", true);
  for (let i = 0; i < window.localStorage.length; i ++) {
    let storageKey = window.localStorage.key(i);
    let storageValue = window.localStorage.getItem(storageKey);
    $(`[data-value='${storageKey}']`).find('.item-num').val(storageValue);
    const itemQtyField = Number($(`[data-value='${storageKey}']`).find('.item-num').val());
    const addToCartBtn = $(`[data-value='${storageKey}']`).find('.add-to-cart');
    (itemQtyField) ? $(addToCartBtn).attr("disabled", false) : $(addToCartBtn).attr("disabled", true);
  }
};

const getPropertiesFromLocalStorage= () => {
  let properties = {};
  for (let i = 0; i < window.localStorage.length; i ++) {
    let storageKey = window.localStorage.key(i);
    let storageValue = window.localStorage.getItem(storageKey);
    properties[storageKey] = storageValue;
  }
  return properties;
};
