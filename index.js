'use strict';
module.exports = {
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: [
		'react'
	],
	rules: {
		'react/forbid-component-props': 2,
		'react/no-children-prop': 2,
		'react/no-danger': 2,
		'react/no-danger-with-children': 2,
		'react/no-deprecated': 2,
		'react/no-did-update-set-state': 2,
		'react/no-direct-mutation-state': 2,
		'react/no-find-dom-node': 2,
		'react/no-is-mounted': 2,
		'react/no-render-return-value': 2,
		'react/no-string-refs': 2,
		'react/no-unescaped-entities': 2,
		'react/no-unknown-property': 2,
		'react/no-unused-prop-types': 2,
		'react/prop-types': 2,
		'react/react-in-jsx-scope': 2,
		'react/self-closing-comp': 2,
		'react/style-prop-object': 2,
		'react/jsx-boolean-value': 2,
		'react/jsx-closing-bracket-location': [2, 'props-aligned'],
		'react/jsx-curly-spacing': [2, 'never'],
		'react/jsx-equals-spacing': [2, 'never'],
		'react/jsx-first-prop-new-line': [2, 'multiline'],
		'react/jsx-handler-names': 2,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-key': 2,
		'react/jsx-no-bind': 2,
		'react/jsx-no-comment-textnodes': 2,
		'react/jsx-no-duplicate-props': [2, {ignoreCase: true}],
		'react/jsx-no-target-blank': 2,
		'react/jsx-no-undef': 2,
		'react/jsx-pascal-case': 2,
		'react/jsx-space-before-closing': [2, 'never'],
		'react/jsx-uses-react': 2,
		'react/jsx-uses-vars': 2,
		'react/jsx-wrap-multilines': 2
	}
};
