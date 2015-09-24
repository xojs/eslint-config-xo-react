'use strict';
module.exports = {
	ecmaFeatures: {
		jsx: true
	},
	plugins: [
		'react'
	],
	rules: {
		'react/display-name': 0,
		'react/jsx-boolean-value': 2,
		'react/jsx-closing-bracket-location': [2, 'props-aligned'],
		'react/jsx-curly-spacing': [2, 'never'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-max-props-per-line': 0,
		'react/jsx-no-duplicate-props': [2, {ignoreCase: true}],
		'react/jsx-no-literals': 0,
		'react/jsx-no-undef': 2,
		'react/jsx-sort-prop-types': 0,
		'react/jsx-sort-props': 0,
		'react/jsx-uses-react': 2,
		'react/jsx-uses-vars': 2,
		'react/no-danger': 2,
		'react/no-did-mount-set-state': 0,
		'react/no-did-update-set-state': 2,
		'react/no-multi-comp': 0,
		'react/no-set-state': 0,
		'react/no-unknown-property': 2,
		'react/prop-types': 2,
		'react/react-in-jsx-scope': 2,
		'react/require-extension': [1, {extensions: ['.js', '.jsx']}],
		'react/self-closing-comp': 2,
		'react/sort-comp': 0,
		'react/wrap-multilines': 2
	}
};
