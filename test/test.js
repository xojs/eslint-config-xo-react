import test from 'ava';
import eslintConfigXoReact from '../index.js';
import {ESLint} from 'eslint';

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
	t.true(hasRule(errors, 'react/no-danger'));
});

test('space', async t => {
	const fixture = '<App\n\tfoo="bar"\n/>';

	const config = eslintConfigXoReact({space: true});
	t.true(Array.isArray(config));

	const errors = await runEslint(fixture, config);
	t.true(hasRule(errors, 'react/jsx-indent-props'));

	const defaultErrors = await runEslint(fixture, eslintConfigXoReact());
	t.false(hasRule(defaultErrors, 'react/jsx-indent-props'));
});

test('no errors', async t => {
	const errors = await runEslint('var React = require(\'react\');\nvar el = <div/>;', eslintConfigXoReact());
	t.deepEqual(errors, []);
});
