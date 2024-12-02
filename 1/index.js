import { readFile } from "../helpers"

const text = await readFile("./input.txt");
const input = text.split('\n');

const listA = [];
const listB = [];

input.forEach((line) => {
    line = line.split('   ');
    listA.push(Number(line[0]));
    listB.push(Number(line[1]));
});

/* PART 2 */
const dict = {};

for (let i = 0; i < listA.length; i++) {
    if (!dict[listA[i]]) {
        let len = listB.filter((val) => val == listA[i]).length;
        if (len > 0) {
            dict[listA[i]] = len; 
        }
    }
}

let sum = 0;
Object.keys(dict).forEach((key) => {
    sum += Number(key) * dict[key]
})
console.log(sum);

/* PART 1
listA.sort();
listB.sort();

let sum = 0;
for (let i = 0; i < listA.length; i++) {
    if (listA[i] > listB[i]) {
        sum += listA[i] - listB[i];
    } else {
        sum += listB[i] - listA[i];
    }
}
console.log(sum);
*/