import * as question from 'src/ask';
import { logger } from 'src/index.js';
import { confirmEnvMode, getArgs, getSpawnTarget, run, test, watch } from 'src/tester';

describe('tester', () => {
  beforeAll(() => {
    vi.spyOn(process, 'exit').mockImplementation(() => {});
  });

  afterEach(vi.clearAllMocks);

  const spawn = vi.fn(() => ({
    on: vi.fn(),
  }));

  it('should run by test()', async () => {
    await test({
      envMode: 'test',
      watch: false,
      args: ['--coverage', '--testNamePattern', 'somePattern', 'arg1', 'arg2'],
      skipServices: true,
      spawn,
    });

    const { command, args } = getSpawnTarget({
      watch: false,
      args: ['--coverage', '--testNamePattern', 'somePattern', 'arg1', 'arg2'],
    });

    expect(spawn).toHaveBeenCalledExactlyOnceWith(command, args, {
      stdio: 'inherit',
    });
  });

  it('should run by run()', async () => {
    await run({ spawn, skipServices: true });

    const { command, args } = getSpawnTarget({ watch: false });

    expect(spawn).toHaveBeenCalledExactlyOnceWith(command, args, {
      stdio: 'inherit',
    });
  });

  it('should run by watch()', async () => {
    await watch({ spawn, skipServices: true });

    const { command, args } = getSpawnTarget({ watch: true });

    expect(spawn).toHaveBeenCalledExactlyOnceWith(command, args, {
      stdio: 'inherit',
    });
  });

  it('should exit with non-zero code if child process exits with a non-zero code', async () => {
    const on = vi.fn((_, cb) => cb(1));
    const spawn = vi.fn(() => ({ on }));

    await test({ spawn });

    expect(process.exit).toHaveBeenCalledWith(1);
  });

  describe('checkEnvMode', () => {
    beforeAll(() => {
      vi.spyOn(question, 'ask').mockImplementation(() => {});
      vi.spyOn(logger, 'warning').mockImplementation(() => {});
    });

    it('should not display a warning message and exit if envMode is undefined', async () => {
      await confirmEnvMode();

      expect(logger.warning).not.toHaveBeenCalled();
      expect(question.ask).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should not display a warning message and exit if envMode is "test"', async () => {
      await confirmEnvMode('test');

      expect(logger.warning).not.toHaveBeenCalled();
      expect(question.ask).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it.each([['development'], ['production']])(
      'should display a warning message and prompt for confirmation if envMode is "%s"',
      (envMode) => {
        confirmEnvMode(envMode);

        expect(logger.warning).toHaveBeenCalledExactlyOnceWith('You are not running in test mode!');
      },
    );

    it('should display a warning message and skip tests if user declines confirmation', async () => {
      question.ask.mockImplementation((_, cb) => cb(''));
      await confirmEnvMode('production');

      expect(logger.warning).toHaveBeenCalledWith('You are not running in test mode!');
      expect(question.ask).toHaveBeenCalledWith(
        ['Are you sure you want to run tests that might delete data?', '(y/N) '],
        expect.any(Function),
      );
      expect(logger.warning).toHaveBeenCalledWith('Skipping tests.');
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it('should display a warning message and run tests if user confirms', async () => {
      question.ask.mockImplementationOnce((_, cb) => cb('y'));
      await confirmEnvMode('development');

      expect(logger.warning).toHaveBeenCalledWith('You are not running in test mode!');
      expect(question.ask).toHaveBeenCalledWith(
        ['Are you sure you want to run tests that might delete data?', '(y/N) '],
        expect.any(Function),
      );
      expect(logger.warning).not.toHaveBeenCalledWith('Skipping tests.');
      expect(process.exit).not.toHaveBeenCalled();
    });
  });

  describe('getArgs', () => {
    it('should always return "vitest" as the first item', () => {
      expect(getArgs()[0]).toBe('vitest');
      expect(getArgs({ watch: false })[0]).toBe('vitest');
      expect(getArgs({ watch: true })[0]).toBe('vitest');
      expect(getArgs({ args: ['--coverage'] })[0]).toBe('vitest');
      expect(getArgs({ args: ['arg1', 'arg2'] })[0]).toBe('vitest');
    });

    it('should return "run" only when watch option is not true', () => {
      expect(getArgs({ watch: true })).toStrictEqual(['vitest']);

      expect(getArgs({ watch: false })).toStrictEqual(['vitest', 'run']);
      expect(getArgs()).toStrictEqual(['vitest', 'run']);
    });

    it('should forward any vitest arguments provided in args', () => {
      const args = getArgs({
        args: ['--coverage', '--reporter agent', '-t', 'somePattern'],
      });

      expect(args[0]).toBe('vitest');
      expect(args).toContain('--coverage');
      expect(args).toContain('--reporter agent');
      expect(args).toContain('-t');
      expect(args).toContain('somePattern');
    });

    it('should not include extra arguments when args is empty or absent', () => {
      expect(getArgs({ args: [] })).toStrictEqual(['vitest', 'run']);
      expect(getArgs()).toStrictEqual(['vitest', 'run']);
    });
  });

  describe('getSpawnTarget', () => {
    beforeAll(() => {
      vi.unstubAllGlobals();
    });

    it('should return "cmd.exe" with ["/c", "npx", ...] args on Windows', () => {
      vi.stubGlobal('process', { ...process, platform: 'win32' });
      expect(getSpawnTarget({ watch: false })).toStrictEqual({
        command: 'cmd.exe',
        args: ['/c', 'npx', 'vitest', 'run'],
      });
      expect(getSpawnTarget({ watch: true })).toStrictEqual({
        command: 'cmd.exe',
        args: ['/c', 'npx', 'vitest'],
      });
    });

    it.each(['linux', 'darwin'])('should return "npx" with vitest args on "%s"', (platform) => {
      vi.stubGlobal('process', { ...process, platform });
      expect(getSpawnTarget({ watch: false })).toStrictEqual({
        command: 'npx',
        args: ['vitest', 'run'],
      });
      expect(getSpawnTarget({ watch: true })).toStrictEqual({
        command: 'npx',
        args: ['vitest'],
      });
    });
  });
});
