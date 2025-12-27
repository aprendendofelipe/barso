import { execSync } from 'node:child_process';

import prettierConfig from 'barso/prettier';

describe('Prettier', () => {
  it('should get Prettier shared config', () => {
    expect(prettierConfig).toBeInstanceOf(Object);
  });

  it('should pass Prettier check for all files', () => {
    const result = execSync('npx prettier --check .').toString().trim();

    expect(result).toContain('All matched files use Prettier code style!');
  });
});
