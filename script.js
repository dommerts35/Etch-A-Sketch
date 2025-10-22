function createGrid(n = 16) {
  for (let i = 0; i < n; i++) {
    let rowdiv = document.createElement("div");
    rowdiv.classList.add("rowdiv")
    sketchPad.appendChild(rowdiv);
    for (let j = 0; j < n; j++) {
      let cellBlock = document.createElement("div");
      cellBlock.classList.add("cell");
      rowdiv.appendChild(cellBlock);
    }
  }
}

let sketchPad = document.querySelector(".sketchpad");
let gridSizeButton = document.querySelector(".gridSize")
createGrid();
gridSizeButton.addEventListener('click', e => {
  let num = parseInt(prompt("Enter number(0 to 100) for number x number grid"));
  if (num > -1 && num < 101) {
    while (sketchPad.hasChildNodes()) {
      sketchPad.removeChild(sketchPad.lastChild);
    }
    createGrid(num);
  }
  else {
    alert("Dude it should be a number between 0 to 100");
  }
});


function changeBackground(e) {

  if (e.target.className === "cell") {
    e.target.style.backgroundColor = "green";
  }
}

function random() {
  return Math.floor(Math.random() * 256);
}

let defaultButton = document.querySelector(".defaultMode");
defaultButton.addEventListener("click", () => {
  changeBackground = function (e) {

    if (e.target.className === "cell") {
      e.target.style.backgroundColor = "green";
    }
  }
});


let colorfulButton = document.querySelector(".colorfulMode");
colorfulButton.addEventListener("click", () => {
  changeBackground = function (e) {
    if (e.target.className === "cell") {
      let red = random();
      let green = random();
      let blue = random();

      e.target.style.backgroundColor = `rgb(${red} ${green} ${blue})`;
    }
  }
});


let shadeModeButton = document.querySelector(".shadeMode");
shadeModeButton.addEventListener("click", () => {
  changeBackground = function (e) {
    if (e.target.className = "cell") {
      e.target.style.backgroundColor = "black";
      if (e.target.opacity === undefined) {
        e.target.opacity = 0.1;
      }
      e.target.style.opacity = e.target.opacity;
      e.target.opacity += 0.1;
    }
  }
});


sketchPad.addEventListener("mousedown", (e) => {
  changeBackground(e);
  sketchPad.addEventListener("mouseover", changeBackground);
  sketchPad.addEventListener("mouseup", () => {
    sketchPad.removeEventListener("mouseover", changeBackground);
    sketchPad.removeEventListener("mouseup", changeBackground);
  });
});
