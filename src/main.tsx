import { Command as CommanderCommand } from "@commander-js/extra-typings";

function* fibonacci(n: number): Generator<number> {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

function printFibonacci(n: number) {
    const sequence = fibonacci(n);
    for (const num of sequence) {
        console.log(num);
    }
}

type Node = {
    name: string;
    children?: Node[];
};

const fileSystemTree: Node = {
    name: 'root',
    children: [
        { name: 'readme.md' },
        {
            name: 'src',
            children: [
                { name: 'index.js' },
                { name: 'style.css' }
            ]
        }
    ]
};

function* traverseTree(node: Node, path: string = ''): Generator<string> {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    yield currentPath;
    if (node.children) {
        for (const child of node.children) {
            yield* traverseTree(child, currentPath);
        }
    }
}

export function createProgram() {
    const program = new CommanderCommand();
    program.hook('preAction', async () => {
        console.log('Running preAction hook...');
    });

    program.name('xplay')
        .description('A CLI tool for XPlay')
        .version('0.1.0')
        .helpOption('-h, --help', 'Display help for command')
        .argument('[prompt...]', 'Your prompt')
        .option('-v, --verbose', 'Enable verbose mode')
        .option('--dangerously-skip-permissions', 'Skip permissions check (use with caution)')
        .action((promptParts, options) => {
            const prompt = promptParts.join(' ').trim();

            if (prompt) {
                console.log(`Prompt: ${prompt}`);
            }

            if (options.verbose) {
                console.log('Verbose mode enabled');
            }
            if (options.dangerouslySkipPermissions) {
                console.warn('Warning: Permissions check is skipped. Use with caution!');
            }
        });

    program.command('fib [n]')
        .description('Generate Fibonacci sequence up to n')
        .action((n) => {
            const num = parseInt(n || '10', 10) || 10;
            console.log(`Generating Fibonacci sequence up to ${num}:`);
            printFibonacci(num);
        });

    program.command('traverse')
        .description('Traverse a sample file system tree')
        .action(() => {
            console.log('Traversing file system tree:');
            for (const name of traverseTree(fileSystemTree)) {
                console.log(name);
            }
        });

    return program;
}

export async function run(argv: readonly string[] = process.argv) {
    const program = createProgram();
    program.parse(argv);
}

export async function main() {
    await run();
}
