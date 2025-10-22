const sketchPad = document.querySelector(".sketchpad");
const gridSizeBtn = document.getElementById("gridSize");
const modeButtons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clearBoard");

let currentMode = "default";
let mouseDown = false;
let gridSize = 16;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Crear cuadrícula dinámica
function createGrid(size) {
  sketchPad.innerHTML = "";
  sketchPad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  sketchPad.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.opacity = 0;
    sketchPad.appendChild(cell);
  }
}

// Obtener color aleatorio
const randomColor = () =>
  `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

// Cambiar color según modo
function colorCell(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (!e.target.classList.contains("cell")) return;

  if (currentMode === "default") {
    e.target.style.backgroundColor = "#4CAF50";
    e.target.style.opacity = 1;
  } else if (currentMode === "colorful") {
    e.target.style.backgroundColor = randomColor();
    e.target.style.opacity = 1;
  } else if (currentMode === "shade") {
    let opacity = parseFloat(e.target.dataset.opacity);
    opacity = Math.min(opacity + 0.1, 1);
    e.target.dataset.opacity = opacity;
    e.target.style.backgroundColor = "black";
    e.target.style.opacity = opacity;
  }
}

// Cambiar modo activo
function setMode(mode) {
  currentMode = mode;
  modeButtons.forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`${mode}Mode`).classList.add("active");
}

// Cambiar tamaño del grid
gridSizeBtn.addEventListener("click", () => {
  const input = parseInt(prompt("Enter grid size (1–100):"));
  if (input >= 1 && input <= 100) {
    gridSize = input;
    createGrid(gridSize);
  } else {
    alert("Please enter a valid number between 1 and 100.");
  }
});

// Botones de modo
document.getElementById("defaultMode").addEventListener("click", () => setMode("default"));
document.getElementById("colorfulMode").addEventListener("click", () => setMode("colorful"));
document.getElementById("shadeMode").addEventListener("click", () => setMode("shade"));

// Limpiar tablero
clearBtn.addEventListener("click", () => createGrid(gridSize));

// Eventos del tablero
sketchPad.addEventListener("mousedown", colorCell);
sketchPad.addEventListener("mouseover", colorCell);

// Inicializar
createGrid(gridSize);
