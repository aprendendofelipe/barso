#!/usr/bin/env node
import { envs, logger, test } from 'barso';
import { program } from 'commander';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const packageJson = createRequire(import.meta.url)('barso/package.json');

const tn = program
  .name('tn')
  .version(packageJson.version, '-v, --version', 'Output the current version of tn')
  .description('TabNews command line interface')
  .allowExcessArguments()
  .configureHelp({ showGlobalOptions: true, sortSubcommands: true, sortOptions: true });

const testCommand = tn.command('test').description('Start test environment').summary('Run tests').allowUnknownOption();

testCommand
  .command('watch', { isDefault: true })
  .description('Watch mode')
  .allowUnknownOption()
  .action(getCommand('testWatch'));

testCommand.command('run').description('Run once').allowUnknownOption().action(getCommand('testRun'));

tn.parse();

function getCommand(key) {
  const commands = {
    testWatch: test.watch,
    testRun: test.run,
  };

  const environments = {
    testWatch: 'test',
    testRun: 'test',
  };

  const command = commands[key];

  if (command)
    return (_, params) => {
      const options = {
        ...params.optsWithGlobals(),
        ...params.opts(),
        args: params.args,
        spawn,
      };

      envs.load(options.envMode, environments[key] || environments.default);

      command(options);
    };

  return () => {
    logger.error('Command not found:', key);
    program.help();
  };
}
