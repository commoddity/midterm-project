const getSumOfLocalStorage = () => {
  let sum = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    let storageValue = window.localStorage.getItem(window.localStorage.key(i));
    sum += parseInt(storageValue);
  }
  return sum;
};

const updateCart = () => {
  $(".qtyVal").html(getSumOfLocalStorage());
};

const updateQuantity = () => {
  for (let i = 0; i < window.localStorage.length; i ++) {
    let storageKey = window.localStorage.key(i);
    let storageValue = window.localStorage.getItem(storageKey);
    $(`[data-value='${storageKey}']`).find('.item-num').val(storageValue);
  }
};
