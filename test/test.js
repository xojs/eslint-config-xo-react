'use strict';
var test = require('ava');
var isPlainObj = require('is-plain-obj');
var eslint = require('eslint');
var tempWrite = require('temp-write');
var clearRequire = require('clear-require');

function runEslint(str, conf) {
	var linter = new eslint.CLIEngine({
		useEslintrc: false,
		configFile: tempWrite.sync(JSON.stringify(conf))
	});

	return linter.executeOnText(str).results[0].messages;
}

test(function (t) {
	clearRequire.all();
	var conf = require('../');

	t.true(isPlainObj(conf));
	t.true(isPlainObj(conf.rules));

	var errors = runEslint('var app = <div className="foo">Unicorn</div>', conf);
	t.is(errors[0].ruleId, 'react/react-in-jsx-scope');
	t.is(errors[1].ruleId, 'react/jsx-quotes');

	t.end();
});
