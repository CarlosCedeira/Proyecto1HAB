// Cargar tareas guardadas en el almacenamiento local

window.addEventListener("load", () => {
  const tareasGuardadas = localStorage.getItem("listaTareas");
  if (tareasGuardadas) {
    listaTareas.innerHTML = tareasGuardadas;
  }
});
// Obtener elementos del DOM
const form = document.querySelector("form");
const tareaInput = document.getElementById("tarea");
const prioridadInput = document.getElementById("prioridad");
const listaTareas = document.getElementById("listaTareas");
const limpiarTareasBtn = document.getElementById("limpiarTareasHechas");
const limpiarTodasTareas = document.getElementById("limpiarTareas");

// Agregar evento al formulario

form.addEventListener("submit", (evento) => {
  // Evitar que se recargue la página al enviar el formulario

  evento.preventDefault();

  // Crear elementos de la tarea

  const tareaTexto = tareaInput.value;
  const prioridad = prioridadInput.value;
  const tareaHecha = false;
  const fecha = new Date().toLocaleDateString();

  if (tareaTexto === "") {
    alert("introduce algún valor");
    return;
  }

  // Crear elemento de la tarea y agregarlo a la lista

  const nuevaTarea = document.createElement("li");
  nuevaTarea.innerHTML = `
        <input type="checkbox">
        Prioridad:
        ${prioridad} / Fecha: ${fecha}
        ${tareaTexto}
        `;
  listaTareas.appendChild(nuevaTarea);

  // Limpiar formulario despues de cada dato introducido

  tareaInput.value = "";
  prioridadInput.value = "normal";
});

// Tachado a la lista de tareas

listaTareas.addEventListener("change", (evento) => {
  const tareaCheckbox = evento.target.parentElement;
  if (tareaCheckbox.firstElementChild.checked) {
    tareaCheckbox.style.textDecoration = "line-through";
  } else {
    tareaCheckbox.style.textDecoration = "none";
  }
});
// Limpiar tareas hechas

limpiarTareasBtn.addEventListener("click", () => {
  const tareasHechas = listaTareas.querySelectorAll("input:checked");
  tareasHechas.forEach((tareaHecha) => {
    tareaHecha.parentElement.remove();
  });
});

// Limpiar todas las tareas

limpiarTodasTareas.addEventListener("click", () => {
  // Eliminar todas las tareas del ul

  const elementosLi = listaTareas.getElementsByTagName("li");
  console.log(elementosLi);
  while (elementosLi.length >= 0) {
    listaTareas.removeChild(elementosLi[0]);
  }
});

// y cambiar la eliminacion del ul por el
// li, actualmente borra la etiqueta ul impidiendo añadir futuras tareas bucle foreach
// a cada elemento li listaTareas.querySelectorAll("li")
console.log(listaTareas);
limpiarTodasTareas.addEventListener("click", () => {
  listaTareas.remove();
});

// Guardar tareas en el almacenamiento local

window.addEventListener("unload", () => {
  localStorage.setItem("listaTareas", listaTareas.innerHTML);
});
