# eslint-config-xo-react

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for React to be used with [eslint-config-xo](https://github.com/xojs/eslint-config-xo)

## Install

```sh
npm install --save-dev eslint-config-xo eslint-config-xo-react
```

## Usage

Add some ESLint config to your `eslint.config.js`:

```js
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

<!-- ## Tip

### Use with XO

```sh
npm install --save-dev eslint-config-xo-react eslint-plugin-react eslint-plugin-react-hooks
```

```json
{
	"name": "my-awesome-project",
	"xo": {
		"extends": "xo-react"
	}
}
``` -->

## Related

- [eslint-config-xo](https://github.com/xojs/eslint-config-xo) - ESLint shareable config for XO
- [XO](https://github.com/xojs/xo)
