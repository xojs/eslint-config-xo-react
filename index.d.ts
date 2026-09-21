import {type Linter} from 'eslint';

export type Options = {
	/**
	Use spaces for indentation instead of tabs for JSX props.

	Set to `true` for 2 spaces, or a number for a custom count.

	@default false

	@example
	```
	import eslintConfigXo from 'eslint-config-xo';
	import eslintConfigXoReact from 'eslint-config-xo-react';
	import {defineConfig} from 'eslint/config';

	export default defineConfig([
		...eslintConfigXo({space: true}),
		...eslintConfigXoReact({space: true}),
	]);
	```
	*/
	space?: boolean | number;

	/**
	Integrate [Prettier](https://prettier.io) by turning off the JSX formatting rules that conflict with it. Rules owned by `eslint-config-xo` are left alone, so you no longer need to add `eslint-config-prettier` yourself.

	This config never runs Prettier, so any truthy value only turns off the conflicting rules. Running Prettier itself is handled by the [`prettier` option in `eslint-config-xo`](https://github.com/xojs/eslint-config-xo#prettier). Pass the same value you pass there.

	@default false

	@example
	```
	import eslintConfigXo from 'eslint-config-xo';
	import eslintConfigXoReact from 'eslint-config-xo-react';
	import {defineConfig} from 'eslint/config';

	export default defineConfig([
		...eslintConfigXo({prettier: 'compat'}),
		...eslintConfigXoReact({prettier: 'compat'}),
	]);
	```
	*/
	prettier?: boolean | 'compat';
};

/**
ESLint shareable config for React to be used with eslint-config-xo.

@returns An array of ESLint flat config objects.

@example
```
import eslintConfigXo from 'eslint-config-xo';
import eslintConfigXoReact from 'eslint-config-xo-react';
import {defineConfig} from 'eslint/config';

export default defineConfig([
	...eslintConfigXo(),
	...eslintConfigXoReact(),
]);
```
*/
export default function eslintConfigXoReact(options?: Options): Linter.Config[];
