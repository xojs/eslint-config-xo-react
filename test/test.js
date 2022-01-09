import test from 'ava';
import isPlainObj from 'is-plain-obj';
import {ESLint} from 'eslint';

const hasRule = (errors, ruleId) => errors.some(error => error.ruleId === ruleId);

async function runEslint(string, config) {
	const eslint = new ESLint({
		useEslintrc: false,
		overrideConfig: config,
	});

	const [firstResult] = await eslint.lintText(string);

	return firstResult.messages;
}

test('main', async t => {
	const config = require('../space.js');

	t.true(isPlainObj(config));
	t.true(isPlainObj(config.rules));

	const errors = await runEslint('var app = <div className="foo">Unicorn</div>', config);
	t.true(hasRule(errors, 'react/react-in-jsx-scope'));
});

test('space', async t => {
	const config = require('../space.js');

	t.true(isPlainObj(config));
	t.true(isPlainObj(config.rules));

	const errors = await runEslint('<App>\n\t<Hello/>\n</App>', config);
	t.true(hasRule(errors, 'react/jsx-indent'));
});

test('no errors', async t => {
	const config = require('../index.js');

	const errors = await runEslint('var React = require(\'react\');\nvar el = <div/>;', config);
	t.deepEqual(errors, []);
});
