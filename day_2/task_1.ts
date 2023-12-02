import * as fs from 'fs';

export type CubeColor = 'red' | 'green' | 'blue';
export type Cube = {
    num: number
    color: CubeColor,
};

const meh_cube_rules: Cube[] = [
    { color: 'red', num: 12 },
    { color: 'green', num: 13 },
    { color: 'blue', num: 14 }
];

const cube_rules = {
    "red": 12,
    "green": 13,
    "blue": 14
}

export function get_cube_from_string(str: string): Cube {
    // Assuming string is 'N color'
    const str_split: string[] = str.split(' ');
    const num: number = Number.parseInt(str_split[0]);
    const color: string = str_split.slice(-1)[0];
    return {
        num: num,
        color: color as CubeColor
    }
}

export function task_1(file_path: fs.PathLike): number {
    // Read in all the contents of the file.
    const contents = fs.readFileSync(file_path, 'utf-8');

    // Split the contents into substrings at new lines.
    const lines: string[] = contents.split('\r\n');


    // Split line at ':'. 
    // Left side has 'Game N'.
    // Right side has 'N <color>; M <color>'
    let sum: number = 0;
    for (const line of lines) {
        const split_line: string[] = line.trim().split(':');

        // Get game number
        const game_line: string = split_line[0];
        const game_num_str: string[] = game_line
            .split(' ')
            .map((str) => str.trim());
        const game_num: number = Number.parseInt(game_num_str.slice(-1)[0]);

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

        // Find out if any of the cubes exceed the rules.
        let rules_exceeded: boolean = false;
        for (const selection of cube_selections) {
            selection.forEach((sel) => {
                if (cube_rules[sel.color] < sel.num) {
                    rules_exceeded = true;
                }
            })
        }

        if (!rules_exceeded && !Number.isNaN(game_num)) {
            sum += game_num;
        }
    }

    return sum;
}
