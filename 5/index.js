import { readFile } from "../helpers"

const text = await readFile("./input.txt");

const test = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
const input = text.split('\n');

// CREATE RULE DICTIONARY
const rules = {};
for (let i = 0; i < input.length; i++) {
    if (input[i] === "") {
        break;
    }

    const numbers = input[i].split('|').map((a) => Number(a));
    if (!rules[numbers[0]]) {
        rules[numbers[0]] = { before: [], after: [] };
        rules[numbers[0]].after.push(numbers[1]);
    } else {
        rules[numbers[0]].after.push(numbers[1]);
    }

    if (!rules[numbers[1]]) {
        rules[numbers[1]] = { before: [], after: [] };
        rules[numbers[1]].before.push(numbers[0]);
    } else {
        rules[numbers[1]].before.push(numbers[0]);
    }
}

// PART 1
/*
const start = input.indexOf("") + 1;
let result = 0;
for (let i = start; i < input.length; i++) {
    const numbers = input[i].split(',');
    let isOkay = true;

    for (let j = 0; j < numbers.length; j++) {
        const rule = rules[numbers[j]];

        for (let k = j + 1; k < numbers.length; k++) {
            if (rule.before.filter((n) => n === Number(numbers[k])).length !== 0) {
                isOkay = false;
            }
        }
    }
    if (isOkay) {
        result += Number(numbers[Math.floor(numbers.length / 2)]);
    }
}
*/

// PART 2
const start = input.indexOf("") + 1;
let result = 0;
let orderedRules = [];
Object.keys(rules).forEach((key) => orderedRules.push({key: key, before: rules[key].before}));
orderedRules = orderedRules.sort((a, b) => {
    if (a.before.length > b.before.length) {
        return 1;
    } else {
        return -1;
    }
});
for (let i = start; i < input.length; i++) {
    const numbers = input[i].split(',');
    let isOkay = true;

    for (let j = 0; j < numbers.length; j++) {
        const rule = rules[numbers[j]];

        for (let k = j + 1; k < numbers.length; k++) {
            if (rule.before.filter((n) => n === Number(numbers[k])).length !== 0) {
                isOkay = false;
            }
        }
    }
    if (!isOkay) {
        const reordered = [];
        for (let i = 0; i < orderedRules.length; i++) {
            for (let k = 0; k < numbers.length; k++) {
                if (numbers[k] === orderedRules[i].key) {
                    reordered.push(numbers[k]);
                }
            }
        }

        result += Number(reordered[Math.floor(reordered.length / 2)]);
    }
}

console.log(result);