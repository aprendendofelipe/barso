/* eslint-disable no-console */
import { done, error, info, warning } from 'src/logger.js';

describe('logger', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(vi.clearAllMocks);

  describe('done', () => {
    it('should log a message with a checkmark', () => {
      const message = 'Done message';

      done(message);

      expect(console.info).toHaveBeenCalledExactlyOnceWith('\x1b[32m%s\x1b[0m', '✔', message);
    });

    it('should log multiple messages with a checkmark', () => {
      const message1 = 'Done';
      const message2 = 'Messages';

      done(message1, message2);

      expect(console.info).toHaveBeenCalledExactlyOnceWith('\x1b[32m%s\x1b[0m', '✔', message1, message2);
    });
  });

  describe('error', () => {
    it('should log a error message', () => {
      const message = 'Error message';

      error(message);

      expect(console.error).toHaveBeenCalledExactlyOnceWith('\x1b[31m%s\x1b[0m', '✖', message);
    });

    it('should log multiple error messages', () => {
      const message1 = 'Error';
      const message2 = 'Messages';

      error(message1, message2);

      expect(console.error).toHaveBeenCalledExactlyOnceWith('\x1b[31m%s\x1b[0m', '✖', `${message1} ${message2}`);
    });
  });

  describe('info', () => {
    it('should log a info message', () => {
      const message = 'Info message';

      info(message);

      expect(console.info).toHaveBeenCalledExactlyOnceWith(message);
    });

    it('should log multiple info messages', () => {
      const message1 = 'Info';
      const message2 = 'Messages';

      info(message1, message2);

      expect(console.info).toHaveBeenCalledExactlyOnceWith(message1, message2);
    });
  });

  describe('warning', () => {
    it('should log a warning message', () => {
      const message = 'Warn message';
      warning(message);

      expect(console.warn).toHaveBeenCalledWith('\x1b[33m%s\x1b[0m\x1b[1m%s\x1b[0m', '⚠️ ', message);
    });

    it('should log multiple warning messages', () => {
      const message1 = 'Warn';
      const message2 = 'Messages';

      warning(message1, message2);

      expect(console.warn).toHaveBeenCalledWith('\x1b[33m%s\x1b[0m\x1b[1m%s\x1b[0m', '⚠️ ', `${message1} ${message2}`);
    });
  });
});
