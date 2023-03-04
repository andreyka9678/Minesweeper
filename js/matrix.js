import { generateRandom } from "./getRandom";

export let matrix = [];

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

export function createMatrix (width = 16, height = 16, bombCount = 40) {
    matrix = Array.from({length: height}, () => 
      Array.from({length: width }, () => 0)
    );
    addBombs(bombCount);

    console.log(matrix);
}