import {test} from 'node:test';
import assert from 'node:assert/strict';
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

test('main', async () => {
	const config = eslintConfigXoReact();
	assert.ok(Array.isArray(config));

	const errors = await runEslint('<div dangerouslySetInnerHTML={{__html: "foo"}}/>', config);
	assert.ok(hasRule(errors, '@eslint-react/dom-no-dangerously-set-innerhtml'));
});

test('space', async () => {
	const fixture = '<App\n\tfoo="bar"\n/>';

	const config = eslintConfigXoReact({space: true});
	assert.ok(Array.isArray(config));

	const errors = await runEslint(fixture, config);
	assert.ok(hasRule(errors, '@stylistic/jsx-indent-props'));

	const defaultErrors = await runEslint(fixture, eslintConfigXoReact());
	assert.ok(!hasRule(defaultErrors, '@stylistic/jsx-indent-props'));
});

test('no errors', async () => {
	const errors = await runEslint('var React = require(\'react\');\nvar el = <div/>;', eslintConfigXoReact());
	assert.deepEqual(errors, []);
});

test('orders props', async () => {
	const config = eslintConfigXoReact();

	const errors = await runEslint('<App key="k" isOpen zebra={1} onClick={f}/>', config);
	assert.ok(!hasRule(errors, 'perfectionist/sort-jsx-props'));

	const unorderedErrors = await runEslint('<App onClick={f} isOpen key="k"/>', config);
	assert.ok(hasRule(unorderedErrors, 'perfectionist/sort-jsx-props'));

	// Props within a group are not alphabetized.
	const unsortedErrors = await runEslint('<App zebra={1} apple={2}/>', config);
	assert.ok(!hasRule(unsortedErrors, 'perfectionist/sort-jsx-props'));
});

test('enforces shorthand', async () => {
	const config = eslintConfigXoReact();

	const booleanErrors = await runEslint('<App isOpen={true}/>', config);
	assert.ok(hasRule(booleanErrors, '@stylistic/jsx-shorthand-boolean'));

	const fragmentErrors = await runEslint('<React.Fragment><div/><div/></React.Fragment>', config);
	assert.ok(hasRule(fragmentErrors, '@stylistic/jsx-shorthand-fragment'));

	// A keyed fragment cannot use the shorthand syntax.
	const keyedErrors = await runEslint('items.map(item => <Fragment key={item.id}><div/><div/></Fragment>)', config);
	assert.ok(!hasRule(keyedErrors, '@stylistic/jsx-shorthand-fragment'));
});

test('disallows class components', async () => {
	const errors = await runEslint('import {Component} from \'react\';\nexport default class Foo extends Component {\n\trender() {\n\t\treturn <div/>;\n\t}\n}', eslintConfigXoReact());
	assert.ok(hasRule(errors, '@eslint-react/no-class-component'));
});

test('type-checked rules only apply to TypeScript files', async () => {
	const eslint = new ESLint({
		overrideConfigFile: true,
		overrideConfig: eslintConfigXoReact(),
	});

	const hasTypeCheckedRule = async file => {
		const config = await eslint.calculateConfigForFile(file);
		return Boolean(config?.rules['@eslint-react/no-leaked-conditional-rendering']);
	};

	assert.ok(await hasTypeCheckedRule('foo.tsx'));
	assert.ok(await hasTypeCheckedRule('foo.ts'));

	// These rules need type information, so they must not reach files that are linted without a TypeScript parser.
	assert.ok(!await hasTypeCheckedRule('foo.jsx'));
	assert.ok(!await hasTypeCheckedRule('foo.d.ts'));
});

test('only applies to JSX-capable files', async () => {
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

	assert.ok(await hasReactRule('foo.jsx'));
	assert.ok(await hasReactRule('foo.tsx'));

	// React rules must not leak onto non-JS files (https://github.com/xojs/xo/issues/892)…
	assert.ok(!await hasReactRule('package.json'));
	// …nor onto type-definition files, which never contain JSX and need a TypeScript parser.
	assert.ok(!await hasReactRule('foo.d.ts'));
});

test('accessibility', async () => {
	const config = eslintConfigXoReact();

	const errors = await runEslint('<img src="foo.png"/>', config);
	assert.ok(hasRule(errors, 'jsx-a11y-x/alt-text'));

	// The rules that guess at interactivity are deliberately left out.
	const interactionErrors = await runEslint('<div onClick={f}/>', config);
	assert.ok(!hasRule(interactionErrors, 'jsx-a11y-x/click-events-have-key-events'));
	assert.ok(!hasRule(interactionErrors, 'jsx-a11y-x/no-static-element-interactions'));
});

test('closing brackets stay reachable with tabs', async () => {
	const config = eslintConfigXoReact();

	// The opening tag sits mid-line, so aligning with `<` would need spaces no tab count can express. https://github.com/xojs/eslint-config-xo-react/issues/31
	const errors = await runEslint('const a = (\n\t<>\n\t\t{via ? <div style={{\n\t\t\tdisplay: \'flex\',\n\t\t}}\n\t\t>\n\t\t\t<div>{destination}</div>\n\t\t</div> : <span>{longName}</span>}\n\t</>\n);\n', config);
	assert.ok(!hasRule(errors, '@stylistic/jsx-closing-bracket-location'));
	assert.ok(!hasRule(errors, '@stylistic/jsx-closing-tag-location'));

	// A bracket that is not aligned with the opening tag's line is still caught.
	const misalignedErrors = await runEslint('const a = (\n\t<Hello\n\t\tfirstName="John"\n\t\t\t>\n\t\tHi\n\t</Hello>\n);\n', config);
	assert.ok(hasRule(misalignedErrors, '@stylistic/jsx-closing-bracket-location'));
});

test('prettier', async () => {
	const fixture = '<App\n\tfoo="bar"\n/>';

	const errors = await runEslint(fixture, eslintConfigXoReact({space: true, prettier: 'compat'}));
	assert.ok(!hasRule(errors, '@stylistic/jsx-indent-props'));

	// Non-stylistic rules are untouched.
	const dangerErrors = await runEslint('<div dangerouslySetInnerHTML={{__html: "foo"}}/>', eslintConfigXoReact({prettier: 'compat'}));
	assert.ok(hasRule(dangerErrors, '@eslint-react/dom-no-dangerously-set-innerhtml'));

	// `true` behaves the same as `'compat'`.
	assert.deepEqual(eslintConfigXoReact({prettier: true}), eslintConfigXoReact({prettier: 'compat'}));

	// Disabled by default.
	const defaultErrors = await runEslint(fixture, eslintConfigXoReact({space: true}));
	assert.ok(hasRule(defaultErrors, '@stylistic/jsx-indent-props'));
});

test('prettier - in sync with eslint-config-prettier', () => {
	const rules = Object.assign({}, ...eslintConfigXoReact({prettier: 'compat'}).map(config => config.rules));

	const stillEnabled = Object.keys(rules)
		.filter(ruleId => eslintConfigPrettier.rules[ruleId] !== undefined && rules[ruleId] !== 'off');

	assert.deepEqual(stillEnabled, []);

	// The other direction: nothing is turned off that the config no longer enables.
	const enabledRules = Object.assign({}, ...eslintConfigXoReact().map(config => config.rules));
	const turnedOff = Object.keys(rules).filter(ruleId => rules[ruleId] === 'off');
	const stale = turnedOff.filter(ruleId => enabledRules[ruleId] === undefined);

	assert.deepEqual(stale, []);
});
