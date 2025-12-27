# Barso: Configurações e CLI

Configure um ambiente de desenvolvimento e testes com configurações similares às utilizadas no TabNews, incluindo:

- Test Runner [Vitest](https://vitest.dev/)
- Linter [ESLint](https://eslint.org/)
- Formatador de código [Prettier](https://prettier.io/)

## Instalação

Para adicionar ao projeto, execute o comando:

```bash
npm i -D barso
```

Para utilizar a CLI, instale globalmente com o comando:

```bash
npm i -g barso
```

## Configuração

No diretório raiz do projeto, adicione os respectivos arquivos de configuração de cada ferramenta utilizando as exportações da biblioteca `barso`.

### ESLint (`eslint.config.js`)

```js
export { default } from 'barso/eslint';
```

ou

```js
const defaultConfig = require('barso/eslint');

const config = [
  ...defaultConfig,
  {
    // configurações adicionais ou sobrescritas
  },
];

module.exports = config;
```

### lint-staged (`lint-staged.config.js`)

```js
export { npm as default } from 'barso/lint-staged';
// export { pnpm as default } from 'barso/lint-staged';
// export { yarn as default } from 'barso/lint-staged';
```

### Prettier (`prettier.config.js`)

```js
export { default } from 'barso/prettier';
```

### Vitest (`vitest.config.js`)

```js
import defineConfig from 'barso/vitest';

const config = defineConfig({
  test: {
    // configurações adicionais ou sobrescritas
  },
});

export default config;
```

## Utilização

Adicione scripts no `package.json` do projeto, por exemplo:

```json
{
  "scripts": {
    "test": "barso test run",
    "test:watch": "barso test",
    "lint": "eslint . && prettier --check .",
    "lint:fix": "eslint --fix . && prettier --write .",
    "prepare": "husky",
    "pre-commit": "lint-staged"
  }
}
```

## @tabnews/config

Até a versão `0.6.0`, este repositório também foi a casa da biblioteca `@tabnews/config`, que fornecia configurações padronizadas para os repositórios do TabNews. A partir desta versão, a biblioteca foi renomeada e publicada no NPM como [`barso`](https://www.npmjs.com/package/barso).

Para facilitar a migração, as versões [@tabnews/config@0.6.0](https://www.npmjs.com/package/@tabnews/config/v/0.6.0) e [barso@0.6.0](https://www.npmjs.com/package/@barso/config/v/0.6.0) são idênticas, mas podem divergir em futuras versões.

O desenvolvimento da biblioteca [`@tabnews/config`](https://www.npmjs.com/package/@tabnews/config), caso mantido, irá ocorrer no repositório [`filipedeschamps/tabnews-config`](https://github.com/filipedeschamps/tabnews-config).
