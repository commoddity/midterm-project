$(document).ready(() =>{

  function saveItem() {
    var name = $("#name").val();
    var data = $("#data").val();
    localStorage.setItem(name, data);
  };
});
