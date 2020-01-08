'use strict';
const path = require('path');

module.exports = {
	extends: path.join(__dirname, 'index.js'),
	rules: {
		'react/jsx-indent-props': [
			'error',
			2
		],
		'react/jsx-indent': [
			'error',
			2
		]
	}
};
