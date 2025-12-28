import * as question from 'src/ask';
import { logger } from 'src/index.js';
import { confirmEnvMode, getArgs, run, test, watch } from 'src/tester';

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
      coverage: true,
      testNamePattern: 'somePattern',
      args: ['arg1', 'arg2'],
      skipServices: true,
      spawn,
    });

    expect(spawn).toHaveBeenCalledExactlyOnceWith(
      'npx',
      ['vitest', 'run', '--coverage', '--testNamePattern', 'somePattern', 'arg1', 'arg2'],
      {
        stdio: 'inherit',
        shell: true,
      },
    );
  });

  it('should run by run()', async () => {
    await run({ spawn, skipServices: true });

    expect(spawn).toHaveBeenCalledExactlyOnceWith('npx', ['vitest', 'run'], {
      stdio: 'inherit',
      shell: true,
    });
  });

  it('should run by watch()', async () => {
    await watch({ spawn, skipServices: true });

    expect(spawn).toHaveBeenCalledExactlyOnceWith('npx', ['vitest'], {
      stdio: 'inherit',
      shell: true,
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
      expect(getArgs({ coverage: true })[0]).toBe('vitest');
      expect(getArgs({ testNamePattern: 'somePattern' })[0]).toBe('vitest');
      expect(getArgs({ args: ['arg1', 'arg2'] })[0]).toBe('vitest');
    });

    it('should return "run" only when watch option is not true', () => {
      expect(getArgs({ watch: true })).toStrictEqual(['vitest']);

      expect(getArgs({ watch: false })).toStrictEqual(['vitest', 'run']);
      expect(getArgs()).toStrictEqual(['vitest', 'run']);
    });

    it('should include "--coverage" only when coverage option is true', () => {
      expect(getArgs({ coverage: true })).toContain('--coverage');

      expect(getArgs({ coverage: false })).not.toContain('--coverage');
      expect(getArgs({ coverage: undefined })).not.toContain('--coverage');
      expect(getArgs()).not.toContain('--coverage');
    });

    it('should include "--testNamePattern" and the provided pattern only when testNamePattern option is provided', () => {
      const args = getArgs({
        testNamePattern: 'somePattern',
      });

      expect(args).toContain('--testNamePattern');
      expect(args).toContain('somePattern');

      expect(getArgs({ testNamePattern: '' })).not.toContain('--testNamePattern');
      expect(getArgs()).not.toContain('--testNamePattern');
    });

    it('should include provided arguments when args option is a non-empty array', () => {
      const args = getArgs({
        args: ['arg1', 'arg2'],
      });

      expect(args[0]).toBe('vitest');
      expect(args).toContain('arg1');
      expect(args).toContain('arg2');
      expect(args).not.toContain('--args');

      expect(getArgs({ args: [] })).not.toContain('--args');
    });
  });
});
