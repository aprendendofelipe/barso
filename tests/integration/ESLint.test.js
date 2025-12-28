import { execSync } from 'node:child_process';

import eslintConfig from 'barso/eslint';

describe('ESLint', () => {
  it('should get ESLint shared config', () => {
    expect(Array.isArray(eslintConfig)).toBe(true);
    eslintConfig.forEach((config) => {
      expect(config).toBeInstanceOf(Object);
    });
  });

  it('should pass ESLint for all files', () => {
    const result = execSync('npx eslint .').toString().trim();
    expect(result).toBe('');
  });
});
