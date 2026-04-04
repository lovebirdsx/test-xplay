import { Command as CommanderCommand } from "commander";

async function run() {
    const program = new CommanderCommand();
    program.hook('preAction', async () => {
        console.log('Running preAction hook...');
    });

    program.name('xplay')
    .description('A CLI tool for XPlay')
    .version('0.1.0')
    .helpOption('-h, --help', 'Display help for command')
    .argument('[prompt]', 'Your prompt', String)
    .option('-v, --verbose', 'Enable verbose mode')
    .action(async (prompt, options) => {
        console.log(`You entered: ${prompt}`);
        if (options.verbose) {
            console.log('Verbose mode is enabled');
        }
    });

    program.parse(process.argv);
}

export async function main() {
    await run();
}
