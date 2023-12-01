import * as fs from 'fs';

type FoundNumber = { is_set: boolean, val: number, val_str: string };

type StringNumber = { str: string, val: number };
const numbers: StringNumber[] = [
    { str: 'zero', val: 0 },
    { str: 'one', val: 1 },
    { str: 'two', val: 2 },
    { str: 'three', val: 3 },
    { str: 'four', val: 4 },
    { str: 'five', val: 5 },
    { str: 'six', val: 6 },
    { str: 'seven', val: 7 },
    { str: 'eight', val: 8 },
    { str: 'nine', val: 9 }
];

function find_first_number(str: string, index: number): [FoundNumber, number] {
    // First try to find a normal number.
    // Then try to find a text-number.
    // The answer is the one with the lowest index.

    // Number
    let number_index: number = Infinity;
    let number_number: number = Infinity;
    for (let i = 0; i < 10; i++) {
        let result = str.indexOf("" + i, index);
        if (result >= 0) {
            if (result < number_index) {
                number_index = result;
                number_number = i;
            }
        }
    }

    // Text-number
    let text_number_index: number = Infinity;
    let text_number: number = Infinity;
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        let result = str.indexOf(num.str, index);
        if (result >= 0) {
            if (result < text_number_index) {
                text_number_index = result;
                text_number = num.val;
            }
        }
    }

    if (number_index < text_number_index) {
        return [
            { is_set: true, val: number_number, val_str: "" + number_number },
            number_index
        ];
    } else if (number_index > text_number_index) {
        return [
            { is_set: true, val: text_number, val_str: "" + text_number },
            text_number_index
        ];
    }
    return [
        { is_set: false, val: 0, val_str: "" },
        -1
    ];
}


export function task_2(file_path: fs.PathLike): number {
    // Read in all the contents of the file.
    const contents = fs.readFileSync(file_path, 'utf-8');

    // Split the contents into substrings at new lines.
    const lines: string[] = contents.split('\r\n');

    // Get first and last number in each line.
    // Combine these numbers.
    // Add the numbers and return the sum.
    let sum: number = 0;
    for (const line of lines) {

        let first: FoundNumber = { is_set: false, val: 0, val_str: "" };
        let last: FoundNumber = { is_set: false, val: 0, val_str: "" };

        if (line.length > 0) {

            for (let i = 0; i < line.length; i++) {
                const result = find_first_number(line, i);

                // Negative number indicates no number was found.
                if (result[1] >= 0) {
                    if (first.is_set == false) {
                        first = Object.assign({}, result[0]);
                        last = Object.assign({}, result[0]);
                    } else {
                        last = Object.assign({}, result[0]);
                    }

                    // Save the index where the number was found.
                    // This lets us skip ahead if we find something in the middle of the string.
                    i = result[1];
                }
            }
        }

        const comb_str: string = first.val_str + last.val_str;
        const comb_int: number = Number.parseInt(comb_str);

        if (!Number.isNaN(comb_int)) {
            sum = sum + comb_int;
        }
    }

    return sum;
}

