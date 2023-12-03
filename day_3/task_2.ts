import * as fs from 'fs';

export function task_2(file_path: fs.PathLike): number {
    // Read in all the contents of the file.
    const contents = fs.readFileSync(file_path, 'utf-8');

    // Split the contents into substrings at new lines.
    const lines: string[] = contents.split('\r\n');

    let sum: number = 0;

    return sum;
}

