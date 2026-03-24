import {type Linter} from 'eslint';

export type Options = {
	/**
	Use spaces for indentation instead of tabs for JSX props.

	Set to `true` for 2 spaces, or a number for a custom count.

	@default false
	*/
	space?: boolean | number;
};

/**
ESLint shareable config for React to be used with eslint-config-xo.

@returns An array of ESLint flat config objects.
*/
export default function eslintConfigXoReact(options?: Options): Linter.Config[];
