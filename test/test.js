import test from 'ava';
import isPlainObj from 'is-plain-obj';
import tempWrite from 'temp-write';
import eslint from 'eslint';

const hasRule = (errors, ruleId) => errors.some(error => error.ruleId === ruleId);

function runEslint(string, config) {
	const linter = new eslint.CLIEngine({
		useEslintrc: false,
		configFile: tempWrite.sync(JSON.stringify(config))
	});

	return linter.executeOnText(string).results[0].messages;
}

test('main', t => {
	const config = require('../space');

	t.true(isPlainObj(config));
	t.true(isPlainObj(config.rules));

	const errors = runEslint('var app = <div className="foo">Unicorn</div>', config);
	t.true(hasRule(errors, 'react/react-in-jsx-scope'));
});

test('space', t => {
	const config = require('../space');

	t.true(isPlainObj(config));
	t.true(isPlainObj(config.rules));

	const errors = runEslint('<App>\n\t<Hello/>\n</App>', config);
	t.true(hasRule(errors, 'react/jsx-indent'));
});

test('no errors', t => {
	const config = require('..');

	const errors = runEslint('var React = require(\'react\');\nvar el = <div/>;', config);
	t.deepEqual(errors, []);
});
