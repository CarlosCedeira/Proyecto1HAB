// Cargar tareas guardadas en el almacenamiento local

window.addEventListener("load", () => {
  const tareasGuardadas = localStorage.getItem("listaTareas");
  if (tareasGuardadas) {
    listaTareas.innerHTML = tareasGuardadas;

    // bucle que recorre los elemento de la la listaTareas comprobando si tienen line-through en caso afirmativo
    // activa el check

    let contador = 3;
    while (contador < listaTareas.childNodes.length) {
      if (
        listaTareas.childNodes[contador].style.textDecoration === "line-through"
      ) {
        listaTareas.childNodes[contador].firstElementChild.checked = true;
      }
      contador++;
    }
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

  if (tareaTexto.trim() === "") {
    alert("Introduce algún valor");
    return;
  }

  // Crear elemento de la tarea y agregarlo a la lista
  if (prioridadInput.value === "importante") {
    const nuevaTareaImportante = document.createElement("li");
    nuevaTareaImportante.innerHTML = `
        <input type="checkbox">
        ${tareaTexto}
        / Fecha: ${fecha}
        <hr>
        `;
    nuevaTareaImportante.style.fontWeight = "bold";
    nuevaTareaImportante.style.fontStyle = "italic";
    listaTareas.appendChild(nuevaTareaImportante);
  } else {
    const nuevaTarea = document.createElement("li");
    nuevaTarea.innerHTML = `
        <input type="checkbox">
        ${tareaTexto}
        / Fecha: ${fecha}
        <hr>
        `;
    listaTareas.appendChild(nuevaTarea);
  }

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

limpiarTodasTareas.addEventListener("click", (e) => {
  const elementosLi = listaTareas.getElementsByTagName("li");
  while (elementosLi.length >= 0) {
    listaTareas.removeChild(elementosLi[0]);
  }
});

// Limpiar cada elemento con el emoticono de basura

// listaTareas.addEventListener("click", (e) => {
//   const basura = document.querySelectorAll(".basura");
//   console.log(e.target);
//   if (e.target === basura[0]) {
//     console.log("hola");
//     e.target.remove();
//   }
//   //e.target.remove();
// });

// Guardar tareas en el almacenamiento local

window.addEventListener("unload", () => {
  localStorage.setItem("listaTareas", listaTareas.innerHTML);
});
