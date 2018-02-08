$(window).resize(function () {
  var imgWidth = $(this).width();
  // Contenedor con height responsivo
  $('.receiver-cont').height(imgWidth / 2);
}).resize();


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
  $(ev.target.id).parent().remove();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
}