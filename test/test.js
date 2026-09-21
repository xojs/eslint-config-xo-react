import test from 'ava';
import {ESLint} from 'eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintConfigXoReact from '../index.js';

const hasRule = (errors, ruleId) => errors.some(error => error.ruleId === ruleId);

async function runEslint(string, config) {
	const eslint = new ESLint({
		overrideConfigFile: true,
		overrideConfig: config,
	});

	const [firstResult] = await eslint.lintText(string);

	return firstResult.messages;
}

test('main', async t => {
	const config = eslintConfigXoReact();
	t.true(Array.isArray(config));

	const errors = await runEslint('<div dangerouslySetInnerHTML={{__html: "foo"}}/>', config);
	t.true(hasRule(errors, '@eslint-react/dom-no-dangerously-set-innerhtml'));
});

test('space', async t => {
	const fixture = '<App\n\tfoo="bar"\n/>';

	const config = eslintConfigXoReact({space: true});
	t.true(Array.isArray(config));

	const errors = await runEslint(fixture, config);
	t.true(hasRule(errors, '@stylistic/jsx-indent-props'));

	const defaultErrors = await runEslint(fixture, eslintConfigXoReact());
	t.false(hasRule(defaultErrors, '@stylistic/jsx-indent-props'));
});

test('no errors', async t => {
	const errors = await runEslint('var React = require(\'react\');\nvar el = <div/>;', eslintConfigXoReact());
	t.deepEqual(errors, []);
});

test('orders props', async t => {
	const config = eslintConfigXoReact();

	const errors = await runEslint('<App key="k" isOpen zebra={1} onClick={f}/>', config);
	t.false(hasRule(errors, 'perfectionist/sort-jsx-props'));

	const unorderedErrors = await runEslint('<App onClick={f} isOpen key="k"/>', config);
	t.true(hasRule(unorderedErrors, 'perfectionist/sort-jsx-props'));

	// Props within a group are not alphabetized.
	const unsortedErrors = await runEslint('<App zebra={1} apple={2}/>', config);
	t.false(hasRule(unsortedErrors, 'perfectionist/sort-jsx-props'));
});

test('disallows class components', async t => {
	const errors = await runEslint('import {Component} from \'react\';\nexport default class Foo extends Component {\n\trender() {\n\t\treturn <div/>;\n\t}\n}', eslintConfigXoReact());
	t.true(hasRule(errors, '@eslint-react/no-class-component'));
});

test('type-checked rules only apply to TypeScript files', async t => {
	const eslint = new ESLint({
		overrideConfigFile: true,
		overrideConfig: eslintConfigXoReact(),
	});

	const hasTypeCheckedRule = async file => {
		const config = await eslint.calculateConfigForFile(file);
		return Boolean(config?.rules['@eslint-react/no-leaked-conditional-rendering']);
	};

	t.true(await hasTypeCheckedRule('foo.tsx'));
	t.true(await hasTypeCheckedRule('foo.ts'));

	// These rules need type information, so they must not reach files that are linted without a TypeScript parser.
	t.false(await hasTypeCheckedRule('foo.jsx'));
	t.false(await hasTypeCheckedRule('foo.d.ts'));
});

test('only applies to JSX-capable files', async t => {
	const eslint = new ESLint({
		overrideConfigFile: true,
		overrideConfig: [
			// Opt non-JS files into linting, like XO's JSON/Markdown plugins do.
			{files: ['**/package.json'], rules: {}},
			...eslintConfigXoReact(),
		],
	});

	const hasReactRule = async file => {
		const config = await eslint.calculateConfigForFile(file);
		return Boolean(config?.rules['@eslint-react/dom-no-dangerously-set-innerhtml']);
	};

	t.true(await hasReactRule('foo.jsx'));
	t.true(await hasReactRule('foo.tsx'));

	// React rules must not leak onto non-JS files (https://github.com/xojs/xo/issues/892)…
	t.false(await hasReactRule('package.json'));
	// …nor onto type-definition files, which never contain JSX and need a TypeScript parser.
	t.false(await hasReactRule('foo.d.ts'));
});

test('prettier', async t => {
	const fixture = '<App\n\tfoo="bar"\n/>';

	const errors = await runEslint(fixture, eslintConfigXoReact({space: true, prettier: 'compat'}));
	t.false(hasRule(errors, '@stylistic/jsx-indent-props'));

	// Non-stylistic rules are untouched.
	const dangerErrors = await runEslint('<div dangerouslySetInnerHTML={{__html: "foo"}}/>', eslintConfigXoReact({prettier: 'compat'}));
	t.true(hasRule(dangerErrors, '@eslint-react/dom-no-dangerously-set-innerhtml'));

	// `true` behaves the same as `'compat'`.
	t.deepEqual(eslintConfigXoReact({prettier: true}), eslintConfigXoReact({prettier: 'compat'}));

	// Disabled by default.
	const defaultErrors = await runEslint(fixture, eslintConfigXoReact({space: true}));
	t.true(hasRule(defaultErrors, '@stylistic/jsx-indent-props'));
});

test('prettier - in sync with eslint-config-prettier', t => {
	const rules = Object.assign({}, ...eslintConfigXoReact({prettier: 'compat'}).map(config => config.rules));

	const stillEnabled = Object.keys(rules)
		.filter(ruleId => eslintConfigPrettier.rules[ruleId] !== undefined && rules[ruleId] !== 'off');

	t.deepEqual(stillEnabled, []);

	// The other direction: nothing is turned off that the config no longer enables.
	const enabledRules = Object.assign({}, ...eslintConfigXoReact().map(config => config.rules));
	const turnedOff = Object.keys(rules).filter(ruleId => rules[ruleId] === 'off');
	const stale = turnedOff.filter(ruleId => enabledRules[ruleId] === undefined);

	t.deepEqual(stale, []);
});
