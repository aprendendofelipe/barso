import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

describe('TypeScript Module Declarations', () => {
  const fixtureDir = path.resolve('tests/integration/fixtures/consumer');
  const tscBin = require.resolve('typescript/bin/tsc');

  it('should type-check imports from barso subpaths without ambient module declarations', () => {
    expect(() => {
      execSync(`"${process.execPath}" "${tscBin}" -p "${fixtureDir}"`, {
        stdio: 'pipe',
      });
    }).not.toThrow();
  });

  it('should generate non-empty source mappings for all declaration map files to ensure IDE Go-to-Definition', () => {
    const mapFiles = fs.globSync('src/**/*.map');

    expect(mapFiles.length).toBeGreaterThan(0);

    for (const mapFile of mapFiles) {
      const content = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
      expect(content.sources).toBeDefined();
      expect(content.sources.length).toBeGreaterThan(0);
      expect(content.mappings.trim().length).toBeGreaterThan(0);
    }
  });
});
