import { generateRandom } from "./getRandom.js";

export let matrix = [];

let bombImage = '<img src=".//images/bomb.png">';
let size = 16;
let timerId;
let elapsedTime;
let bombCounter = 40;

const appElem = document.getElementById('app')
class Box {
    constructor(isBomb, coordinates) {
      this.isBomb = isBomb;
      this.coordinates = coordinates;
    }
  
    setBoxValue(value) {
      this.value = value;
    }
  
    setBoxType() {
      if (this.isBomb) {
        this.setBoxValue("💣");
  
        return
      }
      const allNeighbors = getAllNeighbors(this.coordinates);
      let bombCount = 0;
  
      allNeighbors.forEach((neighbor) => {
        if (neighbor === 1 || neighbor.isBomb) {
          bombCount++;
        }
      });
  
      if (bombCount) {
        this.setBoxValue(bombCount);
      }
    }
  
    showBoxValue() {
      this.boxElem.innerHTML = this.value || "";
    }
  
    setFlag(isFlagged) {
      this.isFlagged = isFlagged;
      this.boxElem.innerHTML = isFlagged ? '<img src="../images/flag.png">' : "";
    }
  
    open() {
      this.isOpenned = true;
      this.boxElem.classList.remove("initial");
      this.showBoxValue();
    }
  
    onBoxClick(allowOpenNumber = false) {
      if (this.isFlagged) {
        this.setFlag(false);
        return;
      }
  
      if (!this.value && !this.isOpenned) {
        this.open();
        const allNeighbors = getAllNeighbors(this.coordinates);
        allNeighbors.forEach((neighbor) => {
          if (!neighbor.isOpenned) {
            neighbor.onBoxClick(true);
          }
        });
      } else if (
        (this.value && allowOpenNumber) ||
        typeof this.value === "number"
      ) {
        this.open();
      } else if (this.isBomb) {
        openAllBoxes();
      }
  
      this.showBoxValue();
    }
  
    createBoxOnArea() {
      const boxElem = document.createElement("div");
      boxElem.classList.add("box");
      boxElem.classList.add("initial");
  
      if (this.value) {
        boxElem.classList.add(`bomb-count-${this.value}`);
      }
  
      this.boxElem = boxElem;
      this.boxElem.addEventListener("click", () => this.onBoxClick());
      this.boxElem.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.setFlag(true);
        
      });
      appElem.appendChild(boxElem);
    }
  }
  
 function createBox(isBomb, coordinates) {
    const newBox = new Box(isBomb, coordinates);
  
    newBox.setBoxType();
    newBox.createBoxOnArea();
  
    return newBox;
  }
  

function addBombs(bombCount) {
    let currentBombCount = bombCount
    const matrixHeight = matrix.length
    const matrixWidth = matrix[0].length

    while (currentBombCount) {
        const x = generateRandom(0, matrixWidth - 1);
        const y = generateRandom(0, matrixHeight - 1);
        const matrixElem = matrix[x][y];

        if (!matrixElem) {
            matrix[x][y] = 1;
            currentBombCount--;
        }

    }
}
function getAllNeighbors (coordinates) {
    const {x, y} = coordinates
    const n_1 = matrix[y-1]?.[x]
    const n_2 = matrix[y-1]?.[x+1]
    const n_3 = matrix[y]?.[x+1]
    const n_4 = matrix[y+1]?.[x+1]
    const n_5 = matrix[y+1]?.[x]
    const n_6 = matrix[y+1]?.[x-1]
    const n_7 = matrix[y]?.[x-1]
    const n_8 = matrix[y-1]?.[x-1]

    return [
        n_1,
        n_2,
        n_3,
        n_4,
        n_5,
        n_6,
        n_7,
        n_8,
    ].filter(item => typeof item !== 'undefined')
}

export function openAllBoxes() {
    matrix.forEach((matrixLine) => {
      matrixLine.forEach((box) => {
        if (box.isBomb) {
          box.open();
        }
      });
    });
  }

function setTimer () {
    timerId = setInterval(function(){
      elapsedTime += 1;
      document.getElementById('timer').innerText = elapsedTime.toString().padStart(3, '0');
    }, 1000);
  };

function buildTable() {
    var topRow = `
        <tr>
        <td class="menu" colspan="${size}">
            <section id="status-bar">
              <div id="bomb-counter">000</div>
              <div id="reset"><img src="../images/smiley-face.png"></div>
              <div id="timer">000</div>
            </section>
        </td>
      </tr>
      `;
    appElem.innerHTML = topRow;

    var cells = Array.from(document.querySelectorAll('td:not(.menu)'));
    cells.forEach(function(cell, idx) {
      cell.setAttribute('data-row', Math.floor(idx / size));
      cell.setAttribute('data-col', idx % size);
    });
  }

  export function createMatrix (width = 16, height = 16, bombCount = 40) {

    buildTable();

    matrix = Array.from({length: height}, () => 
      Array.from({length: width }, () => 0)
    );
    addBombs(bombCount);
    elapsedTime = 0;
    matrix.forEach((matrixLine, y) => {
        matrixLine.forEach((matrixElem, x) => {
            const newBox = createBox(Boolean(matrixElem), { x, y });
            matrix[y][x] = newBox;
            
       });
    if (!timerId) setTimer();
    document.getElementById('bomb-counter').innerText = bombCounter.toString().padStart(3, '0');
    });

};  
