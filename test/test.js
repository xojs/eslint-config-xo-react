'use strict';
var isPlainObj = require('is-plain-obj');
var tempWrite = require('temp-write');
var test = require('ava');
var eslint = require('eslint');
var conf = require('../');

function runEslint(str) {
	var linter = new eslint.CLIEngine({
		useEslintrc: false,
		configFile: tempWrite.sync(JSON.stringify(conf))
	});

	return linter.executeOnText(str).results[0].messages;
}

test(function (t) {
	t.true(isPlainObj(conf));
	t.true(isPlainObj(conf.rules));

	var errors = runEslint('var app = <div className="foo">Unicorn</div>');
	t.is(errors[0].ruleId, 'react/react-in-jsx-scope');

	t.end();
});
