import * as fs from 'fs';

export function task_1(file_path: fs.PathLike): number {
    // Read in all the contents of the file.
    const contents = fs.readFileSync(file_path, 'utf-8');

    // Split the contents into substrings at new lines.
    const lines: string[] = contents.split('\r\n');

    // Get first and last number in each line.
    // Combine these numbers.
    // Add the numbers and return the sum.
    let sum: number = 0;
    for (const line of lines) {

        let first: { is_set: boolean, val: number, val_str: string } = { is_set: false, val: 0, val_str: "" };
        let last: { is_set: boolean, val: number, val_str: string } = { is_set: false, val: 0, val_str: "" };

        if (line.length > 0) {

            for (const char of line) {
                const char_num = Number.parseInt(char);
                if (Number.isInteger(char_num)) {
                    if (first.is_set === false) {
                        first.is_set = true;
                        first.val = char_num;
                        first.val_str = char;

                        // If there's only one entry, it should be listed twice
                        last = Object.create(first);
                    } else {
                        last.is_set = true;
                        last.val = char_num;
                        last.val_str = char;
                    }
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
