import * as fs from 'fs';

function find_numbers(line: string): string[] {
    // Find numbers in `line`.
    const number_regex = /[0-9]?/g;
    let numbers_match = line.match(number_regex);
    if (numbers_match == null) {
        return [];
    } else {
        return numbers_match;
    }
}

function combine_numbers(num_arr: string[]): number[] {
    // Get an array of single numbers. Combine these into whole numbers.
    let numbers: number[] = [];
    let number_string: string = "";
    for (let num of num_arr) {
        if (!Number.isNaN(Number.parseInt(num))) {
            number_string = number_string + num;
        } else {
            if (number_string.length > 0) {
                numbers.push(Number.parseInt(number_string));
            }
            number_string = "";
        }
    }
    return numbers;
}

function find_symbols(line: string): string[] {
    // Find symbols in line
    const non_symbol_regex = /[^a-zA-Z\d\s\.:]?/g;
    let symbols_match = line.match(non_symbol_regex);
    if (symbols_match == null) {
        // No symbols found
        return [];
    } else {
        return symbols_match;
    }
}

export function task_1(file_path: fs.PathLike): number {
    // Read in all the contents of the file.
    const contents = fs.readFileSync(file_path, 'utf-8');

    // Split the contents into substrings at new lines.
    const lines: string[] = contents.split('\r\n');

    //let sum: number = 4361;
    let sum: number = 0;

    // Input contains numbers, symbols, and dots.
    // If number is adjacent to a symbol, either directly or diagonally,
    // that number is part of the answer.
    // All valid number should be summed.
    //
    // Naïve solution:
    // Grab three lines.
    // Find numbers in the middle line.
    // Find the indeces for the numbers.
    // Find symbols on all three lines.
    // Compare symbol index to number indeces.
    // If symbol index overlaps with number index plus one on each side,
    // add number to answer.

    for (let i = 0; i < lines.length; i++) {
        // Grab lines. Two for first and last, three for all other.
        let line_above: string = "";
        let line_below: string = "";
        const line: string = lines[i];
        if (i < lines.length - 1) {
            line_below = lines[i + 1];
        }
        if (i > 0) {
            line_above = lines[i - 1];
        }

        // Find numbers in `line`.
        let number_strings: string[] = find_numbers(line);
        let numbers: number[] = combine_numbers(number_strings);

        // Find indeces of symbols.
        const symbols_above: string[] = find_symbols(line_above);
        const symbols_line: string[] = find_symbols(line);
        const symbols_below: string[] = find_symbols(line_below);

        // Check if there are any symbols near a number.
        let num_idx: number = -1;
        let num_found: boolean = false;
        let num_added: boolean = false;
        for (let i = 0; i < number_strings.length; i++) {
            if (number_strings[i].length > 0) {
                // There is a number here!
                if (!num_found) {
                    num_found = true;
                    num_idx++;
                }

                let symbol_within_range: boolean = false;

                // Check symbols above
                if ((symbols_above[i - 1] != undefined && symbols_above[i - 1] != "")
                    || (symbols_above[i] != undefined && symbols_above[i] != "")
                    || (symbols_above[i + 1] != undefined && symbols_above[i + 1] != "")) {
                    symbol_within_range = true;
                }
                // Check symbols below
                if ((symbols_below[i - 1] != undefined && symbols_below[i - 1] != "")
                    || (symbols_below[i] != undefined && symbols_below[i] != "")
                    || (symbols_below[i + 1] != undefined && symbols_below[i + 1] != "")) {
                    symbol_within_range = true;
                }
                // Check adjacent symbols
                if ((symbols_line[i - 1] != undefined && symbols_line[i - 1] != "")
                    || (symbols_line[i + 1] != undefined && symbols_line[i + 1] != "")) {
                    symbol_within_range = true;
                }

                if (symbol_within_range && !num_added) {
                    sum += numbers[num_idx];
                    num_added = true;
                }
            } else {
                // No numbers here
                num_found = false;
                num_added = false;
            }
        }

    }

    return sum;
}
