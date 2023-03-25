window.onload = init;
function init() {
  botonEnvio = document.querySelector('[class="addTaskButton"]');
  nuevoItem = document.querySelector('[type="text"]');
  listaCompra = document.getElementById("listaCompra");
  killTasks = document.querySelector('[class="killTasks"]');

  botonEnvio.addEventListener("click", anadir);
  //killTasks.addEventListener("dbclick", eleminar);
  //No funciona el boton de eliminar todo en forma de reset, no se hacer que funcione
}

function anadir(e) {
  evento.preventDefault();
  evento = e || window.event;
  if (nuevoItem.value == "") {
  } else {
    var lista = document.createElement("li");
    lista.innerHTML = nuevoItem.value;
    lista.addEventListener("dblclick", eliminarLi);
    //si quieres eliminar item clicar doble encima de el. en la lista
    listaCompra.appendChild(lista);
    nuevoItem.value = "";
  }
}

function eliminarLi() {
  this.parentNode.removeChild(this);
}
