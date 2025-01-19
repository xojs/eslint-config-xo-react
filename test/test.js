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

	const errors = await runEslint('var app = <div className="foo">Unicorn</div>', eslintConfigXoReact);
	t.true(hasRule(errors, 'react/react-in-jsx-scope'));
});

test('space', async t => {
	t.true(Array.isArray(eslintConfigXoReactSpace));

	const errors = await runEslint('<App>\n\t<Hello/>\n</App>', eslintConfigXoReactSpace);
	t.true(hasRule(errors, 'react/jsx-indent'));
});

test('no errors', async t => {
	const errors = await runEslint('var React = require(\'react\');\nvar el = <div/>;', eslintConfigXoReact);
	t.deepEqual(errors, []);
});
