import { readFile } from "../helpers";

const text = await readFile("./input.txt");
const reports = text.split('\n');

/* PART 2 
What I should do: Check only for error indexes instead of splicing every index.
*/
const isReportSafe = (levels) => {
    const descending = levels[0] > levels[1];

    let hasError = false;
    for (let i = 0; i < levels.length - 1; i++) {
        if (levels[i] === levels[i+1]) {
            hasError = true;
        }

        // isn't descending
        if (descending && levels[i] < levels[i+1]) {
            hasError = true;
        }

        // isn't ascending
        if (!descending && levels[i+1] < levels[i]) {
            hasError = true;
        }

        // is > 3 or < 1
        if (Math.abs(levels[i] - levels[i+1]) > 3 || Math.abs(levels[i] - levels[i+1]) < 1) {
            hasError = true;
        }
    }

    if (hasError) {
        for (let i = 0; i < levels.length; i++) {
            const copy = [...levels];
            copy.splice(i, 1);
            if (isReportSafeWithDampen(copy)) {
                return true;
            }
        }
    }

    return hasError == false;
}

const isReportSafeWithDampen = (levels) => {
    const descending = levels[0] > levels[1];

    for (let i = 0; i < levels.length - 1; i++) {
        if (levels[i] === levels[i+1]) {
            return false;
        }

        // isn't descending
        if (descending && levels[i] < levels[i+1]) {
            return false;
        }

        // isn't ascending
        if (!descending && levels[i+1] < levels[i]) {
            return false;
        }

        // is > 3 or < 1
        if (Math.abs(levels[i] - levels[i+1]) > 3 || Math.abs(levels[i] - levels[i+1]) < 1) {
            return false;
        }
    }

    return true;
}

/* PART 1 
const isReportSafe = (levels) => {
    const descending = levels[0] > levels[1];
    for (let i = 0; i < levels.length - 1; i++) {
        // Not at least one difference
        if (levels[i] === levels[i+1]) {

            return false;
        }

        // isn't descending
        if (descending && levels[i] < levels[i+1]) {
            return false;
        }

        // isn't ascending
        if (!descending && levels[i+1] < levels[i]) {
            return false;
        }

        // is > 3 or < 1
        if (Math.abs(levels[i] - levels[i+1]) > 3 || Math.abs(levels[i] - levels[i+1]) < 1) {
            return false;
        }
    } 

    return true;
}
*/

let count = 0;
reports.forEach((report) => {
    const levels = report.split(' ').map((a) => Number(a));
    if (isReportSafe(levels)) {
        count += 1;
    }
});

console.log(count);