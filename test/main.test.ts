import { afterEach, describe, expect, it, vi } from 'vitest';

import { run } from '../src/main.js';

afterEach(() => {
    vi.restoreAllMocks();
});

describe('main', () => {
    it('accepts fib as the Fibonacci command', async () => {
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

        await run(['node', 'xplay', 'fib', '5']);

        expect(logSpy.mock.calls).toEqual([
            ['Running preAction hook...'],
            ['Generating Fibonacci sequence up to 5:'],
            [0],
            [1],
            [1],
            [2],
            [3],
        ]);
    });

    it('supports multi-word prompt input on the default command', async () => {
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

        await run(['node', 'xplay', 'hello', 'world']);

        expect(logSpy.mock.calls).toEqual([
            ['Running preAction hook...'],
            ['Prompt: hello world'],
        ]);
    });
});
