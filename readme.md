# eslint-config-xo-react

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for React to be used with [eslint-config-xo](https://github.com/xojs/eslint-config-xo)

## Install

```sh
npm install --save-dev eslint-config-xo eslint-config-xo-react eslint-plugin-react eslint-plugin-react-hooks
```

## Usage

Add some ESLint config to your `eslint.config.js`:

```js
// eslint.config.js
import xo from 'eslint-config-xo';
import xoReact from 'eslint-config-xo-react';

export default [...xo, ...xoReact];
```

Use the `space` sub-config if you want 2 space indentation instead of tabs:

```js
// eslint.config.js
import xo from 'eslint-config-xo';
import xoReactSpace from 'eslint-config-xo-react/space';

export default [...xo, ...xoReactSpace];
```

You can also mix it with a [eslint-config-xo](https://github.com/xojs/eslint-config-xo) sub-config:

```js
// eslint.config.js
import xoSpace from 'eslint-config-xo/space';
import xoReactSpace from 'eslint-config-xo-react/space';

export default [
	...xoSpace,
	...xoReactSpace
];
```

## Tip

### Use with XO

```
$ npm install --save-dev eslint-config-xo-react eslint-plugin-react eslint-plugin-react-hooks
```

```json
{
	"name": "my-awesome-project",
	"xo": {
		"extends": "xo-react"
	}
}
```

## Related

- [eslint-config-xo](https://github.com/xojs/eslint-config-xo) - ESLint shareable config for XO
- [XO](https://github.com/xojs/xo)
