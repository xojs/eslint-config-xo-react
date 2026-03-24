import test from 'ava';
import eslintConfigXoReact from '../index.js';
import eslintConfigXoReactSpace from '../space.js';
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
	t.true(Array.isArray(eslintConfigXoReact));

	const errors = await runEslint('<div dangerouslySetInnerHTML={{__html: "foo"}}/>', eslintConfigXoReact);
	t.true(hasRule(errors, 'react/no-danger'));
});

test('space', async t => {
	t.true(Array.isArray(eslintConfigXoReactSpace));

	const errors = await runEslint('<App foo = "bar"/>', eslintConfigXoReactSpace);
	t.true(hasRule(errors, 'react/jsx-equals-spacing'));
});

test('no errors', async t => {
	const errors = await runEslint('var React = require(\'react\');\nvar el = <div/>;', eslintConfigXoReact);
	t.deepEqual(errors, []);
});
