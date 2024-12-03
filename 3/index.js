import { readFile } from "../helpers"

const input = await readFile("./input.txt");

/* PART 1 */
/*
const re = /mul\([^)]{0,7}\)/g;
const matches = input.match(re);

let result = 0;
for (let i = 0; i < matches.length; i++) {
    let temp = matches[i].split(',')[1];
    if (temp !== undefined) {
        let a = Number(matches[i].split(',')[0].substring(4));
        let b = Number(temp.substring(0, temp.length - 1));
        if (!isNaN(a) && !isNaN(b)) {
            result += a * b;
        }
    }
}
console.log(result);
*/

/* PART 2 */
const matches = [];
let includeMul = true;
let result = 0;
for (let i = 0; i < input.length - 2; i++) {
    const window = input.substring(i, i+3);
    switch (window) {
        case "mul":
            if (input[i+3] === '(') {
                const re = /mul\([^)]{0,7}\)/g;
                const mul = input.substring(i, i+12).match(re);
                if (mul && includeMul) {
                    let temp = mul[0].split(',')[1];
                    if (temp !== undefined) {
                        let a = Number(mul[0].split(',')[0].substring(4));
                        let b = Number(temp.substring(0, temp.length - 1));
                        if (!isNaN(a) && !isNaN(b)) {
                            result += a * b;
                        }
                    }
                } 
            }
        break;

        case "do(":
            if(input[i+3]=== ')') {
                includeMul = true;
            }
        break;
        
        case "don":
            if (input.substring(i+3, i+7) === "'t()") {
                includeMul = false;
            }
        break;
    }
}

console.log(result);