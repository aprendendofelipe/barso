import { ask } from 'src/ask';

describe('ask', () => {
  const rl = {
    question: vi.fn((_, callback) => {
      callback('Mock answer');
    }),
    close: vi.fn(),
  };

  const readline = {
    createInterface: vi.fn().mockReturnValue(rl),
  };

  beforeEach(vi.clearAllMocks);

  it('should ask the question and resolve with the answer', async () => {
    const answer = await ask('What is your name?', undefined, readline);

    expect(readline.createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout,
    });
    expect(rl.question).toHaveBeenCalledWith('\x1b[1mWhat is your name?\x1b[0m', expect.any(Function));
    expect(rl.close).toHaveBeenCalledOnce();
    expect(answer).toBe('Mock answer');
  });

  it('should call the callback with the answer if provided', async () => {
    const callback = vi.fn();

    await ask('Question', callback, readline);

    expect(callback).toHaveBeenCalledExactlyOnceWith('Mock answer');
  });

  it('should format the question correctly if it is an array', async () => {
    await ask(['Enter your username:', '(case-sensitive)'], undefined, readline);

    expect(rl.question).toHaveBeenCalledExactlyOnceWith(
      '\x1b[1mEnter your username:\x1b[0m \x1b[2m(case-sensitive)\x1b[0m',
      expect.any(Function),
    );
  });
});
