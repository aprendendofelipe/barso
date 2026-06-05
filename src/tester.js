import { spawn } from 'node:child_process';

import { ask } from './ask.js';
import { getMode } from './envs.js';
import { warning } from './logger.js';

export async function run(options) {
  await test({ ...options, watch: false });
}

export async function watch(options) {
  await test({ ...options, watch: true });
}

export async function test(options = {}) {
  await confirmEnvMode(options.envMode);

  const { command, args } = getSpawnTarget(options);

  const child = (options.spawn || spawn)(command, args, {
    stdio: 'inherit',
  });

  child.on('close', (code) => {
    if (code !== 0) {
      process.exit(code);
    }
  });
}

export async function confirmEnvMode(mode) {
  const envMode = getMode(mode, 'test');
  if (envMode === 'test') return 'test';

  warning('You are not running in test mode!');

  await ask(['Are you sure you want to run tests that might delete data?', '(y/N) '], (answer) => {
    if (answer?.toLowerCase() !== 'y') {
      warning('Skipping tests.');
      process.exit(1);
    }
  });

  return envMode;
}

export function getSpawnTarget(options = {}) {
  const vitestArgs = getArgs(options);

  if (process.platform === 'win32') {
    return { command: 'cmd.exe', args: ['/c', 'npx', ...vitestArgs] };
  }

  return { command: 'npx', args: vitestArgs };
}

export function getArgs(options = {}) {
  const args = ['vitest'];
  if (!options.watch) args.push('run');
  if (Array.isArray(options.args)) args.push(...options.args);
  return args;
}
