import createConfig from 'barso/vitest';

const config = createConfig({
  test: {
    coverage: {
      include: ['src'],
      exclude: ['**/*.test.*', '**/*.spec.*'],
    },
  },
});

export default config;
