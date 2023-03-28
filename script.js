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
// falta que guarde los cambias en local storage y cambiar la eliminacion del ul por el
// li, actualmente borra la etiqueta ul impidiendo añadir futuras tareas bucle foreach
// a cada elemento li listaTareas.querySelectorAll("li")
console.log(listaTareas);
limpiarTodasTareas.addEventListener("click", () => {
  listaTareas.remove();
});

// Cargar tareas guardadas en el almacenamiento local

window.addEventListener("load", () => {
  const tareasGuardadas = localStorage.getItem("listaTareas");
  if (tareasGuardadas) {
    listaTareas.innerHTML = tareasGuardadas;
  }
});

// Guardar tareas en el almacenamiento local

window.addEventListener("unload", () => {
  localStorage.setItem("listaTareas", listaTareas.innerHTML);
});

///////////////////////////////

// window.onload = loadTasks;

// function loadTasks() {
//   // Obtenga las tareas de localStorage y conviértalas en una matriz
//   let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

//   // Recorrer las tareas y agregarlas a la lista
//   tasks.forEach((task) => {
//     const list = document.querySelector("ul");
//     const li = document.createElement("li");
//     li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
//       task.completed ? "checked" : ""
//     }>
//           <input type="text" value="${task.task}" class="task ${
//       task.completed ? "completed" : ""
//     }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
//           <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
//     list.insertBefore(li, list.children[0]);
//   });
// }
// function addTask() {
//   const task = document.querySelector("form input");
//   const list = document.querySelector("ul");
//   // regresa si la tarea está vacía
//   if (task.value === "") {
//     alert("Please add some task!");
//     return false;
//   }
//   // comprobar si la tarea ya existe
//   let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

//   // la tarea ya existe
//   tasks.forEach((todo) => {
//     if (todo.task === task.value) {
//       alert("Task already exist!");
//       task.value = "";
//       return;
//     }
//   });

//   // agregar tarea al almacenamiento local
//   localStorage.setItem(
//     "tasks",
//     JSON.stringify([
//       ...JSON.parse(localStorage.getItem("tasks") || "[]"),
//       { task: task.value, completed: false },
//     ])
//   );

//   // crear elemento de lista, agregar HTML interno y agregar a ul
//   const li = document.createElement("li");
//   li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
//       <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
//       <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
//   list.insertBefore(li, list.children[0]);
//   // borrar entrada
//   task.value = "";
// }

// // Agregar el detector de eventos de envío al formulario
// document.querySelector("form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   addTask();
// });

// // almacenar la tarea actual para realizar un seguimiento de los cambios
// var currentTask = null;

// // obtener la tarea actual
// function getCurrentTask(event) {
//   currentTask = event.value;
// }

// // edite la tarea y actualice el almacenamiento local
// function editTask(event) {
//   let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

//   // comprobar si la tarea está vacía
//   if (event.value === "") {
//     alert("Task is empty!");
//     event.value = currentTask;
//     return;
//   }

//   // la tarea ya existe
//   tasks.forEach((task) => {
//     if (task.task === event.value) {
//       alert("Task already exist!");
//       event.value = currentTask;
//       return;
//     }
//   });

//   // actualizar tarea
//   tasks.forEach((task) => {
//     if (task.task === currentTask) {
//       task.task = event.value;
//     }
//   });
//   // actualizar el almacenamiento local
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }
// function taskComplete(event) {
//   let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
//   tasks.forEach((task) => {
//     if (task.task === event.nextElementSibling.value) {
//       task.completed = !task.completed;
//     }
//   });
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   event.nextElementSibling.classList.toggle("completed");
// }
