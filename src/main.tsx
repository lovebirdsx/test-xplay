import { Command as CommanderCommand } from "@commander-js/extra-typings";

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
    .option('--dangerously-skip-permissions', 'Skip permissions check (use with caution)')
    .action(async (prompt, options) => {
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

    program.parse(process.argv);
}

export async function main() {
    await run();
}
