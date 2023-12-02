import * as fs from 'fs';
import { Cube, get_cube_from_string } from './task_1';

export function task_2(file_path: fs.PathLike): number {
    // Read in all the contents of the file.
    const contents = fs.readFileSync(file_path, 'utf-8');

    // Split the contents into substrings at new lines.
    const lines: string[] = contents.split('\r\n');

    // Find cubes from input.
    // Find the highest number of each color.
    // Multiply those numbers.
    // Add those numbers together.
    let sum: number = 0;
    for (const line of lines) {
        const split_line: string[] = line.trim().split(':');

        // We don't need the game number here.

        // Get each cube-selection.
        // These are ';' separated.
        const cube_selections_str: string[] = split_line
            .slice(-1)[0]
            .split(';')
            .map((str) => str.trim());

        // Get colors and numbers for each selection.
        const cube_selections: Cube[][] = cube_selections_str
            .map((sel) => sel
                .split(',')
                .map((str) => str.trim())
                .map((num_col) => get_cube_from_string(num_col)));

        // Find the highest number of cubes of each color
        let most_cubes = {
            'red': 0,
            'green': 0,
            'blue': 0
        };
        for (const selection of cube_selections) {
            selection.forEach((sel) => {
                if (most_cubes[sel.color] < sel.num) {
                    most_cubes[sel.color] = sel.num;
                }
            })
        }

        sum = sum + (most_cubes['red'] * most_cubes['green'] * most_cubes['blue']);
    }

    return sum;
}

