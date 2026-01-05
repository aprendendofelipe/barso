# Changelog

## [0.6.1](https://github.com/aprendendofelipe/barso/compare/barso-v0.6.0...barso-v0.6.1) (2026-01-05)


### Features

* add preview release workflow ([8d1c19c](https://github.com/aprendendofelipe/barso/commit/8d1c19c08760fbc1dd0b8a0e8622ea8c9d647ef2))
* **deps:** update dependencies ([c4c4781](https://github.com/aprendendofelipe/barso/commit/c4c4781faf99d1614316fdd32d19cea2cc6fe3f9))
* **release:** configure release-please action ([df21a9c](https://github.com/aprendendofelipe/barso/commit/df21a9c36b77a78b849d33b4fd41965c24b38afb))

## [0.6.0](https://github.com/aprendendofelipe/tabnews-config/compare/v0.5.0...v0.6.0) (2025-05-10)


### ⚠ BREAKING CHANGES

* **eslint:** Projects that define inline components inside render functions will now fail linting due to the new `react/no-unstable-nested-components` rule being set to `error`. Manual changes are required to comply with the rule.

### Features

* **eslint:** add React rule to disallow useless fragments ([f2cc4b2](https://github.com/aprendendofelipe/tabnews-config/commit/f2cc4b2ad7559c6e15c10144f1fe2dc1ffbec419))
* **eslint:** add rule to disallow nested components in React ([8b02f00](https://github.com/aprendendofelipe/tabnews-config/commit/8b02f000154d3549681da09a584d15396de56a61))


### Miscellaneous Chores

* update dependencies to latest versions ([ba3d0e2](https://github.com/aprendendofelipe/tabnews-config/commit/ba3d0e2755fc380ae94445ada38e46989b4ac140))

## [0.5.0](https://github.com/aprendendofelipe/tabnews-config/compare/v0.4.2...v0.5.0) (2025-04-22)


### Features

* **ESLint:** add additional Vitest rules ([f434d66](https://github.com/aprendendofelipe/tabnews-config/commit/f434d66872b03f6de4e01bdc7195aec89cd87d12))

## [0.4.2](https://github.com/aprendendofelipe/tabnews-config/compare/v0.4.1...v0.4.2) (2025-04-21)


### Bug Fixes

* **eslint:** add file patterns to eslint configuration ([c03d2c1](https://github.com/aprendendofelipe/tabnews-config/commit/c03d2c1b0d788aab7713bc8a371ff56fbaf6fa55))
* **eslint:** disable @next/next/no-html-link-for-pages rule ([59658d7](https://github.com/aprendendofelipe/tabnews-config/commit/59658d750e9b0936292b468c0ff1b976fe3f04bc))

## [0.4.1](https://github.com/aprendendofelipe/tabnews-config/compare/v0.4.0...v0.4.1) (2025-04-16)


### Bug Fixes

* **eslint:** update ESLint config for fix TypeScript support ([ad923f4](https://github.com/aprendendofelipe/tabnews-config/commit/ad923f477cb541baafab5c8f75bbdf2474293164))

## [0.4.0](https://github.com/aprendendofelipe/tabnews-config/compare/v0.3.1...v0.4.0) (2025-04-15)


### Features

* **eslint:** add TypeScript-specific rules to shared config ([36e3465](https://github.com/aprendendofelipe/tabnews-config/commit/36e3465b27e120942c455bffb328e9fbd5b70d52))

## [0.3.1](https://github.com/aprendendofelipe/tabnews-config/compare/v0.3.0...v0.3.1) (2025-02-26)


### Bug Fixes

* **cli:** allow filter arguments in test command ([177461f](https://github.com/aprendendofelipe/tabnews-config/commit/177461fb01038974b1598df583f13d711e68b96d))

## [0.3.0](https://github.com/aprendendofelipe/tabnews-config/compare/v0.2.0...v0.3.0) (2025-02-18)


### Features

* **deps:** update dependencies to latest versions ([3c11787](https://github.com/aprendendofelipe/tabnews-config/commit/3c117877cb957382874cd7f1541a3a6882d1fb5e))

## [0.2.0](https://github.com/aprendendofelipe/tabnews-config/compare/v0.1.0...v0.2.0) (2024-10-08)


### ⚠ BREAKING CHANGES

* **eslint:** need to add `--max-warnings 0` when running `eslint` to fail these rules

### Features

* **lint-staged:** add `lint-staged` configuration file ([d3734cb](https://github.com/aprendendofelipe/tabnews-config/commit/d3734cb99b103f250444773e5132509704fa67aa))


### Styles

* **eslint:** changes some style-only rules to warn level ([3211863](https://github.com/aprendendofelipe/tabnews-config/commit/3211863b6fdc07c977a5883fa5083398ac2f614d))

## [0.1.0](https://github.com/aprendendofelipe/tabnews-config/compare/v0.0.1...v0.1.0) (2024-10-03)


### ⚠ BREAKING CHANGES

* **vitest:** change 'isolate' to default option

### Features

* **vitest:** change 'isolate' to default option ([16fa010](https://github.com/aprendendofelipe/tabnews-config/commit/16fa01041efa02babed2138524155d1d38fcaba1))


### Bug Fixes

* handle non-zero exit code in test function ([ef1001e](https://github.com/aprendendofelipe/tabnews-config/commit/ef1001ef7b6365573dfcea3d795424615afb79df))

## 0.0.1 (2024-10-03)


### Features

* add `env` loader ([0dfbb17](https://github.com/aprendendofelipe/tabnews-config/commit/0dfbb177470cc6312786514a773b32b69b2cfa00))
* add ask function for user input ([a483d64](https://github.com/aprendendofelipe/tabnews-config/commit/a483d64097250045158b4a621ead734f63ea2107))
* add logger module ([261e45e](https://github.com/aprendendofelipe/tabnews-config/commit/261e45e87affcc437883ef8f68ee2e7fcbec1f12))
* add tn command line interface ([510311e](https://github.com/aprendendofelipe/tabnews-config/commit/510311e1a09a68abacad61daf05cd41ded055eda))
* **cli:** add `test` command ([464a660](https://github.com/aprendendofelipe/tabnews-config/commit/464a6602639f94acef11ab8a14ebad9ef9e73ec5))


### Documentation

* **readme:** add information about only the `test` command being available ([759d0c0](https://github.com/aprendendofelipe/tabnews-config/commit/759d0c03a118639f0a55b04c0a90c6903491f73a))
