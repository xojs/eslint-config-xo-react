import test from 'ava';
import isPlainObj from 'is-plain-obj';
import tempWrite from 'temp-write';
import eslint from 'eslint';

function hasRule(errors, ruleId) {
	return errors.some(x => x.ruleId === ruleId);
}

function runEslint(str, conf) {
	const linter = new eslint.CLIEngine({
		useEslintrc: false,
		configFile: tempWrite.sync(JSON.stringify(conf))
	});

	return linter.executeOnText(str).results[0].messages;
}

test('main', t => {
	const conf = require('../space');

	t.true(isPlainObj(conf));
	t.true(isPlainObj(conf.rules));

	const errors = runEslint('var app = <div className="foo">Unicorn</div>', conf);
	t.is(errors[0].ruleId, 'react/react-in-jsx-scope');
});

test('space', t => {
	const conf = require('../space');

	t.true(isPlainObj(conf));
	t.true(isPlainObj(conf.rules));

	const errors = runEslint('<App>\n\t<Hello/>\n</App>', conf);
	t.true(hasRule(errors, 'react/jsx-indent'));
});
