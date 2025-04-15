import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import fs from 'node:fs';

import { display, getMode, load } from 'src/envs';
import * as logger from 'src/logger';

const originalNodeEnv = process.env.NODE_ENV;

describe('Envs', () => {
  beforeAll(() => {
    vi.spyOn(fs, 'existsSync');
    vi.spyOn(logger, 'done').mockImplementation(() => {});
    vi.spyOn(logger, 'info').mockImplementation(() => {});
    vi.spyOn(logger, 'warning').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.NODE_ENV;
  });

  afterAll(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('load', () => {
    it('should load env files in the correct order', () => {
      load('production');

      expect(fs.existsSync).toHaveBeenNthCalledWith(1, '.env.production.local');
      expect(fs.existsSync).toHaveBeenNthCalledWith(2, '.env.local');
      expect(fs.existsSync).toHaveBeenNthCalledWith(3, '.env.production');
      expect(fs.existsSync).toHaveBeenNthCalledWith(4, '.env');
      expect(fs.existsSync).toHaveBeenCalledTimes(4);
    });

    it('should inform the current environment', () => {
      process.env.NODE_ENV = 'development';

      load('development');

      expect(logger.info).toHaveBeenCalledWith('Loading envs for development');
      expect(logger.info).toHaveBeenCalledOnce();
    });

    it('should inform loaded files', () => {
      fs.existsSync.mockReturnValueOnce(true);

      load('test');

      expect(logger.done).toHaveBeenCalledWith('Loaded file: .env.test.local');
      expect(logger.done).toHaveBeenCalledOnce();
    });

    it('should display a warning message if NODE_ENV is different from the mode', () => {
      process.env.NODE_ENV = 'production';

      load('development');

      expect(logger.warning).toHaveBeenCalledWith('NODE_ENV=production, but loading envs for development');
      expect(logger.warning).toHaveBeenCalledOnce();
    });

    it('should call dotenv only for existent files', () => {
      fs.existsSync.mockReturnValueOnce(true);
      vi.spyOn(dotenv, 'config').mockReturnValueOnce({ parsed: {} });
      vi.spyOn(dotenvExpand, 'expand').mockReturnValueOnce();

      load('development', 'commandMode');

      expect(fs.existsSync).toHaveBeenCalledTimes(4);

      expect(dotenv.config).toHaveBeenCalledWith({ path: '.env.development.local' });
      expect(dotenv.config).toHaveBeenCalledOnce();

      expect(dotenvExpand.expand).toHaveBeenCalledWith({ parsed: {} });
      expect(dotenvExpand.expand).toHaveBeenCalledOnce();

      expect(logger.done).toHaveBeenCalledWith('Loaded file: .env.development.local');
      expect(logger.done).toHaveBeenCalledOnce();
    });
  });

  describe('getMode', () => {
    it('should return default mode when no CLI option, NODE_ENV, or command mode is provided', () => {
      const mode = getMode();

      expect(mode).toBe('development');
    });

    it('should return the command mode if no CLI option or NODE_ENV is provided', () => {
      const mode = getMode(undefined, 'commandMode');

      expect(mode).toBe('commandMode');
    });

    it('should return the correct mode based on the NODE_ENV environment variable', () => {
      process.env.NODE_ENV = 'production';

      const mode = getMode(undefined, 'commandMode');

      expect(mode).toBe('production');
    });

    it('should return the correct mode based on the CLI option', () => {
      const mode = getMode('cliMode', 'commandMode');

      expect(mode).toBe('cliMode');
    });
  });

  describe('display', () => {
    it('should display the warning message', () => {
      process.env.NODE_ENV = 'production';
      const mode = 'development';

      display(mode);

      expect(logger.warning).toHaveBeenCalledWith('NODE_ENV=production, but loading envs for development');
      expect(logger.warning).toHaveBeenCalledOnce();
      expect(logger.info).not.toHaveBeenCalled();
    });

    it('should display the info message', () => {
      process.env.NODE_ENV = 'development';
      const mode = 'development';

      display(mode);

      expect(logger.info).toHaveBeenCalledWith('Loading envs for development');
      expect(logger.info).toHaveBeenCalledOnce();
      expect(logger.warning).not.toHaveBeenCalled();
    });
  });
});
