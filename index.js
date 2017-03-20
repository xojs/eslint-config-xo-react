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
		'react/forbid-component-props': 'error',
		'react/no-array-index-key': 'error',
		'react/no-children-prop': 'error',
		'react/no-danger': 'error',
		'react/no-danger-with-children': 'error',
		'react/no-deprecated': 'error',
		'react/no-did-update-set-state': 'error',
		'react/no-direct-mutation-state': 'error',
		'react/no-find-dom-node': 'error',
		'react/no-is-mounted': 'error',
		'react/no-render-return-value': 'error',
		'react/no-string-refs': 'error',
		'react/no-unescaped-entities': 'error',
		'react/no-unknown-property': 'error',
		'react/no-unused-prop-types': 'error',
		'react/prop-types': 'error',
		'react/react-in-jsx-scope': 'error',
		'react/require-default-props': 'error',
		'react/self-closing-comp': 'error',
		'react/style-prop-object': 'error',
		'react/void-dom-elements-no-children': 'error',
		'react/jsx-boolean-value': 'error',
		'react/jsx-closing-bracket-location': ['error', 'props-aligned'],
		'react/jsx-curly-spacing': ['error', 'never'],
		'react/jsx-equals-spacing': ['error', 'never'],
		'react/jsx-first-prop-new-line': ['error', 'multiline'],
		'react/jsx-handler-names': 'error',
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-key': 'error',
		'react/jsx-max-props-per-line': ['error', {
			maximum: 1,
			when: 'multiline'
		}],
		'react/jsx-no-bind': 'error',
		'react/jsx-no-comment-textnodes': 'error',
		'react/jsx-no-duplicate-props': ['error', {
			ignoreCase: true
		}],
		'react/jsx-no-target-blank': 'error',
		'react/jsx-no-undef': 'error',
		'react/jsx-pascal-case': 'error',
		'react/jsx-sort-props': ['error', {
			callbacksLast: true,
			shorthandFirst: true,
			noSortAlphabetically: true
		}],
		'react/jsx-space-before-closing': ['error', 'never'],
		'react/jsx-tag-spacing': ['error', {
			closingSlash: 'never',
			beforeSelfClosing: 'never',
			afterOpening: 'never'
		}],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'react/jsx-wrap-multilines': 'error'
	}
};
