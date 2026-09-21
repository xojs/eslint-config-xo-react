# eslint-config-xo-react

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for React to be used with [eslint-config-xo](https://github.com/xojs/eslint-config-xo)

## Install

```sh
npm install --save-dev eslint-config-xo eslint-config-xo-react
```

> [!NOTE]
> This config is built on [ESLint React](https://eslint-react.xyz), which requires `typescript` as a peer dependency even in JavaScript-only projects. npm and pnpm install it for you, but Yarn does not, so install it yourself there.

## Usage

```js
// eslint.config.js
import eslintConfigXo from 'eslint-config-xo';
import eslintConfigXoReact from 'eslint-config-xo-react';
import {defineConfig} from 'eslint/config';

export default defineConfig([
	...eslintConfigXo(),
	...eslintConfigXoReact(),
]);
```

### Options

#### space

Type: `boolean | number`\
Default: `false`

Use spaces for indentation instead of tabs for JSX props. Set to `true` for 2 spaces, or a number for a custom count.

```js
export default defineConfig([
	...eslintConfigXo({space: true}),
	...eslintConfigXoReact({space: true}),
]);
```

#### prettier

Type: `boolean | 'compat'`\
Default: `false`

Integrate [Prettier](https://prettier.io) by turning off the JSX formatting rules that conflict with it. Rules owned by `eslint-config-xo` are left alone, so you no longer need to add `eslint-config-prettier` yourself.

```js
export default defineConfig([
	...eslintConfigXo({prettier: 'compat'}),
	...eslintConfigXoReact({prettier: 'compat'}),
]);
```

This config never runs Prettier, so any truthy value only turns off the conflicting rules. Running Prettier itself is handled by the [`prettier` option in `eslint-config-xo`](https://github.com/xojs/eslint-config-xo#prettier). Pass the same value you pass there.

## Use with XO

[XO](https://github.com/xojs/xo) comes bundled with `eslint-config-xo`, so you only need this config:

```sh
npm install --save-dev eslint-config-xo-react
```

```js
// xo.config.js
import eslintConfigXoReact from 'eslint-config-xo-react';
import {defineConfig} from 'eslint/config';

export default defineConfig([
	...eslintConfigXoReact(),
]);
```

Pass the same [`space`](#space) and [`prettier`](#prettier) values you use in your XO config.

## Included plugins

- [`@eslint-react/eslint-plugin`](https://github.com/Rel1cx/eslint-react)
- [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
- [`eslint-plugin-perfectionist`](https://github.com/azat-io/eslint-plugin-perfectionist)
- [`@stylistic/eslint-plugin`](https://github.com/eslint-stylistic/eslint-stylistic)

## Related

- [eslint-config-xo](https://github.com/xojs/eslint-config-xo) - ESLint shareable config for XO
- [XO](https://github.com/xojs/xo)
