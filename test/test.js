import test from 'ava';
import isPlainObj from 'is-plain-obj';
import tempWrite from 'temp-write';
import eslint from 'eslint';
import conf from '../';

function runEslint(str) {
	const linter = new eslint.CLIEngine({
		useEslintrc: false,
		configFile: tempWrite.sync(JSON.stringify(conf))
	});

	return linter.executeOnText(str).results[0].messages;
}

test(t => {
	t.true(isPlainObj(conf));
	t.true(isPlainObj(conf.rules));

	const errors = runEslint('var app = <div className="foo">Unicorn</div>');
	t.is(errors[0].ruleId, 'react/react-in-jsx-scope');
});
