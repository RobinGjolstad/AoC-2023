import * as d1_t1 from './day_1/task_1';
import * as d1_t2 from './day_1/task_2';
import * as d2_t1 from './day_2/task_1';
import * as d2_t2 from './day_2/task_2';

let d1_t1_answer = d1_t1.task_1("./day_1/input.txt");
console.log(`Day 1 Task 1: ${d1_t1_answer}`);

let d1_t2_answer = d1_t2.task_2("./day_1/input.txt");
console.log(`Day 1 Task 2: ${d1_t2_answer}`);

let d2_t1_answer = d2_t1.task_1("./day_2/input.txt");
console.log(`Day 2 Task 1: ${d2_t1_answer}`);

let d2_t2_answer = d2_t2.task_2("./day_2/input.txt");
console.log(`Day 2 Task 2: ${d2_t2_answer}`);
