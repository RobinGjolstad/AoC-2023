import * as t1 from './task_1';

describe('testing task 1', () => {
    test('test input', () => {
        expect(t1.task_1('day_2/input_1_test.txt')).toBe(8);
    })
});

