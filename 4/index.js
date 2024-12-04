import { readFile } from "../helpers"

const text = await readFile("./input.txt");
const input = text.split('\n');


/* PART 1 */
const isXMAS = (word) => {
    return word === 'XMAS' || word === 'SAMX';
}

let count = 0;
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        // Horizontal
        const window = input[j].substring(i, i + 4);
        isXMAS(window) ? count += 1 : null;

        // Vertical
        if (i + 3 < input.length) {
            let verticalWindow = input[i][j] + input[i+1][j] + input[i+2][j] + input[i+3][j];
            isXMAS(verticalWindow) ? count += 1 : null;
        }

        // Diagonal
        if (j - 3 >= 0 && i + 3 < input.length) {
            let diagonalWindowLeft = input[i][j] + input[i+1][j-1] + input[i+2][j-2] + input[i+3][j-3];
            isXMAS(diagonalWindowLeft) ? count += 1 : null;
        } 

        if (j+3 < input.length && i + 3 < input.length) {
            let diagonalWindowRight = input[i][j] + input[i+1][j+1] + input[i+2][j+2] + input[i+3][j+3];
            isXMAS(diagonalWindowRight) ? count += 1 : null;
        }

    }
}
console.log(count);

/* PART 2 */
const isMAS = (word) => {
    return word === 'MAS' || word === 'SAM';
}

let mascount = 0;
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        // Diagonal
        if (j - 2 >= 0 && i + 2 < input.length) {
            let diagonalWindowLeft = input[i][j] + input[i+1][j-1] + input[i+2][j-2];
            if (isMAS(diagonalWindowLeft)) {
                if (i + 2 < input.length) {
                    let diagonalWindowRight = input[i][j - 2] + input[i + 1][j - 1] + input[i + 2][j];
                    if (isMAS(diagonalWindowRight)) {
                        mascount += 1;
                    }
                }
            }
        } 
    }
}
console.log(mascount);