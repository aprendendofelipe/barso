import createConfig from 'barso/vitest';

describe('Vitest Config', () => {
  const defaultConfig = createConfig();

  it('should get the default config', () => {
    expect(defaultConfig).toHaveProperty('plugins');
    expect(defaultConfig).toHaveProperty('test');
  });

  it('should get default config merged with custom config', () => {
    const result = createConfig({ customParam1: 'custom1', test: { customParam2: 'custom2' } });

    expect(result.customParam1).toBe('custom1');
    expect(result.test).toStrictEqual({ ...defaultConfig.test, customParam2: 'custom2' });
  });
});
