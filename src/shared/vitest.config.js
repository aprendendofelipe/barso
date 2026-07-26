import { configDefaults, defineConfig } from 'vitest/config';

/**
 * @param {Parameters<typeof defineConfig>[0]} [customConfig]
 * @returns {ReturnType<typeof defineConfig>}
 */
export default function createConfig(customConfig) {
  return defineConfig(
    deepMerge(
      {
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          globals: true,
          fileParallelism: false,
          testTimeout: 60_000,
          hookTimeout: 30_000,
          exclude: [...configDefaults.exclude, 'worktrees/**', '.worktrees/**'],
        },
      },
      customConfig,
    ),
  );
}

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target, source);
  return target;
}
